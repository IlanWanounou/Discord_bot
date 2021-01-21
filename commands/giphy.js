const giphy = require('giphy-api')(token);
module.exports = {
    name: 'giphy',
    description: 'envoie un gif',
    execute(message, args) {
        giphy.random(args[0]).then(function (res) {
            message.channel.send(res.data.url);
            console.log(res);

        });
    }
};
