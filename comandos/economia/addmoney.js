const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB("blacklist")
const dinero = new db.crearDB('dinero')

const color = '0x410255'

let cooldown = new Set()

module.exports = {
  name: "addmoney",
  alias: [],

execute (client, message, args){

  if(cooldown.has(message.author.id)){
    const l = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> ${message.author}, you must wait 5 seconds to use the command.`)
    .setColor(color)
    return message.reply({embeds: [l]})
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, 5000);

  if(!blacklist.has(message.author.id)){
    const a = new Discord.MessageEmbed()
    .setDescription("You are not registered in the Whitelist.")
    .setColor(color)
     return message.reply({embeds: [a]})
  }

  const user = message.mentions.users.first()
  if(!user){
    const qq = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You have to mention a user.\nMode of use: `.addmoney [amount] [user] `")
    .setColor(color)
    return message.reply({embeds: [qq]})
  }

   if(user.bot){
    const error = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> User invalid.")
    .setColor(color)
    return message.reply({embeds: [error]})
  }

  if(!dinero.tiene(user.id)){
    dinero.establecer(user.id, 0)
  }


 const dinerocantidad = args[0]
 if(!dinerocantidad){
   const owo = new Discord.MessageEmbed()
   .setDescription("<:Converter:995595217782718475> You have to say an amount.\nMode of use: `.addmoney [amount] [user] `")
   .setColor(color)

   return message.reply({embeds: [owo]})
 }

  if(isNaN(dinerocantidad)){
    const q = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You must say number.\nMode of use: `.addmoney [amount] [user]`")
    .setColor(color)
    return message.reply({embeds: [q]})
  }

  if(dinerocantidad < 0) {
    const ñ = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You can't put negative numbers.")
      .setColor(color)
    return message.reply({ embeds: [ñ] })
  }

 if(dinerocantidad > 10000000){
   const out = new Discord.MessageEmbed()
   .setDescription("<:Converter:995595217782718475> You can't add such a high amount!")
   .setColor(color)
   return message.reply({embeds: [out]})
 }

 dinero.sumar(user.id, dinerocantidad)

 const embed = new Discord.MessageEmbed()
 .setDescription(`<:k_:995595248266915870> ${user} has received \`$${dinerocantidad}\` from ${message.author}.`)
 .setColor(color)


 message.channel.send({embeds: [embed]})




 }

}