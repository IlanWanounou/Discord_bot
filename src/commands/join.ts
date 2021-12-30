const {join} = require('../utils/join');
module.exports = {
    name: 'join',
    description: 'rejoins le serveur vocal ou est connecter le client.',
    async execute(interaction, client) {
        client = client.getClient;
        const guild = client.guilds.cache.get(interaction.guild.id);
        const member = guild.members.cache.get(interaction.member.user.id);
        const voiceChannel = member.voice.channel;
        if(!voiceChannel) return interaction.reply('Vous n\'est pas dans un salon vocal.')
        if(guild.me.voice.channel) return interaction.reply('Je suis déjà dans un salon vocal.')
        else {
            join(interaction, guild, voiceChannel)
            interaction.reply(`J'ai rejoin ${voiceChannel.name}`)
        }

    }
}