const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB('blacklist')

const color = '0x410255'

module.exports = {
  name: "unwhitelist",
  alias: ["ulist"],
  owner: true,

execute (client, message, args){

  const user = message.mentions.members.first()
  if(!user) return message.channel.send("**You have to mention a user.**")

  if(!blacklist.has(user.id)) return message.channel.send("**This user is not registered in the whitelist.**")


  blacklist.eliminar(user.id, user.user.tag)

  const e = new Discord.MessageEmbed()

 .setTitle("<:custom_emoji:1215561259416821780> Removed.")
 .addField("User", `**${user.user.tag}** | **${user.user.id}**`)
 .addField("Server Name", `**${message.guild.name}** | **${message.guild.id}**`)
 .setImage()
 .setColor(color)
 .setFooter({text: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})   
 .setThumbnail(user.user.displayAvatarURL({format: 'png'}))
 .setTimestamp()

  const embed = new Discord.MessageEmbed()

  .setTitle("Success!")
  .setDescription(`${user} has been removed from the white list!`)
    .addField("Mod:", message.author.tag)
  .setColor(color)
   .setThumbnail(user.user.displayAvatarURL({format: 'png', dynamic: true}))

  message.channel.send({embeds: [embed]})

  client.channels.cache.get("1186076079874641961").send({embeds: [e]})






 }

}