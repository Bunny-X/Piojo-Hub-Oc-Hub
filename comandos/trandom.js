const Discord = require('discord.js');
const db = require('megadb')
const tadd = new db.crearDB('tadd')

const color = '0x410255'

module.exports = {
  name: "trandom",
  alias: [],

async execute (client, message, args){

    try {

    if (!tadd.tiene(message.guild.id)) {
        const embed = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> There is not a single ticket saved.")
        .setColor(color)
        return message.reply({embeds: [embed]})
      }

  const lol = await tadd.obtener(message.guild.id)
  const ticketNames = Object.keys(lol)

  const randomTicketName = ticketNames[Math.floor(Math.random() * ticketNames.length)];

  const ticketData = lol[randomTicketName]
  const { image, date, user } = ticketData[0]



  const embed = new Discord.MessageEmbed()
  .setAuthor({name: randomTicketName, iconURL: user})
  .setColor(color)
  .setImage(image)
  .setFooter(date)
  message.reply({embeds: [embed]})
  


    } catch (err) {
      const embed = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> There is not a single ticket saved.")
      .setColor(color)
      message.reply({embeds: [embed]})
    }




 }

}