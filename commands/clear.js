module.exports = {

    name: 'clear',
    description: "Supprimer dans un channel, le nombre de messages demandé pour l'utilisateur.",
    execute(message, args) {
        if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`Tu n'as pas la permission.`);
        if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`Je n'ai pas la permission.`);

        if (!args[0]) return message.channel.send("Indiquer le nombre de message à supprimer.");
        if (args[0] > 100) return message.channel.send("La limite maximal est de 100 messages supprimés par commande.");
        message.channel.bulkDelete(args[0]);

    }
}