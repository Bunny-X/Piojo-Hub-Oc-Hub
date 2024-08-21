const Discord = require('discord.js');
const db = require('megadb')
const niveless = new db.crearDB('niveless')

const color = '0x410255'

module.exports = {
  name: "setlevel",
  alias: [],

execute (client, message, args){

  var perms = message.member.permissions.has('ADMINISTRATOR')
    if(!perms){
      const owo = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
      .setColor(color)
      return message.reply({embeds: [owo]})
    }

   const canal = message.mentions.channels.first()
    if(!canal) return message.reply("**You have to mention a channel.**")

    if(canal.type === "GUILD_VOICE"){
      const lol = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You can't set voice channels as logs.")
      .setColor(color)
      return message.reply({embeds: [lol]})
    }

    if(canal.type === "GUILD_CATEGORY"){
      const lal = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You can't set categories like logs.")
      .setColor(color)
      return message.reply({embeds: [lal]})
    } 

    if (!canal.permissionsFor(message.guild.me).has(["SEND_MESSAGES", "VIEW_CHANNEL"])){
      const l = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> I can't send messages in this channel, please check the channel permissions.")
      .setColor(color)
      return message.reply({embeds: [l]})
    } 

    niveless.establecer(message.guild.id, canal.id)

    const embed = new Discord.MessageEmbed()

      .setDescription(`<:k_:995595248266915870> The logs have been established in the ${canal} channel.`)
    .setColor(color)

    message.reply({embeds: [embed]})




 }

}