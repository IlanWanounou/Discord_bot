module.exports = {

    name: 'kick',
    description: 'kick un membre',
    execute(message) {
        if (!message.member.hasPermission("ADMIMISTATOR")) return message.channel.send(`Tu n'as pas la permission pour kick.`);
        if (!message.guild.me.hasPermission("ADMIMISTATOR")) return message.channel.send(`Je n'ai pas la permission pour kick.`);
        const user = message.mentions.members.first();
        if (message.author.id == user) return message.channel.send("Tu veux vraiment t'auto-kick?");
        if (user === message.guild.me) return message.channel.send(`Tu peux pas me kick.`);
        message.channel.send(`${user} est kick.`);
        user.kick();

    }
}