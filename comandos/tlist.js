const Discord = require('discord.js');
const db = require('megadb')
const tadd = new db.crearDB('tadd')

const sexo = '0x410255'

module.exports = {
  name: "tlist",
  alias: [],

async execute (client, message, args){

  if (!tadd.tiene(message.guild.id)) {
    const embed = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> There is not even a ticket")
    .setColor(sexo)
    return message.reply({embeds: [embed]})
  }

  const serverData = await tadd.obtener(message.guild.id);

  const ticketNames = Object.keys(serverData)

  if (ticketNames.length === 0) {
    const embed = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> There are no tickets in the server.")
      .setColor(sexo)
    return message.reply({embeds: [embed]});
  }

  const list = ticketNames.map(ticketName => `- *\`${ticketName}\`*`).join('\n');

  const embed = new Discord.MessageEmbed()
    .setAuthor({name: message.guild.name, iconURL: message.guild.iconURL({format: 'png', dynamic: true})})
    .setDescription(list)
    .setThumbnail("https://media.discordapp.net/attachments/947288102270021653/1156470827911487498/Converter.png?ex=651516e3&is=6513c563&hm=fda9f9cd493b7f230b0f21209c506f27f8e128d88d69b21843a4f4416d3419bc&=&width=438&height=440")
    .setColor('BLUE');

  message.reply({embeds: [embed]});
  



 }

}