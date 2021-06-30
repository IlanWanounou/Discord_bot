module.exports = {
    name: 'clear',
    execute(interaction, client) {
        const args = interaction.options.get('nombre').value;

        const guild = client.guilds.cache.get(interaction.guild.id);
        const member = guild.members.cache.get(interaction.member.user.id);
        console.log(member)



        if (!member.permissions.has('MANAGE_CHANNELS')) return interaction.reply('Tu n\'as pas la permission déso pas déso.')
        if (!guild.me.permissions.has('MANAGE_CHANNELS')) return interaction.reply(`Je n'ai pas la permission.`);

        interaction.channel.bulkDelete(args)
        interaction.reply({ content: 'Message(s) supprimer',
            ephemeral : true}
    )

    }
}
