module.exports = {
    name: 'ping',
    async execute(interaction) {
        interaction.reply('Pong! le  ping est de`' + `${Date.now() - interaction.createdTimestamp}` + ' ms`')
    }
}