const {createAudioResource, AudioPlayerStatus} = require('@discordjs/voice');
const ytdl = require('ytdl-core')

module.exports = {
    name: 'play',
    async execute(interaction) {
        interaction.reply('Je joue : . . . .')

        const connection = interaction.client.connection;
        const queue = interaction.client.queue;
        const guildQueue = interaction.client.queue.get(interaction.guild.id);
        const songInfo = await ytdl.getInfo(interaction.options.get('url').value);
        const player = interaction.client.player();

        let song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            tempsMusique: songInfo.videoDetails.lengthSeconds
        };
        if (song.tempsMusique > 10800) return interaction.editReply('Imposible de lancer une musique > 3 heures.');

        if (!guildQueue) {
            const queueConstructor = {
                connection: null,
                songs: [],
                volume: 10,
                loop: false,
                playing: true
            };
            queue.set(interaction.guild.id, queueConstructor);
            queueConstructor.songs.push(song);

            try {
                queueConstructor.connection = connection;
                play(queueConstructor.songs[0]);
            } catch (err) {
                console.error(err);
                queue.delete(interaction.guild.id);
            }

        } else {
            console.log(guildQueue.songs)

            guildQueue.songs.push(song);
            return interaction.editReply(`${song.title} à été ajouter à la liste`);
        }

        function play(song) {
            if (!song) {
                setTimeout(() => {
                    connection.destroy();
                    queue.delete(interaction.client.queue);
                    }, 300000); // leave le salon apres 5min sans musique.

            } else {
                const serverQueue = queue.get(interaction.guild.id);
                let resource = createAudioResource(ytdl(song.url));
                player.play(resource);
                connection.subscribe(player)
                player.on(AudioPlayerStatus.Idle, () => {
                    if (!serverQueue.loop) serverQueue.songs.shift();
                    play(serverQueue.songs[0]);
                })
                serverQueue.connection.on('disconnect', () => {
                    connection.destroy();
                    queue.delete(interaction.client.queue);
                })
                return interaction.editReply(`Je joue : ${song.title}`)
            }
        }
    }
}

