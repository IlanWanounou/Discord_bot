module.exports = {
    name: 'ban',
    execute(interaction, client) {
        const args = interaction.options.get('utilisateur').value;
        console.log(args)
        const motif = interaction.options.get('raison');
        const guild = client.guilds.cache.get(interaction.guild.id);
        const member = guild.members.cache.get(interaction.member.user.id);


        if (!member.permissions.has('ADMINISTRATOR')) return interaction.reply(`Tu n'as pas la permission pour ban.`);
        if (!guild.me.permissions.has('ADMINISTRATOR')) return interaction.reply(`Je n'ai pas la permission pour ban.`);

        guild.members.ban(args)
        return interaction.reply(`La personne a été ban avec comme motif ${motif ? motif.value : 'Aucun donner'}`)

    }
}
