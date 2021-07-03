module.exports =  {
    name:'loop',
        execute(interaction) {
            const serverQueue = interaction.client.queue.get(interaction.guild.id);
            if(!serverQueue) return interaction.reply('Pas de musique en cour');
            serverQueue.loop =!serverQueue.loop;
            return interaction.reply(`loop :  ${serverQueue.loop ?  `**activer**` : `**désactiver**` } `);

        }
}
