const {createAudioResource, createAudioPlayer, AudioPlayerStatus} = require('@discordjs/voice');
const playYT = require('play-dl');

export async function play(interaction, queueConstructor) {
    const player = await createAudioPlayer();
    let stream = await playYT.stream(queueConstructor.songs[0].url)
    let resource = await createAudioResource(stream.stream);
    await player.play(resource);
    await interaction.client.connection.subscribe(player);

    player.addListener("stateChange", (oldS, newS) => {
        if (newS.status == "idle") {
            console.log("fini");
        }
    });
};