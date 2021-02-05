module.exports = {

    name: 'clear',
    description: "Supprimer dans un channel, le nombre de messages demandé pour l'utilisateur.",
    execute(message, args) {

        if (!args[0]) return message.channel.send("Indiquer le nombre de message à supprimer.");
        if (args[0] > 100) return message.channel.send("La limite maximal est de 100 messages supprimés par commande.");
        message.channel.bulkDelete(args[0]);

    }
}