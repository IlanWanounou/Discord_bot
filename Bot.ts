import * as Canvas from "@napi-rs/canvas";
import * as Discord from "discord.js";
import { request } from "undici";
require('dotenv').config()


console.log("Bot is starting...");

const client = new Discord.Client({ intents: [Discord.IntentsBitField.Flags.Guilds, Discord.IntentsBitField.Flags.MessageContent, Discord.IntentsBitField.Flags.GuildMessages, Discord.IntentsBitField.Flags.GuildMembers] });
    Discord.IntentsBitField.Flags.DirectMessages,

client.login(process.env.TOKEN);

/*client.on("interactionCreate", async (interaction: Interaction) => {
   if (interaction.isCommand() || interaction.isContextMenuCommand()) {
    const cmd = interaction.commandName;
    if(cmd) console.log("Test command");
    }
});

client.on("guildMemberAdd", member => {
    console.log("test command");
   let channel = client.channels.cache.get("1033495351216308285");
   (channel as TextChannel).send(`Bienvenue ${member.user.tag}!`);
});

client.on('guildMemberAdd', member => {
    member.createDM().then(channel => {
      return channel.send('Bienvenue sur mon serveur ' + member.displayName)
    }).catch(console.error)
    // On pourrait catch l'erreur autrement ici (l'utilisateur a peut être désactivé les MP)
  })*/


const applyText = (canvas: Canvas.Canvas, text: string) => {
  const context = canvas.getContext('2d');

  let fontSize = 70;

  do {
    context.font = `${fontSize -= 10}px sans-serif`;
  } while (context.measureText(text).width > canvas.width - 300);
  return context.font;
};


client.on('messageCreate', async message => {
  // if(message.author.bot) return;
  if (message.content == 'testBievenue') {
    //fond canvas;
    const canvas = Canvas.createCanvas(700, 250);
    const context = canvas.getContext('2d');
    const background = await Canvas.loadImage('https://media.discordapp.net/attachments/1033019431858749630/1033690592112291850/a96ef48fc7d08178025944ffb82be3a6.jpg');
    context.drawImage(background, 0, 0, canvas.width, canvas.height);




    //text;
    context.strokeRect(0, 0, canvas.width, canvas.height);
    context.font = '28px sans-serif';
    context.fillStyle = '#ffffff';
    context.fillText('Bievenue', canvas.width / 2.5, canvas.height / 3.5);
    context.font = applyText(canvas, `${message.author.username}!`);
    context.fillStyle = '#ffffff';
    context.fillText(`${message.author.username}!`, canvas.width / 2.5, canvas.height / 1.8);



    //img profile

    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();


    const { body } = await request(message.author.displayAvatarURL({ extension: 'jpg' }));
    const avatar = await Canvas.loadImage(await body.arrayBuffer());
    context.drawImage(avatar, 25, 25, 200, 200);



    //envoie;
    const attachment = new Discord.AttachmentBuilder(await canvas.encode('png'), { name: `${message.author.username}-NMS.png` });
    message.channel.send({ files: [attachment] });
  }
  */

client.on('interactionCreate', async interaction => {
  if (interaction.isCommand()) {
    const cmd = interaction.commandName;
    if (cmd === 'getgoulag') {
      const member = interaction.member as Discord.GuildMember;
      if (!member.permissions.has("Administrator")) {
        interaction.reply({ content: "Vous n'êtes pas autorisé à le faire. L'élite peut !", ephemeral: true });
      } else {
        let user = interaction.options.getMember("user");
        user = user as Discord.GuildMember;
        await user.roles.remove(user.roles.cache);
        await user.roles.add("1033686117687513088");
        interaction.reply({ content: "Ce voyage reste entre nous. Vive le partie!", ephemeral:true });
      }
    } else {
      interaction.reply({ content:"Commande non disponible", ephemeral:true });
    }
  }
});

client.on('guildMemberUpdate', async function (oldMember, newMember) {
  if (!oldMember.roles.cache.has('1033686117687513088') &&
    newMember.roles.cache.has('1033686117687513088')) {
    newMember.createDM().then(channel => {
      return channel.send("Bienvenue dans le centre de réhabilitation *Gloire au régime libre et puissant!");
    })
  }
})
