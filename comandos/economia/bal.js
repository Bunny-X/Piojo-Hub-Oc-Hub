const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')

const color = '0x410255'

module.exports = {
  name: "bal",
  alias: [],

async execute (client, message, args){

  const user = message.mentions.users.first() || message.author;

 if(!dinero.tiene(`${user.id}`)){
 dinero.establecer(`${user.id}`, 0)
 }

 if(!dinerobanco.tiene(`${user.id}`)){
   dinerobanco.establecer(`${user.id}`, 0)
 }

 const dinerototal = await dinero.obtener(`${user.id}`)
 const dinerobancototal = await dinerobanco.obtener(`${user.id}`)

 const embed = new Discord.MessageEmbed()

  .setAuthor(user.tag, user.displayAvatarURL()) 
   .setAuthor({name: user.tag, iconURL: user.displayAvatarURL({dynamic: true})})
 
 .setDescription(`> *Money:* \`$${dinerototal}\` \n> *Money in the bank:* \`$${dinerobancototal}\` \n> *Total Money:* \`$${dinerototal + dinerobancototal}\``)
 .setColor(color)
 .setThumbnail(user.displayAvatarURL( {format: 'png', dynamic: 'true'} ))


 message.reply({embeds: [embed]})

 }

}