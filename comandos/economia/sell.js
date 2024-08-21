const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const masdinero = new db.crearDB('masdinero')
const rana = new db.crearDB('rana')
const rata = new db.crearDB('rata')
const mono = new db.crearDB('mono')

const color = '0x410255'

let cooldown = new Set()

module.exports = {
  name: "sell",
  alias: [],

async execute (client, message, args){

  if(cooldown.has(message.author.id)){
    const l = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> ${message.author}, you must wait 3 seconds to use the command.`)
    .setColor(color)
    return message.reply({embeds: [l]})
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, 3000);

  try {


  const user = message.author;

  const objeto = args.join(' ')
  if(!objeto){
    const owo = new Discord.MessageEmbed()
    .setDescription("You have to mention an object.\nMode of use: `.sell 🐒`")
    .setColor(color)
    return message.reply({embeds: [owo]})
  } 

  if(!masdinero.tiene(`${user.id}`)){
    masdinero.establecer(`${user.id}`, 0)
  }

  if(!rana.tiene(`${user.id}`)){
    rana.establecer(`${user.id}`, 0)
  }

  if(!rata.tiene(`${user.id}`)){
    rata.establecer(`${user.id}`, 0)
  }

  if(!mono.tiene(`${user.id}`)){
    mono.establecer(`${user.id}`, 0)
  }

  const dinerouser = await masdinero.obtener(`${user.id}`)
   const monouser = await mono.obtener(`${user.id}`)
   const ranauser = await rana.obtener(`${user.id}`)
   const ratauser = await rata.obtener(`${user.id}`)

  if(objeto === 'x2'){

    if(dinerouser <= 0){
      const owo = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You don't have any.")
      .setColor(color)
      return message.reply({embeds: [owo]})
    }

    dinero.sumar(user.id, 5000)

  masdinero.restar(`${user.id}`, 3)

    const embed12 = new Discord.MessageEmbed()

    .setDescription("<:k_:995595248266915870> You sold the item **Double xp** for `$5,000`.")
    .setColor(color)

    message.reply({embeds: [embed12]})


  }

  if(objeto === 'x3'){

    if(dinerouser <= 0){
      const owo = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You don't have any.")
      .setColor(color)
      return message.reply({embeds: [owo]})
    }

    dinero.sumar(user.id, 15000)

  masdinero.restar(`${user.id}`, 4)

    const embed12 = new Discord.MessageEmbed()

    .setDescription("<:k_:995595248266915870> You sold the item **Triple xp** for `$15,000`.")
    .setColor(color)

    message.reply({embeds: [embed12]})

  }

  if(objeto === '🦎'){

    if(ranauser <= 0){
      const owo = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You don't have any.")
      .setColor(color)
      return message.reply({embeds: [owo]})
    }

    dinero.sumar(user.id, 5000)

  rana.restar(`${user.id}`, 1)

    const embed12 = new Discord.MessageEmbed()

    .setDescription("<:k_:995595248266915870> You sold the item 🦎 for `$5,000`.")
    .setColor(color)

    message.reply({embeds: [embed12]})


  }

  if(objeto === '🐀'){

    if(ratauser <= 0){
      const owo = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You don't have any.")
      .setColor(color)
      return message.reply({embeds: [owo]})
    }

    dinero.sumar(user.id, 5000)

  rata.restar(`${user.id}`, 1)

    const embed12 = new Discord.MessageEmbed()

    .setDescription("<:k_:995595248266915870> You sold the item 🐀 for `$5,000`.")
    .setColor(color)

    message.reply({embeds: [embed12]})


  }

  if(objeto === '🐒'){

    if(monouser <= 0){
      const owo = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You don't have any.")
      .setColor(color)
      return message.reply({embeds: [owo]})
    }

    dinero.sumar(user.id, 5000)

  mono.restar(`${user.id}`, 1)

    const embed12 = new Discord.MessageEmbed()

    .setDescription("<:k_:995595248266915870> You sold the item 🐒 for `$5,000`.")
    .setColor(color)

    message.reply({embeds: [embed12]})


  }

  } catch {
    const embed = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You don't have that item.")
    .setColor(color)
    return message.reply({embeds: [embed]})
  }



 }

}