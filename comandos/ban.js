const Discord = require('discord.js');

const color = '0x410255'

module.exports = {
  name: "ban",
  alias: [],

execute (client, message, args){

  var botperms = message.guild.me.permissions.has("BAN_MEMBERS")
  if(!botperms){
    const siu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> I don't have permissions. I need the `BAN_MEMBERS`.")
    .setColor(color)
    return message.reply({embeds: [siu]})
  }

  var perms = message.member.permissions.has("BAN_MEMBERS")
  if(!perms){
    const uwu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `BAN_MEMBERS`.")
    .setColor(color)
    return message.reply({embeds: [uwu]})
  }
 
  const usuario = message.mentions.members.first()
  if(!usuario){
    const qq = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You have to mention a user.\nMode of use: `.ban [user] [reason]`")
    .setColor(color)
    return message.reply({embeds: [qq]})
  }

  if (!usuario.bannable){
    const b = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> I couldn't ban that user. Please check member role position")
    .setColor(color)
    return message.reply({embeds: [b]})
  }

  if (
      message.member.roles.highest.comparePositionTo(usuario.roles.highest) <= 0
    ) {
      return message.reply("<:Converter:995595217782718475> I couldn't ban that user. Please check my permissions and role position.")
    }

  if(usuario.id === message.author.id){
   const uwu = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> You can't ban ${message.author.username}.`)
    .setColor(color)
    return message.reply({embeds: [uwu]})
  } 

  var razon = args.slice(1).join(" ")
 if(!razon){
   razon = 'Not specified.'
 }

  if(usuario.id === client.user.id) {
 const si = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> You can't ban ${client.user.username}.`)
    .setColor(color)
    return message.reply({embeds: [si]})
}

  usuario.ban({ reason: razon})

  const embed = new Discord.MessageEmbed()

  .setDescription(`<:k_:995595248266915870> **${usuario.user.tag} was banned**`)
  .setColor(color)

  message.reply({embeds: [embed]})

  

 }

}
