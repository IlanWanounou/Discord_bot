const Discord = require('discord.js');
const ytdl = require('ytdl-core');
module.exports = {
	name: 'Play',
	description: 'Play command.',
	async execute(message, args) {
		const queue = message.client.queue;
		const serverQueue = message.client.queue.get(message.guild.id);
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
    let dispatcher;
    async function play(guild, song){
        const serverQueue = queue.get(guild.id);
        if(!song){
         setTimeout(() => {
                serverQueue.vChannel.leave();   
            }, 300000); // leave le salon apres 5min sans musique.
            queue.delete(guild.id);
            
            return;
        }

         dispatcher = await serverQueue.connection
            .play(ytdl(song.url))
            .on('finish', () =>{
                if(!serverQueue.loop)serverQueue.songs.shift();
                play(guild, serverQueue.songs[0]);
			})
			serverQueue.connection.on("disconnect", () => queue.delete(guild.id));
            const embed = new Discord.MessageEmbed()
            
            .setAuthor("Musique en cour : ")
            .setTitle(`***${serverQueue.songs[0].title}***`)
                .setURL(`${serverQueue.songs[0].url}`)
                
                 serverQueue.txtChannel.send(embed);
            
		}
	}
}

