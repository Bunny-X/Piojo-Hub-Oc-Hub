const Discord = require('discord.js');

const color = '0x410255'

module.exports = {
  name: "md",
  alias: [],

execute (client, message, args){

  var perms = message.member.permissions.has('ADMINISTRATOR')
  if(!perms){
    const owo = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
    .setColor("#410255")
    return message.reply({embeds: [owo]})
  }

 let persona = message.mentions.members.first()
 if(!persona){
   const qq = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You have to mention a user.\nMode of use: `.md [user] [message]`")
    .setColor("#410255")
    return message.reply({embeds: [qq]})
  }

 if(persona.user.bot) return message.channel.send("**No.**")

 if(persona.id === client.user.id){
   const uwu = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> You can't run this command with ${message.author.username}.`)
    .setColor("#410255")
    return message.reply({embeds: [uwu]})
  }
 

 let texto = message.content.slice(4);
     if(texto.startsWith(" ")){
       texto = texto.slice(1);
     }
    
    let embed = new Discord.MessageEmbed()
     .setTitle("Message DM")
     .setTimestamp()
     .setImage(message.attachments.first() ? message.attachments.first().proxyURL : null)
     .setColor(color)
     .setDescription(texto);
     message.delete()
     persona.send({embeds: [embed]}).catch(() => message.channel.send("User's DMs are closed | Please use .md <@User> <message> instead!"))

     const s = new Discord.MessageEmbed()
     .setDescription("<:k_:995595248266915870> successful")
     .setColor(color)

     message.channel.send({embeds: [s]})
   }
 }


