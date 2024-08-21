const Discord = require('discord.js');
const db = require('megadb');
const addbanf = new db.crearDB('addbanf');

const color = '0x410255';

module.exports = {
  name: "removebanflood",
  alias: ["rbf"],

  execute (client, message, args) {
    var perms = message.member.permissions.has('ADMINISTRATOR')
    if(!perms){
      const owo = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
      .setColor(color)
      return message.reply({embeds: [owo]})
    }

    if(!addbanf.tiene(message.guild.id)){
        const lawa = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> The ban limit is not set.")
        .setColor(color)
        return message.reply({embeds: [lawa]})
    }

    addbanf.eliminar(message.guild.id)


    const ñ = new Discord.MessageEmbed()
    .setDescription("<:k_:995595248266915870> The ban limit has been removed.")
    .setColor(color)

    message.reply({embeds: [ñ]})
  }
}