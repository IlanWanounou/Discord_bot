const giphy = require( 'giphy' )( token );
const {MessageEmbed} = require('discord.js')
module.exports = {
	name: 'giphy',
	description: 'envoie un gif',
    execute(message, args) {
    if(args[0]) return message.channel.send('Error')
    

    }
    }
