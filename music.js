const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  prefix="!!"
  client.on('message', async msg => {
    const args = msg.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    let connection = await msg.member.voice.channel.join()
    

if(command==="join") {


    if(!msg.member.voice.channel) return msg.reply ("Vous devez être dans channel vocal.")
    
    connection
    msg.channel.send(`Joined ${msg.member.voice.channel.name}`)
    

}
if(command==="play") {
    if(!msg.member.voice.channel) return msg.reply ("Vous devez être dans channel vocal.")
 
    console.log(args[0])
    const info_music = await ytdl.getInfo(args[0])

    const stream  = ytdl(args[0], {filter: 'audioonly'});
 
    connection.play(stream, {seek: 0, volume: 1})
    msg.channel.send(`now playing ***${info_music.videoDetails.title}***`)

}
})  



client.login(token);  
