module.exports = {

    name: 'ban',
    description: 'ban un membre',
    execute(message) {
        if (!message.member.hasPermission("ADMIMISTATOR")) return message.channel.send(`Tu n'as pas la permission pour ban.`);
        if (!message.guild.me.hasPermission("ADMIMISTATOR")) return message.channel.send(`Je n'ai pas la permission pour ban.`);
        const user = message.mentions.members.first();
        if (message.author.id == user) return message.channel.send("Tu veux vraiment t'auto-ban?");
        if (user === message.guild.me) return message.channel.send(`Tu peux pas me ban.`);
        message.channel.send(`${user} est ban.`);
        user.ban();
    }
}