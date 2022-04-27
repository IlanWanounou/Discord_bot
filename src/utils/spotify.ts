import {MessageEmbed} from 'discord.js';

export  function spotifyEmbed(data) : MessageEmbed {
    return new MessageEmbed()
        .setAuthor({
            name:`${data.username} écoute actuellement`,
            iconURL : 'https://cdn.discordapp.com/emojis/408668371039682560.png'})
        .setColor(0x1ED760)
        .setThumbnail(data.IMG)
        .addField('Nom de la musique', data.Name, true)
        .addField('Album', data.Album, true)
        .addField('Auteur', data.Author, false)
        .addField('URL', `${data.URL}`, false)
}