
module.exports = {
	name: 'loop',
	description: 'loop',
    execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if(!message.member.voice.channel) return message.channel.send("Tu dois rejoindre  un salon vocal avant de faire cette commande.");
        if(!serverQueue) return  message.channel.send("il n'y a rien n'a jouer.")
        serverQueue.loop =!serverQueue.loop;
        return serverQueue.txtChannel.send(`loop ? ${serverQueue.loop ?  `**on**` : `**off**` } `);
    
    }
}
