
const {joinC} = require('../utils/joinChannel')
module.exports = {
    name: 'join',
    async execute(interaction, client) {
        const guild = client.guilds.cache.get(interaction.guild.id);
        const member = guild.members.cache.get(interaction.member.user.id);
        const voiceChannel = member.voice.channel;
        if(!voiceChannel) return interaction.reply('Vous n\'est pas dans un salon vocal.')
        if(guild.me.voice.channel) return interaction.reply('Je suis déjà dans un salon vocal.')
        else {
            joinC(interaction, guild, voiceChannel)
            interaction.reply(`J'ai rejoin ${voiceChannel.name}`)
        }

    }

}

