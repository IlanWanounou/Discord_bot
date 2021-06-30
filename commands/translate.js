const translate = require('@vitalets/google-translate-api');

module.exports = {
    name: 'translate',
    execute(interaction) {
        const lang = interaction.options.get('langue').value;
        const msg = interaction.options.get('message').value;

        translate(msg, {to:lang}).then(res => {
            interaction.reply(res.text)
            console.log(res.text);

        }).catch(err => {
            console.error(err);
        });

    }
    }
