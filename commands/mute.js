module.exports = {

    name: 'mute',
    description: 'mute un membre',
    execute(message) {
        if (!message.member.hasPermission("ADMIMISTATOR")) return message.channel.send(`Tu n'as pas la permission pour mute.`);
        if (!message.guild.me.hasPermission("ADMIMISTATOR")) return message.channel.send(`Je n'ai pas la permission pour mute.`);
        const user = message.mentions.members.first();
        const role = message.guild.roles.cache.find(role => role.name === "mute");
        if (message.author.id == user) return message.channel.send("Tu veux vraiment t'auto-mute?");
        if (!role) return message.channel.send("Le rôle `mute` n'existe pas.");
        //console.log
        if (message.member.roles.cache.some(role => role.name === 'mute')) return message.channel.send(`${user} à déjà était mute.`);
        user.roles.add(role);
        message.channel.send(`${user} est mute.`);

    }
}