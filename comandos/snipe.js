const Discord = require('discord.js');
const db = require('megadb');
const serversnipe = new db.crearDB("serversnipe");
const sexo = '0x410255';
module.exports = {
    name: 'snipe',
    //
execute (client, message, args){

  if(serversnipe.tiene(message.guild.id)) {

    var perms = message.member.permissions.has("ADMINISTRATOR")
    if(!perms){
      const uwu = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
      .setColor(sexo)
      return message.reply({embeds: [uwu]})
    }
    
  }

        const msg = client.snipes.get(message.channel.id)
 if(!msg){
   const embed = new Discord.MessageEmbed()
   .setDescription("<:Converter:995595217782718475> Error, there's nothing to snipe.")
   .setColor(sexo)
   message.reply({embeds: [embed]}) 
 } else {
   const embed = new Discord.MessageEmbed()
            .setAuthor({name: 'Message Deleted'})
            .setTitle('Content')
            .setDescription(msg.embedContent || msg.content)
            .setFooter({text: msg.author, iconURL: msg.member.user.displayAvatarURL({dynamic: true})})
            .setColor("0x410255")
            .setTimestamp()

if(msg.image) embed.setImage(msg.image);

   message.reply({embeds: [embed]})

 }


 }
 
}