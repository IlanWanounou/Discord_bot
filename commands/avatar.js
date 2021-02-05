const {MessageEmbed} = require('discord.js')
module.exports = {

    name: 'avatar',
    description: "Donne la photo de profil de la personne mentionnée.",
    execute(message,args) {
            let user = message.mentions.users.first() ||message.author

            const embed = new MessageEmbed()
            .setImage(user.displayAvatarURL({dynamic:true}))
            message.channel.send(embed)
            }
        }