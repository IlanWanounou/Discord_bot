module.exports = {

    name: 'mute',
    description: 'mute un membre',
    execute(message) {
        if (!message.member.hasPermission("ADMIMISTATOR")) return message.channel.send(`Tu n'as pas la permission pour mute.`);
        if (!message.guild.me.hasPermission("ADMIMISTATOR")) return message.channel.send(`Je n'ai pas la permission pour mute.`);
        const user = message.mentions.members.first();
        const role = message.guild.roles.cache.find(role => role.name === "mute");
        if (!role) return message.channel.send("Le rôle `mute` n'existe pas.");
        if (!user.role) return message.channel.send(`${user} a déjà était mute.`);
        user.roles.add(role);
        message.channel.send(`${user} est mute.`);

    }
}