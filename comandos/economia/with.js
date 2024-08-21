const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')

const color = '0x410255'

module.exports = {
  name: "with",
  alias: [],

async execute (client, message, args){

  const user = message.author;

  const cantidad = args[0]
  if(!cantidad){
    const owo = new Discord.MessageEmbed()
     .setDescription("<:Converter:995595217782718475> You must say an amount.\nMode of use: `.with [amount] | .with all`")
     .setColor(color)
     return message.reply({embeds: [owo]})
  }

  if (cantidad.toLowerCase() === 'all') {
    
  const dinerobancototal = await dinerobanco.obtener(`${user.id}`)

    if (dinerobancototal <= 0){
      const cody = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You don't have money to withdraw.")
      .setColor(color)
      return message.reply({embeds: [cody]}) 
    }

  dinero.sumar(`${user.id}`, dinerobancototal)
  dinerobanco.restar(`${user.id}`, dinerobancototal)

    const embed = new Discord.MessageEmbed()

     .setDescription(`<:k_:995595248266915870> ${message.author}, You retired \`$${dinerobancototal}\``)
     .setColor(color)

     return message.reply({embeds: [embed]})
 }
  

  const cantidadNumerica = parseFloat(cantidad);

  if (isNaN(cantidadNumerica) || !Number.isFinite(cantidadNumerica)) {
    const si = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> Please provide a valid number.")
      .setColor(color)
    return message.reply({ embeds: [si] })
  }

 const dinerobancot = await dinerobanco.obtener(`${user.id}`)
if(dinerobancot < cantidad){
  const si = new Discord.MessageEmbed()
   .setDescription("<:Converter:995595217782718475> You don't have that many coins!")
   .setColor(color)
   return message.reply({embeds: [si]})
}

  if (cantidadNumerica < 0) {
    const ñ = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You can't put negative numbers.")
      .setColor(color)
    return message.reply({ embeds: [ñ] })
  }

  dinero.sumar(`${user.id}`, cantidadNumerica)
  dinerobanco.restar(`${user.id}`, cantidadNumerica)

  const pro = new Discord.MessageEmbed()

   .setDescription(`<:k_:995595248266915870> ${message.author}, you retired \`$${cantidad}\` to the bank! `)
   .setColor(color)

   message.reply({embeds: [pro]})




 }

}