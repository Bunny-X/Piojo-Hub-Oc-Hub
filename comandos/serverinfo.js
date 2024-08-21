const Discord = require('discord.js');

module.exports = {
  name: "serverinfo",
  alias: ["server"],

execute (client, message, args){

  var server = message.guild;

  function formatDate (template, date){
  var tiempo = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(tiempo[i]).join(item)

  }, template)
  }

 const embed = new Discord.MessageEmbed() 

 .setThumbnail(message.guild.iconURL({format: 'png', dynamic: true}))
 .setAuthor(message.author.username, message.author.displayAvatarURL({ size: 1024, dynamic: true }))
 .setTimestamp()
 .setTitle(`${message.guild.name} Information!`)
 .setColor("#0f0f0f")
 .setDescription(`<:Converter2:995595195229945937> Información General\n\n> **Owner** <@${message.guild.ownerId}> \n> **Server ID** ${message.guild.id} \n> **Creación** ${formatDate('DD/MM/YYYY, a las HH:mm:ss', server.createdAt)} \n> **Regíon** ${ message.guild.region}\n\n <:o_:995595334497603641> Información Básica\n\n> **Miembros** ${message.guild.memberCount} \n> **Mejoras** ${message.guild.premiumSubscriptionCount.toString()} \n> **Bots** ${message.guild.members.cache.filter(m => m.user.bot).size}\n> **Emojis** ${message.guild.emojis.cache.size} \n> **Roles** ${ message.guild.roles.cache.size} \n\n <:loi:995595308958494760> Estadisticas\n\n> **Nivel de Verificación** ${message.guild.verificationLevel}`)

  message.channel.send({embeds: [embed]})
 


 }

}