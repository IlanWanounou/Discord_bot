const { joinVoiceChannel } = require('@discordjs/voice')

module.exports = {
    name: 'join',
    async execute(interaction) {
        const connection = interaction.client.connection;

            if(connection) return interaction.reply('Salon bien rejoin')

    }

}

