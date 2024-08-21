const Discord = require('discord.js');

module.exports = {
  name: "coinflip",
  alias: [],

execute (client, message, args){

const coins = ["Heads", "Tails", "Center"];

    let result = Math.floor(Math.random() * coins.length);

    const embed = new Discord.MessageEmbed()
      .setColor("#410255")
      .setTitle(`Coin Is`)
      .setDescription(coins[result])
      .setFooter({text: message.author.username, iconURL: message.author.displayAvatarURL({dynamic: true})})
      .setTimestamp();

    message.channel.send({embeds: [embed]});




 }

}