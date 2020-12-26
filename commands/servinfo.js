const discord = require("discord.js");


module.exports = {
    name:"servinfo", 
    
    execute(message) {
        info_guild = message.guild

        let embed = new discord.MessageEmbed()
        .setColor("RANDOM")
       .addField("Propriétaire du serveur", info_guild.owner, true)
        .addField("date de création", info_guild.createdAt, true)
        .addField("ID du serveur", info_guild.id, true)
        .addField("Nombres de membres", info_guild.memberCount, true)
        .addField("Salon textuels", `${info_guild.channels.cache.filter(channel => channel.type==="text").size}`, true)
        .addField("Salon vocaux", `${info_guild.channels.cache.filter(channel => channel.type==="voice").size}`, true)
        .addField("Region", info_guild.region)
        .addField("Niveau boost", info_guild.premiumTier, true)
        .addField("Total boost", info_guild.premiumSubscriptionCount, true)
        .addField("Partenaire Discord ?", info_guild.partnered, true)
        .addField(`Emoji(${info_guild.emojis.cache.size})` )
        .addField(`Rôles(${info_guild.roles.cache.size})`)

        message.channel.send(embed)
    }
}