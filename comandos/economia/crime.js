const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')
const rata = new db.crearDB('rata')

const color = '0x410255'

let cooldown = new Set()

module.exports = {
  name: "crime",
  alias: [],

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

 let dinerouser = await dinero.obtener(`${user.id}`)
 let objetorata = await rata.obtener(`${user.id}`)


 const crimenes = ['You robbed a bank', "You stole a lady's purse", 'Te pusiste a machetear iguanas']

 const crimenesmalos = ['They try to rob a bank', 'Te han expulsado de la crew <a:custom_emoji:1215555396001865800>', 'te pusiste a machetear iguanas y los municipales te cayeron']

 let resultadosbuenos = crimenes[Math.floor(Math.random() * crimenes.length)]

 let resultadosmalos = crimenesmalos[Math.floor(Math.random() * crimenesmalos.length)]

  let resultadosrata = [resultadosbuenos, resultadosbuenos, resultadosbuenos, resultadosmalos]

 let resultados = [resultadosbuenos, resultadosmalos, resultadosmalos]

  let resultadofinall = resultadosrata[Math.floor(Math.random() * resultadosrata.length)]

 let resultadofinal = resultados[Math.floor(Math.random() * resultados.length)]

 let dineroaleatorio = Math.floor(Math.random() * dinerouser) + 1

  if(objetorata > 0){

    if(resultadofinall === resultadosmalos){
      dinero.restar(`${user.id}`, dineroaleatorio)

      const qq = new Discord.MessageEmbed()

        .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
      .setDescription(`<:Converter:995595217782718475> *${resultadosmalos}* and you lost \`$${dineroaleatorio}\` <a:custom_emoji:1215555396001865800>`)
      .setColor("RED")

      message.reply({embeds: [qq]})

      return;
    }

    };


  if(objetorata > 0) {

    if(resultadofinall === resultadosbuenos){
      dinero.sumar(`${user.id}`, dineroaleatorio)

      const owo = new Discord.MessageEmbed()

        .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
      .setDescription(`*${resultadosbuenos}* and you won \`$${dineroaleatorio}\``)
      .setColor(color)


      message.reply({embeds: [owo]})

      return;
    }

  };

  if(resultadofinal === resultadosbuenos){
    dinero.sumar(`${user.id}`, dineroaleatorio)

    const owo = new Discord.MessageEmbed()

      .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setDescription(`*${resultadosbuenos}* and you won \`$${dineroaleatorio}\``)
    .setColor(color)
  

    message.reply({embeds: [owo]})

    return;
  }

  if(resultadofinal === resultadosmalos){
    dinero.restar(`${user.id}`, dineroaleatorio)

    const qq = new Discord.MessageEmbed()

      .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setDescription(`<:Converter:995595217782718475> *${resultadosmalos}* and you lost \`$${dineroaleatorio}\` <a:custom_emoji:1215555396001865800>`)
    .setColor("RED")

    message.reply({embeds: [qq]})

    return;
  }


 



 }

}