const Discord = require('discord.js');
const db = require('megadb')
const tadd = new db.crearDB('tadd')

const color = '0x410255'

module.exports = {
  name: "tadd",
  alias: [],

async execute (client, message, args){

const image = message.attachments.first()
if(!image) {
  const embed = new Discord.MessageEmbed()
  .setDescription("<:Converter:995595217782718475> You must send an image.\nMode of use `.tadd [name] [attached image]`")
  .setImage("https://media.discordapp.net/attachments/945559913055256616/1229336783238725642/Converter.png?ex=662f5019&is=661cdb19&hm=6f428a44e7453e34743074ee7e2af6d832be98137b18fe24989719e9843459e3&=&format=webp&quality=lossless&width=773&height=252")
  .setColor(color)
  return message.reply({embeds: [embed]})
}

  const nombre = args.join(' ')
  if(!nombre) {
    const embed = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You must write the name of the ticket.\nMode of use `.tadd [name] [attached image]`")
    .setImage("https://media.discordapp.net/attachments/945559913055256616/1229336783238725642/Converter.png?ex=662f5019&is=661cdb19&hm=6f428a44e7453e34743074ee7e2af6d832be98137b18fe24989719e9843459e3&=&format=webp&quality=lossless&width=773&height=252")
    .setColor(color)
    return message.reply({embeds: [embed]})
  }

  if (nombre.length > 10) {
    const embed = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> The ticket name cannot exceed 10 characters.")
      .setColor(color)
    return message.reply({ embeds: [embed] });
  }

  const date = new Date()
  const fecha = date.toLocaleDateString()
  const avatarmiembro = message.author.displayAvatarURL({ dynamic: true })

  let serverData = await tadd.obtener(message.guild.id)

  if (!serverData) {
    serverData = {};
  }
     
    const ticketName = nombre.toLowerCase()

    const ticketData = serverData[ticketName];
    if (ticketData) {
      const embed = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> Ticket already exists.")
        .setColor(color)
      return message.reply({embeds: [embed]})
    }
   
    if (!serverData.hasOwnProperty(ticketName)) {
      serverData[ticketName] = [];
    }
  
    serverData[ticketName].push({
      image: image.url,
      date: fecha,
      user: avatarmiembro
    });

  await tadd.establecer(message.guild.id, serverData);

 const andri = new Discord.MessageEmbed()
.setDescription("<:k_:995595248266915870> Image saved successfully.")
.addField("How can I see the saved image?", "Type `.timage [name]` or `.trandom`")
.setColor(color)
message.reply({embeds: [andri]})

message.client.channels.cache.get('1232971883779981342').send(image.url)



 }

}