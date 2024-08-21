const Discord = require('discord.js');
const db = require('megadb')
const tadd = new db.crearDB('tadd')

const color = '0x410255'

module.exports = {
  name: "tdelete",
  alias: [],

async execute (client, message, args){

  var perms = message.member.permissions.has("ADMINISTRATOR")
  if(!perms){
    const uwu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
    .setColor(color)
    return message.reply({embeds: [uwu]})
  }

    if (!tadd.tiene(message.guild.id)) {
        const embed = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> There is not a single ticket saved.")
        .setColor(color)
        return message.reply({embeds: [embed]})
      }

  const ticketName = args.join(' ').toLowerCase();
  if (!ticketName) {
    const em = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You have not specified the name of the ticket.\nMode of use: `.tdelete [name]`")
    .setColor(color)
    return message.reply({embeds: [em]})
  }

  const data = await tadd.obtener(message.guild.id)
  const ticketData = data[ticketName]

  if (!ticketData) {
    const embed = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Ticket not found.")
    .setColor(color)
    return message.reply({embeds: [embed]})
  }

  await tadd.eliminar(`${message.guild.id}.${ticketName}`)

  const lala = new Discord.MessageEmbed()
  .setDescription("<:k_:995595248266915870> Ticket successfully deleted.")
  .setColor(color)
  
message.reply({embeds: [lala]})


 }

}