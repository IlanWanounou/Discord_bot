const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => console.log('On'));

client.ws.on('INTERACTION_CREATE', async interaction => {
    const command = interaction.data.name.toLowerCase();

    if (command == `pong`) {
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 5,
            }
        })
        client.api.webhooks(client.user.id, interaction.token).messages('@original').patch({
            data: {
                content: `Ping`
            }
        })
    }
})



client.login(token);

