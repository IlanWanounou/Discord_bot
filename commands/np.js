const Discord = require("discord.js");
module.exports = {
    name: 'np',
    description: '',
    execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if(!serverQueue) return  message.channel.send("Il n'y a rien n'a jouer.")



        const embed = new Discord.MessageEmbed()
           .setAuthor("Actuellement en cours")
           .setTitle(`**${serverQueue.songs[0].title}**`)
           .setURL(`${serverQueue.songs[0].url}`)
           .setTimestamp();
           message.channel.send(embed);
         
    }
};
