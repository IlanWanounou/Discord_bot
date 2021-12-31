const {createAudioResource, createAudioPlayer, getVoiceConnection} = require('@discordjs/voice');
const playYT = require('play-dl');

export async function play(interaction, queueConstructor, queue) {
    const player = await createAudioPlayer();
    let stream = await playYT.stream(queueConstructor.songs[0].url);
    let resource = await createAudioResource(stream.stream);
    await player.play(resource);
    await interaction.client.connection.subscribe(player);
    if (!queueConstructor.loop) {
        await interaction.channel.send(`Je joue ${queueConstructor.songs[0].title}`)
    }

    player.addListener("stateChange", (oldS, newS) => {
        if (newS.status == "idle") {
            if (!queueConstructor.loop) {
                queueConstructor.songs.shift();
            }
            if (queueConstructor.songs.length == 0) {
                let connection = getVoiceConnection(interaction.guild.id);
                connection.destroy();
                queue.delete(interaction.guild.id);
            } else {
                play(interaction, queueConstructor, queue)
            }
        }
    });
}