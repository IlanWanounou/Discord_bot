const Discord = require("discord.js")
module.exports = {
	name: 'queue',
	description: 'show the queue.',
    execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue) return  message.channel.send("il n'y a rien n'a jouer.")
            let music_list = ""
            for (let i=1; i < serverQueue.songs.length; i++ ) {
                music_list +=`${i}- **${serverQueue.songs[i].title}** \n`
            }
            console.log(serverQueue.songs.length)

           if(serverQueue.songs.length == 1) return serverQueue.txtChannel.send("Il n'y pas d'autre muique dans la queue")
          
           
           const embed = new Discord.MessageEmbed()
           .addField("prochain(s) titre(s) :", `${music_list}`)
           .setTimestamp();
           message.channel.send(embed);
    }
}