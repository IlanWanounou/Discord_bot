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
        if(!voiceChannel)  {
            client.api.interactions(interaction.id, interaction.token).callback.post({
              data: {
                  type: 4,
                  data: {

                      content: 'impossible vous n\'etes pas dans un chanel vocal',
                  }
              }
          })
        } else {
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {

                        content: `${voiceChannel.name} rejoin`,
                    }
                }
            })
        }
        await voiceChannel.join();
    }

    if (command === `clear`) {
        const guild = client.guilds.cache.get(interaction.guild_id)
        const member = guild.members.cache.get(interaction.member.user.id);
        const channel = client.channels.cache.get(interaction.channel_id);
      //  if (member.hasPermission("MANAGE_CHANNELS")) return channel.send("test")
        channel.bulkDelete(args[0].value)
        client.api.interactions(interaction.id, interaction.token).callback.post({
            data: {
                type: 4,
                data: {
                    flags: 64,
                    content: 'Message(s) supprimer',
                }
            }
        })
        /*  if(!member.hasPermission("MANAGE_CHANNELS"));
          if(!guild.me.hasPermission("MANAGE_CHANNELS"));*/
//console.log(guild.channels.cache.get(interaction.channel_id))
    }

})



