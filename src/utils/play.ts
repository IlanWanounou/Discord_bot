import {getVoiceConnection, createAudioPlayer, createAudioResource} from "@discordjs/voice";
import * as ytdl from 'ytdl-core';


export async function play(interaction, queueConstructor, queue) {
    let  connection = getVoiceConnection(queueConstructor.salonVocal.guildId);
    const player = await createAudioPlayer();
    const resource = createAudioResource(ytdl(queueConstructor.songs[0].url))
    player.play(resource);
    connection.subscribe(player);
    if (!queueConstructor.loop) {
      await interaction.reply(`Je joue ${queueConstructor.songs[0].title}`)
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