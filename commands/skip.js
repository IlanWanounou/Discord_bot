module.exports = {
	name: 'skip',
	description: 'Skip a song!',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		if (!message.member.voice.channel) return message.channel.send("Tu doit rejoindre  un salon vocal avant de faire cette commande.");
		if (!serverQueue) return message.channel.send("Il n'y à pas de musique.");
		serverQueue.connection.dispatcher.end();
	},
};