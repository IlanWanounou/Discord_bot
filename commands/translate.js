const translate = require('@vitalets/google-translate-api');

module.exports = {
    name: 'translate',
    description: 'Translate a message.',
    async execute(msg, args) {
        if (!args[0]) return msg.channel.send("Mauvaise syntaxe.");
        if (!args[1]) return msg.channel.send("Mauvaise syntaxe.");
        const traduction = args.slice(1).join(" ");
        translate(traduction, { to: `${args[0]}` }).then(res => {
            msg.channel.send(res.text);
        }).catch(err => {
            console.error(err);
        });
    }
};






