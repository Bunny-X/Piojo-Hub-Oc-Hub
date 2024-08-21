const Discord = require('discord.js');

module.exports = {
  name: "howgay",
  alias: [],

execute (client, message, args){

 let Member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]) ||
      message.member;

    let Result = Math.floor(Math.random() * 101);

    let embed = new Discord.MessageEmbed()
      .setColor("#410255")
      .setTitle(`Gay Machine`)
      .setDescription(`${Member.user.username} Is ${Result}% Gay 🏳️‍🌈`)
      .setFooter({text: `Requested by ${message.author.username}`, iconURL: message.author.displayAvatarURL({dynamic: true})})
      .setTimestamp();

    message.channel.send({embeds: [embed]});





 }

}