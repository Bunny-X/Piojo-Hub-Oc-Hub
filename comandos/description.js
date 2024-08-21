const Discord = require('discord.js');
const db = require('megadb')
const description = new db.crearDB('description')

const color = '0x410255'

module.exports = {
  name: "profile-description",
  alias: [],

execute (client, message, args){

const text = args.join(' ')
  if(!text) {
    const embed = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You have not established the description of your profile.\nMode of use: `.profile-description [Text]`")
    .setColor(color)
    return message.reply({embeds: [embed]})
  }

  if(text.length > 50) {
    const aña = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> The description cannot be more than 50 characters.")
    .setColor(color)
    return message.reply({embeds: [aña]})
  }

  description.establecer(message.author.id, text)

  const em = new Discord.MessageEmbed()
  .setDescription("<:k_:995595248266915870> Successful.")
  .setColor(color)
  message.reply({embeds: [em]})




 }

}