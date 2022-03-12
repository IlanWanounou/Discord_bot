module.exports = {
    name: 'loop',
    execute(interaction, client) {
        const queue = client.getQueue
        const serverQueue = queue.get(interaction.guild.id);
        if(!interaction.member.voice.channel) return interaction.reply("Vous n\'est pas dans un salon vocal.");
        if(!serverQueue) return  interaction.reply("Il n'y a aucune musique actuellement.")
        serverQueue.loop =!serverQueue.loop;
        return interaction.reply(`loop ? ${serverQueue.loop ?  `**Activée**` : `**Désactiver**` } `);
    }
}