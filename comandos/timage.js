const Discord = require('discord.js');
const db = require('megadb')
const tadd = new db.crearDB('tadd')

const color = '0x410255'

module.exports = {
  name: "timage",
  alias: [],

async execute (client, message, args){

if (!tadd.tiene(message.guild.id)) {
  const embed = new Discord.MessageEmbed()
  .setDescription("<:Converter:995595217782718475> There is not a single ticket saved.")
  .setColor(color)
  return message.reply({embeds: [embed]})
}

  const ticketName = args.join(' ').toLowerCase();
  if (!ticketName) {
    const embed = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You must write the name of the ticket. <a:custom_emoji:1225679453926064269>\nMode of use: `.timage [name]`")
      .setColor(color)
    return message.reply({ embeds: [embed] });
  }


const data = await tadd.obtener(message.guild.id)

   const ticketData = data[ticketName];
    if (!ticketData) {
      const embed = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> Ticket not found.")
        .setColor(color)
      return message.reply({ embeds: [embed] })
    }

    const { image, date, user } = ticketData[0];
     const embed = new Discord.MessageEmbed()
     .setAuthor({name: ticketName, iconURL: user})
     .setColor(color)
     .setImage(image)
     .setFooter(date)
     return message.reply({ embeds: [embed] })


 }

}