const {createAudioResource, createAudioPlayer} = require('@discordjs/voice');
const playYT = require('play-dl');
const ytdl = require('ytdl-core');
const {joinC} = require('../includes/join');
//const {play} = require('../includes/play');

module.exports = {
    name: 'play',
    async execute(interaction, client) {
        const queue = client.queue;
        const guildQueue = interaction.client.queue.get(interaction.guild.id);
        const url = interaction.options.get('url').value;
        interaction.reply('Je joue ...')

        let songInfo = {
            url:(await ytdl.getInfo(url)).videoDetails.video_url,
            title: (await ytdl.getInfo(url)).videoDetails.title,
          //  tempsMusique: (await ytdl.getInfo(url)).videoDetails.lengthSeconds
        }
        if(!guildQueue) {
            const queueConstructor = {
                songs: [],
                volume: 10,
                loop: false,
            };
            queue.set(interaction.guild.id, queueConstructor);
            queueConstructor.songs.push(songInfo);
            try {
                const guild = client.guilds.cache.get(interaction.guild.id);
                const member = guild.members.cache.get(interaction.member.user.id);
                const voiceChannel = member.voice.channel;

                joinC(interaction, guild, voiceChannel);
                const player = await createAudioPlayer();
                let stream = await playYT.stream(queueConstructor.songs[0].url)
                let resource = await createAudioResource(stream.stream);
                await interaction.editReply('Je joue'+queueConstructor.songs[0].title)

                await  player.play(resource);
                await interaction.client.connection.subscribe(player);
            }catch (e) {
                console.error(e)
                queue.delete(interaction.guild.id);
            }
        } else {

            return interaction.editReply(songInfo.title +' a été ajouté à la liste');
        }

        /*
         const url = interaction.options.get('url').value;



         let yt_info = await play.search(url, { limit : 1 });

         try {
         joinC(interaction, guild, voiceChannel);
         const player = await createAudioPlayer();
         let stream = await play.stream(yt_info[0].url);
         let resource = await createAudioResource(stream.stream);

         await  player.play(resource);
          await interaction.client.connection.subscribe(player);
         } catch (e) {
             console.log(e);
         }

     }*/
    }
}
