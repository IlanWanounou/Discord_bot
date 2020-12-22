const Discord = require('discord.js');
const ytdl = require('ytdl-core');
 Discord.Constants.DefaultOptions.ws.properties.$browser = "Discord Android"
//const { YTSearcher } = require('ytsearcher');
 
/*const searcher = new YTSearcher({
    key: "AIzaSyA3CWSH2xiML9aUqSURM5DlwDUGTjTNLjU",
    revealed: true
});*/
 
const client = new Discord.Client();
 
const queue = new Map();

client.on('ready', () => {
    /*console.log(`Logged in as ${client.user.tag}!`);

client.user.setPresence({ activity: { name: 'with discord.js' }, status: 'idle' })
.then(console.log)
.catch(console.error);*/
  });



client.on("message", async(message) => {
    const prefix = '?';
    if (!message.content.startsWith(prefix)) return;
    const serverQueue = queue.get(message.guild.id);
 
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
 
if(command==="join") {
    if(!message.member.voice.channel) return message.channel.send("Tu doit rejoindre  un salon vocal avant de faire cette commande.");
    message.member.voice.channel.join()
    message.channel.send(`j'ai rejoin le channel ${message.member.voice.channel.name}`);
}

   if(command==="play") {
    leture(message, serverQueue);
   }
   if(command==="loop") {
loop(message, serverQueue);  
}
 if(command==="queue") {
    liste_queue(serverQueue);
 }
 if(command==="skip") {
    skip_music(message, serverQueue)
 }

    async function leture(message, serverQueue){
        let channel_check = message.member.voice.channel;
        if(!channel_check){
            return message.channel.send("Tu doit rejoindre  un salon vocal avant de faire cette commande.");
        }else{
           
            const songInfo = await ytdl.getInfo(args[0]);
 
            let song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                temps_musique: songInfo.videoDetails.lengthSeconds
                
            };
 
            if(!serverQueue){
                const queueConstructor = {
                    txtChannel: message.channel,
                    vChannel: channel_check,
                    connection: null,
                    songs: [],
                    volume: 10,
                    loop: false,
                    playing: true
                };
                queue.set(message.guild.id, queueConstructor);
 
                queueConstructor.songs.push(song);
 
                try{
                    let connection = await channel_check.join();
                    queueConstructor.connection = connection;
                    play(message.guild, queueConstructor.songs[0]);
                }catch (err){
                    console.error(err);
                    queue.delete(message.guild.id);
                    return message.channel.send(`error : ${err}`);
                }
            }else{
                serverQueue.songs.push(song);
                return message.channel.send(`${song.title} a été ajouter à la liste`);
            }
        }
    }
    async function play(guild, song){
        const serverQueue = queue.get(guild.id);
        if(!song){
         setTimeout(() => {
                serverQueue.vChannel.leave();   
            }, 300000); // leave le salon apres 5min sans musique.
            queue.delete(guild.id);
            
            return;
        }

        const dispatcher = await serverQueue.connection
            .play(ytdl(song.url))
            .on('finish', () =>{
                if(!serverQueue.loop)serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
            })
            const embed = new Discord.MessageEmbed()
            
            .setAuthor("Musique en cour : ")
            .setTitle(`***${serverQueue.songs[0].title}***`)
                .setURL(`${serverQueue.songs[0].url}`)
                
                 serverQueue.txtChannel.send(embed);
            
         
                 
           serverQueue.connection.on("disconnect", () => queue.delete(guild.id));


          
        }
        async function loop(message, serverQueue){
            if(!message.member.voice.channel) return message.channel.send("Tu doit rejoindre  un salon vocal avant de faire cette commande.");
         if(!serverQueue) return message.channel.send("il 'n'y rien n'a jouer.")
         serverQueue.loop =!serverQueue.loop;
         serverQueue.txtChannel.send(`loop ? ${serverQueue.loop ?  `**on**` : `**off**` } `);
         return
        }
        
        async function liste_queue(serverQueue) {
            let music_list = ""
            for (let i=1; i < serverQueue.songs.length; i++ ) {
                music_list +=`${i}- **${serverQueue.songs[i].title}** \n`
            }
            console.log(serverQueue.songs.length)
            if(serverQueue.songs.length == 1) return serverQueue.txtChannel.send("Il n'y pas d'autre muique dans la queue")
            else {

            
            const embed = new Discord.MessageEmbed()
            .setAuthor("Actuellement en cours")
            .setTitle(`***${serverQueue.songs[0].title}***`)
            .setURL(`${serverQueue.songs[0].url}`)
            .addField("prochain(s) titre(s) :", `${music_list}`)
            .setTimestamp();
            serverQueue.txtChannel.send(embed);
        }
        }

       async function skip_music(message, serverQueue) {
 if(!message.member.voice.channel) return message.channel.send("Tu doit rejoindre  un salon vocal avant de faire cette commande.");
        }
    


})
 
client.login(token)