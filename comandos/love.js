const Discord = require('discord.js');
const Canvas = require('canvas')
const color = '0x410255'

module.exports = {
  name: "love",
  alias: ["ship"],

async execute (client, message, args){

  const porcentaje = Math.floor(Math.random()*101)


 let descripcion;
let emoji;

if(porcentaje <= 23){
  descripcion = `** ${porcentaje}% |  ** Nisiquiera debieron conocerse, los 2 no son compatibles y son muy diferentes.`
  emoji = 'https://images.emojiterra.com/twitter/v13.0/512px/1f645-2640.png'
}

if(porcentaje > 23 && porcentaje <= 47){
  descripcion = `** ${porcentaje}% | ** Podrian ser amigos, pero no veo un futuro mayor entre ellos, tienen algunos gustos similares.`
  emoji = 'https://images.emojiterra.com/twitter/v13.0/512px/1f91d.png'
}

if(porcentaje > 47 && porcentaje <= 80){
  descripcion = `** ${porcentaje}% | ** Podrian ser una pareja, los gustos son casi iguales y saben mucho uno del otro.`
  emoji = 'https://images.emojiterra.com/twitter/v13.0/512px/1f440.png'
}

if(porcentaje > 80){
  descripcion = `** ${porcentaje}% | ** Serian una exelente pareja, pueden llegar a casarse algun dia, los gustos son iguales y se llevan muy bien.`
  emoji = 'https://images.emojiterra.com/twitter/v13.0/512px/1f468-1f469-1f467.png'
}


const avatar1 = message.author.displayAvatarURL({ size: 1024, format: 'png' })
const mencion = message.mentions.users.first()

if(!mencion){
  const w = new Discord.MessageEmbed()
  .setDescription("<:Converter:995595217782718475> You have to mention a user.\nMode of use: `.ship [user]`")
  .setColor(color)
  return message.reply({embeds: [w]})
}

  if(mencion.id === message.author.id){
    const si = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You cannot use this command on yourself.")
    .setColor(color)
    return message.reply({embeds: [si]})
  }

const avatar2 = mencion.displayAvatarURL({ size: 1024, format: 'png' })

const lienzo = Canvas.createCanvas(700, 250)
const ctx = lienzo.getContext('2d')
const img1 = await Canvas.loadImage(avatar1)
const img2 = await Canvas.loadImage(avatar2)
const emoji2 = await Canvas.loadImage(emoji)


ctx.drawImage(img1, 25, 25, 200, 200)

ctx.drawImage(emoji2, 250, 25, 200, 200)

ctx.drawImage(img2, 480, 25, 200, 200)

const attachment = new Discord.MessageAttachment(lienzo.toBuffer(), 'logo.png');

  const puo = new Discord.MessageEmbed()
    .setImage(`attachment://logo.png`)
  .setTitle(descripcion)
  .setColor(color)

  
message.reply({embeds: [puo], files : [attachment]})

 }

}