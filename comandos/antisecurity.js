const Discord = require('discord.js');
const sexo = '0x410255';
const db = require('megadb');
const securityrol = new db.crearDB("securityrol");

module.exports = {
  name: "antisecurity",
  alias: ["srol"],

execute (client, message, args){

  var perms = message.member.permissions.has("ADMINISTRATOR")
  if(!perms){
    const uwu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
    .setColor(sexo)
    return message.reply({embeds: [uwu]})
  }

  try {

  const rol = message.mentions.roles.first()
  if(!rol) {
    const lol = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You need to mentions a role.\nMode of use: `.antisecurity [ROL]`")
    .setColor(sexo)
    return message.reply({embeds: [lol]})
  }

  securityrol.establecer(message.guild.id, rol.id)

  const embed = new Discord.MessageEmbed()
  .setDescription(`<:k_:995595248266915870> The role ${rol} has been established as a security role.`)
  .setColor(sexo)
  message.reply({embeds: [embed]})
  
  } catch (err) {
    message.reply("<:Converter:995595217782718475> Error found.")
    console.log(err)
  }



 }

}