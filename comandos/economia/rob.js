const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')
const monogrande = new db.crearDB('monogrande')

const color = '0x410255'

module.exports = {
  name: "rob",
  alias: [],

async execute (client, message, args){

 const user = message.author
 const persona = message.mentions.users.first()

 if(!persona){
   const qq = new Discord.MessageEmbed()
   .setDescription("<:Converter:995595217782718475> You have to mention a user.\nMode of use: `.rob [user] `")
   .setColor(color)
   return message.reply({embeds: [qq]})
 }

 let dineropersona = await dinero.obtener(`${persona.id}`)
 let dinerouser = await dinero.obtener(`${user.id}`)
 let objetomono = await monogrande.obtener(`${user.id}`)

 let dineroaleatorio = Math.floor(Math.random() * dineropersona) + 1

 if(persona.id === message.author.id){
   const uwu = new Discord.MessageEmbed()
   .setDescription(`<:Converter:995595217782718475> You can't rob \`${message.author.username}.\``)
   .setColor(color)
   return message.reply({embeds: [uwu]})
 }

  if(persona.bot || !isNaN(args[0])){
    const errorr = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> User invalid")
    .setColor(color)
    return message.reply({embeds: [errorr]});
  }

 if(!isNaN(args[0])){
   const errorr = new Discord.MessageEmbed()
   .setDescription("<:Converter:995595217782718475> User invalid")
   .setColor(color)
   return message.reply({embeds: [errorr]})
 }

 if(dineropersona < 100){
   const nya = new Discord.MessageEmbed()
   .setDescription("<:Converter:995595217782718475> This person has very little money, you can't steal from him. <a:custom_emoji:1215555396001865800>")
   .setColor(color)
   return message.reply({embeds: [nya]})
 }

 if(!dinero.tiene(`${persona.id}`)){
   const uva = new Discord.MessageEmbed()
   .setDescription("<:Converter:995595217782718475> This person doesn't have money.")
   .setColor(color)
   return message.reply({embeds: [uva]})
 }

 let resultadomalo = ['mal']
 let resultadobueno = ['bien']
 let resultadomono = ['bien']
 let resultado = [resultadobueno, resultadomalo]
 let resultadofinal = resultado[Math.floor(Math.random() * resultado.length)]
 let resultadofinall = resultadomono[Math.floor(Math.random() * resultadomono.length)]
  

  

  if(objetomono > 0) {
  if(resultadofinall === 'bien'){

     monogrande.restar(`${user.id}`, 1)
     dinero.restar(persona.id, dineroaleatorio)

     dinero.sumar(user.id, dineroaleatorio)

     const john = new Discord.MessageEmbed()

       .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
     .setDescription(`You robbed ${persona} and got \`$${dineroaleatorio}\` 💀`)
     .setColor(color)


     message.reply({embeds: [john]})

    return;
    
   }

  }
  

  if(resultadofinal === resultadomalo){
     dinero.restar(persona.id, dineroaleatorio)

     dinero.sumar(user.id, dineroaleatorio)

     const john = new Discord.MessageEmbed()

       .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
     .setDescription(`You robbed ${persona} and got \`$${dineroaleatorio}\` 💀`)
     .setColor(color)


    return message.reply({embeds: [john]})
   }

   if(resultadofinal === resultadobueno){

    dinero.restar(user.id, dineroaleatorio)

    const jon = new Discord.MessageEmbed()

     .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
     .setDescription(`You tried to rob a ${persona} and you lost \`${dineroaleatorio}\` <a:custom_emoji:1215555396001865800>`)
     .setColor("RED")

     return message.channel.send({embeds: [jon]})
   }


 }

}