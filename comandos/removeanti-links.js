const Discord = require('discord.js');
const db = require('megadb');
const addbanl = new db.crearDB('addbanl');

const color = '0x410255';

module.exports = {
  name: "removebanlimit",
  alias: ["rbl"],

  execute (client, message, args) {
    var perms = message.member.permissions.has('ADMINISTRATOR')
    if(!perms){
      const owo = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
      .setColor(color)
      return message.reply({embeds: [owo]})
    }

    if(!addbanl.tiene(message.guild.id)){
        const lawa = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> The ban limit is not set.")
        .setColor(color)
        return message.reply({embeds: [lawa]})
    }

    addbanl.eliminar(message.guild.id)


    const ñ = new Discord.MessageEmbed()
    .setDescription("<:k_:995595248266915870> The ban limit has been removed.")
    .setColor(color)

    message.reply({embeds: [ñ]})
  }
}