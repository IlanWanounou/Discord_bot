const Discord = require('discord.js');

const client = new Discord.Client();
const ytdl = require('ytdl-core');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  var queue = new Map();
  prefix="!!"
  client.on('message', async msg => {
    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    let Channel_check = await msg.member.voice.channel 
    let  connection = await Channel_check.join()

    



if(command==="join") {


    if(!Channel_check ) return msg.reply ("Vous devez être dans channel vocal.")

     connection
     Channel_check.setDeaf(true)
    msg.channel.send(`Joined ${msg.member.voice.channel.name}`)
    

}
if(command==="play") {
    if(!Channel_check) return msg.reply ("Vous devez être dans channel vocal.")
    
    let serverQueue = queue.get(msg.guild.id);
    connection.voice.setDeaf(true)
    const info_music = await ytdl.getInfo(args[0])
    let song = {
        title: info_music.title,
        
    }

    if(!serverQueue) {
        let queueConst = {
            textChannel: msg.channel,
            voiceChannel: Channel_check,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };

        queue.set(msg.guild.id, queueConst);
        queueConst.songs.push(song);

        try {
            connection
            queueConst.connection = connection
            playSong(msg.guild, queueConst.songs[0])
            const emebed = new Discord.MessageEmbed()
            .setTitle(`musique en cour : ***${info_music.videoDetails.title}***`)
            .setURL(`${info_music.videoDetails.video_url}`)
            msg.channel.send(emebed)
        } catch (error) {
            console.log(error);
            queue.delete(msg.guild.id);
            return msg.channel.send(error);
        }
    } else {
        serverQueue.songs.push(song);
        return msg.channel.send(`${info_music.videoDetails.title}à été ajouter à la queue!`)
    }




async function playSong(guild, song) {
let serverQueue = queue.get(guild.id);

if(!song){
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;


}
const dispatcher = serverQueue.connection.play(ytdl(args[0]))
.on('end', () => {
    
    
    serverQueue.songs.shift();
    playSong(guild, serverQueue.songs[0]);
})
serverQueue.connection.on("disconnect", () => queue.delete(guild.id));
}
}
  })
client.login(token);  
