const Discord = require('discord.js');

const client = new Discord.Client();
const ytdl = require('ytdl-core');
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

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
  
    connection.voice.setDeaf(true)
    console.log(args[0])
    const info_music = await ytdl.getInfo(args[0])
    const stream  = ytdl(args[0], {filter: 'audioonly'});
    
     connection.play(stream)
    const emebed = new Discord.MessageEmbed()
    .setTitle(`now playing ***${info_music.videoDetails.title}***`)
    .setURL(`${info_music.videoDetails.video_url}`)
    msg.channel.send(emebed)


} 
})


client.login("NzgxOTIwNTE0NDQ4OTQ5MzIw.X8EqOg.46oPPnUfoU_mQAGtphU1r9tlF40");  