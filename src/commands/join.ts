import { Interaction, Client, GuildMember } from 'discord.js';
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'join',
    description: 'Joins the voice channel of the user',
    async execute(interaction: Interaction, client: Client) {
        let member = interaction.member;

        if ((member as GuildMember).voice.channel && (member as GuildMember).voice.channel?.joinable) {

            const connection = joinVoiceChannel({
                channelId: (member as GuildMember).voice.channel?.id,
                guildId: (member as GuildMember).voice.channel?.guild.id,
                adapterCreator: (member as GuildMember).voice.channel?.guild.voiceAdapterCreator,
            });

            if (connection && interaction.isRepliable()) {
                interaction.reply(`Rejoint... ${(member as GuildMember).voice.channel?.name}`);
            } else {
                if (interaction.isRepliable()) {
                    interaction.reply(`Impossible de rejoindre le salon vocal ${(member as GuildMember).voice.channel?.name}`);
                }
            }
        } else {
            if (interaction.isRepliable()) {
                interaction.reply('Vous devez d\'abord rejoindre un salon vocal!');
            }
        }
    }
}