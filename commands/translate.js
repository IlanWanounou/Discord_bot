const translate = require('translate-google')
module.exports = {
    name: 'translate',
    async execute(interaction) {
                const langue = interaction.options.get('langue').value;
                const message = interaction.options.get('message').value;
                console.log(langue, message)
               await translate(message, {to: langue}).then(res => {
                    interaction.reply(res);
                }).catch(err => {
                    console.error(err)
                })
    }
}