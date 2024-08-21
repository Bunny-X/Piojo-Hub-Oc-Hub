const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB('blacklist')

const color = '0x410255'

module.exports = {
  name: "whitelist",
  alias: ["list"],
  owner: true,

 execute (client, message, args){

  let usuario = message.mentions.members.first()
  if(!usuario) return message.reply("**You have to mention a user.**")

  var razon = args.slice(1).join(" ")
 if(!razon){
   razon = 'No hay ni una razón.'
 }

  if(blacklist.has(usuario.id)) return message.channel.send("**This user was already registered in the whitelist.**")

  

  if(usuario.user.bot) return message.channel.send("**No**") 


 blacklist.establecer(usuario.id, usuario.user.tag)

 const e = new Discord.MessageEmbed()

 .setTitle("<:custom_emoji:1215561290819575840> Whitelist Logger")
 .addField("User", `**${usuario.user.tag}** | **${usuario.user.id}**`)
 .addField("Server Name", `**${message.guild.name}** | **${message.guild.id}**`)
 .addField("Reason", razon)
 .setImage()
   .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
 .setColor(color)
 .setThumbnail(usuario.user.displayAvatarURL({format: 'png', dynamic: true}))
 .setTimestamp()
 

 const embed = new Discord.MessageEmbed()

 .setTitle("Success!")
 .setDescription(`<:custom_emoji:1215928341123829890> ${usuario} You have been added to the whitelist!`)
   .addField("*How to get verified?*", '> 1- Ingresa a la página.\n> 2- En "Nombre de Usuario" escribe: **`admin`**\n> 3- En "Contraseña" escribe: **`password`**')
   .addField("**» Link**", "[Click here](https://dppbleed.github.io/NuevaVidaLaQueMeEstoyDando/)")
   .setImage("https://media.discordapp.net/attachments/945559913055256616/1267760682137554976/image.png?ex=66a9f5a4&is=66a8a424&hm=b2f304ebdbb633101ed7b460996b3b1c676cbbe2930af32c368c7e09ff5d1f5e&=&format=webp&quality=lossless&width=1020&height=497")
 .setColor(color)
  .setThumbnail(usuario.user.displayAvatarURL({format: 'png', dynamic: true}))
 
 message.channel.send({embeds: [embed]})

 client.channels.cache.get("1186076079874641961").send({embeds: [e]})

 client.channels.cache.get("1265925553525882971").send(`**${usuario.user.tag} | ${usuario.user.id}**`)


 }

}