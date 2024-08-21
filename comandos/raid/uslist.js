const Discord = require('discord.js');
const db = require('megadb')
const serverlist = new db.crearDB("serverlist")
const blacklist = new db.crearDB('blacklist')
const sexo = '0x410255'

module.exports = {
  name: "uslist",
  alias: [],
  owner: true,
 

async execute (client, message, args){

  const id = args[0]
  if(!id){
    const k = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Please specify a valid ID.\nMode of use: `.uslist [Serverid]`")
    .setColor(sexo)
    return message.reply({embeds: [k]})
  }

  const guild = client.guilds.cache.get(id)

  if(!serverlist.tiene(id)) {
    const lala = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> The server is not listed.")
    .setColor(sexo)
    return message.reply({embeds: [lala]});
  } else {

    serverlist.eliminar(id)

    const la = new Discord.MessageEmbed()
    .setDescription("<:k_:995595248266915870> Successful")
    .setColor(sexo)
    message.reply({embeds: [la]})
  }


  const e = new Discord.MessageEmbed()

  .setTitle("<:custom_emoji:1215561259416821780> Server Removed.")
  .addField("> Moderator", `\`${message.author.tag} | ${message.author.id}\``)
  .addField("> Server Name", `\`${guild.name} | ${guild.id}\``)
  .addField("> Owner", `<@${guild.ownerId}>`, true)
  .addField("> Members", `\`${guild.memberCount}\``, true)
  .setColor(sexo)
  .setThumbnail(guild.iconURL({format: "png", dynamic: true}))
  .setTimestamp()

  client.channels.cache.get("1200029936782688287").send({embeds: [e]})



 }

}