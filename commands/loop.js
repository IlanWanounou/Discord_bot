module.exports =  {
    name:'loop',
        execute(interaction) {
            const serverQueue = interaction.client.queue.get(interaction.guild.id);
            serverQueue.loop =!serverQueue.loop;
            return interaction.reply(`loop :  ${serverQueue.loop ?  `**activer**` : `**désactiver**` } `);

        }
}
