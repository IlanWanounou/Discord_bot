module.exports = {

    name: 'unmute',
    description: 'unmute un membre',
    execute(message) {
        if (!message.member.hasPermission("ADMIMISTATOR")) return message.channel.send(`Tu n'as pas la permission pour unmute.`);
        if (!message.guild.me.hasPermission("ADMIMISTATOR")) return message.channel.send(`Je n'ai pas la permission pour unmute.`);
        const user = message.mentions.members.first();
        const role = message.guild.roles.cache.find(role => role.name === "mute");
        user.roles.remove(role);
        message.channel.send(`${user} est unmute.`);

    }
}