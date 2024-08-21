const Discord = require('discord.js');

module.exports = {
  name: "shop",
  alias: [],

execute (client, message, args){

  const embed = new Discord.MessageEmbed()

  .setAuthor({name: client.user.username, iconURL: client.user.avatarURL()})
  .setDescription("With the `.buy` command you can buy items from the shop.")
    .addField("> `$5,000` *- x2*", "» **Double xp** item, you earn x2 money.")
    .addField("> `$15,000` *- x3*", "» **Triple xp** item, you earn x3 money.")
    .addField("> `$5,000` *-* 🐀", "» **Chris** you are more likely to succeed in a crime.")
    .addField("> `$5,000` *-* 🦎", "» **Oc-Hub** Now you earn 2% more.")
    .addField("> `$5,000` *-* 🐒", "» **Brasileño** will keep you company.")
    .addField("> `$6,500` *-* 🦧", "» **Mono ratero** Your robbery has a 100% chance of going well.")
  .setColor("0x410255")

  message.reply({embeds: [embed]})






 }

}