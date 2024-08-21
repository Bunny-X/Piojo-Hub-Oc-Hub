const Discord = require('discord.js');

const color = '0x410255'

module.exports = {
  name: "converter",
  alias: ["convertir"],

execute (client, message, args){

  try{

  if(!args[0]){
    const e = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Please specify a format to convert and attach a valid file.\nMode of use: `.converter png {image}`")   .setImage("https://media.discordapp.net/attachments/947288102270021653/1007125666493382676/unknown.png")
    .setColor(color)
    return message.reply({embeds: [e]})
  }

  let archivo = new Discord.MessageAttachment(args[1] || message.attachments.first().url, `Converter.${args[0]}`)

  message.reply({ files: [archivo] })


  } catch (e) {
 const l = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Please specify a format to convert and attach a valid file!\nFormats: `png, mp4, mp3`")
    .setColor(color)
    .setImage("https://media.discordapp.net/attachments/945559913055256616/1038234022825955369/image.png")
   message.reply({embeds: [l]})
 }



 }

}