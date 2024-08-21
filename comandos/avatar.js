const Discord = require('discord.js');

const color = '0x410255'

module.exports = {
  name: "avatar",
  alias: ["av"],

async execute (client, message, args){

  let member;

  if (message.mentions.members.size > 0) {
    member = message.mentions.members.first();
  } else {
    try {
      member = await message.guild.members.fetch(args[0]);
    } catch (error) {
      console.log(error)
    }
  }

  if(!member || !member.user){
   member = message.member;
  }

    const embed = new Discord.MessageEmbed()
      .setColor(color)
      
      .setDescription(`**Links**\n[png](${member.user.displayAvatarURL({format: 'png', dynamic: true})}) | [jpg](${member.user.displayAvatarURL({format: 'jpg', dynamic: true})}) | [webp](${member.user.displayAvatarURL({format: 'webp', dynamic: true})})`)
      
      .setImage(member.user.displayAvatarURL({ size: 2048, dynamic: true }))
      .setTimestamp();

    message.reply({embeds: [embed]});





 }

}