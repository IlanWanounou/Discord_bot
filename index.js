const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => console.log('On'));
client.login(token);

client.ws.on('INTERACTION_CREATE', async interaction => {
    const command = interaction.data.name.toLowerCase();
    const args = interaction.data.options;


    if (command === `join`) {
        const guild = client.guilds.cache.get(interaction.guild_id)
        const member = guild.members.cache.get(interaction.member.user.id);
        const voiceChannel = member.voice.channel;
        await voiceChannel.join();
        /*  client.api.interactions(interaction.id, interaction.token).callback.post({
              data: {
                  type: 4,
                  data: {

                      content: 'H@cked by y0u$$ et co a ton vocal',
                  }
              }
          })*/
    }

    if (command === `clear`) {
      const guild = client.guilds.cache.get(interaction.guild_id);
      const channel = guild.channels.cache.get(interaction.channel_id);
        console.log(channel)

        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    flags: 64,
                    content: 'H@cked by y0u$$ et co a ton vocal',
                }
            }
        })
        /*  if(!member.hasPermission("MANAGE_CHANNELS"));
          if(!guild.me.hasPermission("MANAGE_CHANNELS"));*/
//console.log(guild.channels.cache.get(interaction.channel_id))
    }

})



