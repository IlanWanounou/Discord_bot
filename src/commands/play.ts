const joinCommand = require('../utils/join');
const {play} = require('../utils/play');
const ytdl = require('ytdl-core');
const {createAudioPlayer} = require('@discordjs/voice');

module.exports = {
    name: 'play',
    async execute(interaction, client) {
        const guild = client.getClient.guilds.cache.get(interaction.guild.id);
        const member = guild.members.cache.get(interaction.member.user.id);
        const voiceChannel = member.voice.channel;
        if (!voiceChannel) {
            interaction.reply('Vous n\'est pas dans un salon vocal.')
        } else {
            const queue = client.getQueue
            const serverQueue = queue.get(guild.id)
            const songInfo = await ytdl.getInfo(interaction.options.getString('url'));
            let song = {
                title: songInfo.videoDetails.title,
                url: songInfo.videoDetails.video_url,
                tempsMusique: songInfo.videoDetails.lengthSeconds
            };

            if (!serverQueue) {
                const queueConstructor = {
                    salonVocal: voiceChannel,
                    songs: [],
                    loop: false,
                };
                queue.set(guild.id, queueConstructor);
                queueConstructor.songs.push(song);
                try {
                    joinCommand.join(interaction, guild, voiceChannel);
                         await play(interaction, queueConstructor, queue);
                } catch (err) {
                    console.error(err);
                    queue.delete(guild.id);
                  return interaction.reply(`erreur : ${err}`);
                }
            } else {
                serverQueue.songs.push(song);
                return interaction.reply(`${song.title} à été ajouter à la liste`);
            }
        }
    }
}