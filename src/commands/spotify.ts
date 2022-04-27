const spotify = require('../utils/spotify');
module.exports = {
    name: 'spotify',
    async execute(interaction, client) {
        const user = await interaction.options.getMember('utilisateur');
        if (user.presence.activities.length>0) {
            let i = 0;
            const activities = user.presence.activities.length;
            if (activities >= 2) {
                while (i < activities && user.presence.activities[i].name != 'Spotify') {
                    i++;
                }
            }
            if (user.presence.activities[i].name === 'Spotify') {
                const data = {
                    username: user.user.username,
                    IMG: `https://i.scdn.co/image/${user.presence.activities[i].assets.largeImage.slice(8)}`,
                    URL: `https://open.spotify.com/track/${user.presence.activities[i].syncId}`,
                    Name: user.presence.activities[i].details,
                    Author: user.presence.activities[i].state,
                    Album: user.presence.activities[i].assets.largeText
                };
                interaction.reply({embeds: [spotify.spotifyEmbed(data)]})
            }
        } else {
            interaction.reply(`${user.user.username} n'est pas sur Spotify actuellement.`)
        }
    }
}