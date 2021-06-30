
module.exports = {
    name: 'kick',
    execute(interaction, client) {
        const args = interaction.options.get('utilisateur').value;
        const motif = interaction.options.get('raison');
        const guild = client.guilds.cache.get(interaction.guild.id);
        const member = guild.members.cache.get(interaction.member.user.id);


        if (!member.permissions.has('ADMINISTRATOR')) return interaction.reply(`Tu n'as pas la permission pour kick.`);
        if (!guild.me.permissions.has('ADMINISTRATOR')) return interaction.reply(`Je n'ai pas la permission pour kick.`);

        guild.members.kick(args, `${motif ? motif.value : 'pas de motif'}`)
        return interaction.reply(`La personne a été kick avec comme motif ${motif ? motif.value : 'pas de motif'}`)

    }
}
