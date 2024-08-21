const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')

const color = '0x410255'

module.exports = {
  name: "dep",
  alias: [],

async execute (client, message, args){

  const user = message.author;

 const cantidad = args[0]
 if(!cantidad){
   const owo = new Discord.MessageEmbed()
   .setDescription("<:Converter:995595217782718475> You must say an amount.\nMode of use: `.dep [amount] | .dep all`")
   .setColor(color)
   return message.reply({embeds: [owo]})
 }


 if (cantidad.toLowerCase() === 'all') {
   const dinerototal = await dinero.obtener(`${user.id}`)

   if (dinerototal <= 0){
      const cody = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You have no money. 🤣")
      .setColor(color)
      return message.reply({embeds: [cody]}) 
    }

   if (!(await dinerobanco.tiene(`${user.id}`))) {
     dinerobanco.establecer(`${user.id}`, 0);
   }

   dinero.restar(`${user.id}`, dinerototal)
   dinerobanco.sumar(`${user.id}`, dinerototal)

   const embed = new Discord.MessageEmbed()

   .setDescription(`<:k_:995595248266915870> ${message.author}, You have saved \`$${dinerototal}\``)
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

 const dinerot = await dinero.obtener(`${user.id}`)

 if(cantidad > dinerot){
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

 dinero.restar(`${user.id}`, cantidadNumerica)
 dinerobanco.sumar(`${user.id}`, cantidadNumerica)

 const pro = new Discord.MessageEmbed()

 .setDescription(`<:k_:995595248266915870> ${message.author}, you saved \`$${cantidad}\` to the bank! `)
 .setColor(color)

 message.reply({embeds: [pro]})


 }

}