const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')
const masdinero = new db.crearDB('masdinero')
const rana = new db.crearDB('rana')

const color = '0x410255'

let cooldown = new Set()

module.exports = {
  name: "work",
  alias: ["w"],

async execute (client, message, args){

  if(cooldown.has(message.author.id)){
    const l = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> ${message.author}, you must wait 10 seconds to use the command.`)
    .setColor(color)
    return message.reply({embeds: [l]})
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, 10000);


 const user = message.author;

 if(!dinero.tiene(`${user.id}`))
 dinero.establecer(`${user.id}`, 0)

 if(!dinerobanco.tiene(`${user.id}`)){
   dinerobanco.establecer(`${user.id}`, 0)
 }

 let random = Math.floor(Math.random() * 175) + 100
 let ranas = Math.floor(Math.random() * 175) + 200
 let randomaumentado = Math.floor(Math.random() * 1075) + 900
 let randomtriplicado = Math.floor(Math.random() * 4000) + 2000

  let emojis = ["<a:8602490714281738441:953118969861115934>", "<a:Pepe_Cowboy:952323091743248434>"]
randomEMOJI = emojis[Math.floor(Math.random() * emojis.length)]

 let trabajo = ["Police", "Teacher", "Programmer"]
 let randomtrabajo = trabajo[Math.floor(Math.random() * trabajo.length)]

 let objetomasdinero = await masdinero.obtener(`${user.id}`)

  if(objetomasdinero > 0){

   dinero.sumar(`${user.id}`, randomtriplicado)
   masdinero.restar(`${user.id}`, 1)

 const o = new Discord.MessageEmbed()

 .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
 .setDescription(`You worked as a *${randomtrabajo}* and earned \`$${randomtriplicado}\` ${randomEMOJI}`)
 .setColor(color)
 .setTimestamp()

 return message.reply({embeds: [o]})

  };

  let objetodinero = await masdinero.obtener(`${user.id}`)

  if(objetodinero > 0){

   dinero.sumar(`${user.id}`, randomaumentado)
   masdinero.restar(`${user.id}`, 1)

 const ñ = new Discord.MessageEmbed()

  .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
 .setDescription(`You worked as a *${randomtrabajo}* and earned \`$${randomaumentado}\` ${randomEMOJI}`)
 .setColor(color)
 

 return message.reply({embeds: [ñ]})

  };

   let objetorana = await rana.obtener(`${user.id}`)

    if(objetorana > 0){

     dinero.sumar(`${user.id}`, ranas)

   const ñ = new Discord.MessageEmbed()

    .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
   .setDescription(`You worked as a *${randomtrabajo}* and earned \`$${ranas}\` ${randomEMOJI}`)
   .setColor(color)


   return message.reply({embeds: [ñ]})

    };



 dinero.sumar(`${user.id}`, random)

 const embed = new Discord.MessageEmbed()

  .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
 .setDescription(`You worked as a *${randomtrabajo}* and earned \`$${random}\` ${randomEMOJI}`)
 .setColor(color)
 

 message.reply({embeds: [embed]})

 return;


 }

}