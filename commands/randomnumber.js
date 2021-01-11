const Discord = require('discord.js');
module.exports = {

	name: 'randomnumber',
	description: 'Trouvez le numéro.',
	execute(message, args) {
		if (!args[0]) return message.reply("Veuillez sélectionner votre limite. Par exemple : !randomnumber 0 15");
		if (!args[1]) return message.reply("Vous n'avez donné qu'une seule limite, donnez l'autre.");



		const min = Math.ceil(args[0]);
		const max = Math.floor(args[1]);


		const number = Math.floor(Math.random() * (max - min)) + min;


		message.channel.send(`Okay, trouver le nombre entre ${min} et ${max}.`);


		let counter = 0;


		let collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id);

		collector.on('collect', message => {
			if (message.content < number) {
				message.channel.send("C'est plus.");
				counter += 1;
			} else if (message.content > number) {
				message.channel.send("C'est moins.");
				counter += 1;
			} else if (message.content == number) {
				counter += 1;
				message.channel.send(`Bravo, vous avez gagné en ${counter} coups.`);
				return collector.stop();
			} else if (message.content === "stop") {

				message.channel.send("Jeu arrêté.");
				return collector.stop();
			}
		});


	}
};