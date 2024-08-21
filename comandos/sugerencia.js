const Discord = require('discord.js');

const color = '0x410255'

module.exports = {
  name: "sugerencia",
  alias: [],

execute (client, message, args){

    if (message.guild.id === '902770809100177418') {

  const sugerencia = args.join(" ")
  if(!sugerencia){
    const lol = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Write something that contributes to the server.\nMode of use: `.sugerencia [Message]`")
    .setColor(color)
    return message.reply({embeds: [lol]})
  }

  if(sugerencia.includes("discord.gg")){
    const ñw = new Discord.MessageEmbed()
    .setDescription("No puedes poner invitaciones!")
    .setColor(color)
    return message.reply({embeds: [ñw]})
  }

  const embed = new Discord.MessageEmbed()

  .setTitle("Nueva sugerencia!")
  .setDescription(`${sugerencia}`)
  .setFooter({text: `Idea by ${message.author.tag}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
  .setTimestamp()
  .setColor(color)

  const embedbueno = new Discord.MessageEmbed()

  .setDescription("<:k_:995595248266915870> Your suggestion has been sent!")
  .setColor(color)

  message.reply({embeds: [embedbueno]})
      

    message.client.channels.cache.get('1251093961125269506').send({embeds: [embed]}).then(msg => {
      msg.react('<:k_:995595248266915870>')
      msg.react('<:Converter:995595217782718475>')
      msg.react('<a:8602490714281738441:953118969861115934>')
  })

    }


 }

}