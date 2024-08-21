const Discord = require('discord.js');
const db = require('megadb')
const serversnipe = new db.crearDB("serversnipe")
const sexo = '0x410255'

module.exports = {
  name: "snipe-off",
  alias: [],
 
async execute (client, message, args){

    var perms = message.member.permissions.has("ADMINISTRATOR")
    if(!perms){
      const uwu = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
      .setColor(sexo)
      return message.reply({embeds: [uwu]})
    }

  const id = message.guild.id;

  const guild = client.guilds.cache.get(id)

  if(!serversnipe.tiene(id)) {
    const lala = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> The server is not listed.")
    .setColor(sexo)
    return message.reply({embeds: [lala]});
  } else {

    serversnipe.eliminar(id)

    const la = new Discord.MessageEmbed()
    .setDescription("<:k_:995595248266915870> Successful")
    .setColor(sexo)
    message.reply({embeds: [la]})
  }





 }

}