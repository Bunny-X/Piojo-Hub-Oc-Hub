const Discord = require('discord.js');

const color = '0x410255'

module.exports = {
  name: "clear",
  alias: [],

async execute (client, message, args){

  if (!message.member.permissions.has("MANAGE_MESSAGES"))
  return message.channel.send(
    "You Don't Have Permission To Use This Command!"
  );

   var botperms = message.guild.me.permissions.has("MANAGE_MESSAGES")
  if(!botperms){
    const siu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> I don't have permissions. I need the `MANAGE_MESSAGES`.")
    .setColor("#0f0f0f")
    return message.reply({embeds: [siu]})
  }
      
        if(!args[0]){
          const lol = new Discord.MessageEmbed()
          .setDescription('Please specify a number of messages to delete ranging from 1 - 99')
          .setColor("#0f0f0f")
          return message.reply({embeds: [lol]})
        }
        if(isNaN(args[0])){
          const lw = new Discord.MessageEmbed()
          .setDescription('Numbers are only allowed')
          .setColor("#0f0f0f")
          return message.reply({embeds: [lw]})
        }
        if(parseInt(args[0]) > 99){
          const l = new Discord.MessageEmbed()
          .setDescription('The max amount of messages that I can delete is 99')
          .setColor("#0f0f0f")
          return message.reply({embeds: [l]})
        }
        await message.channel.bulkDelete(parseInt(args[0]) + 1)
            .catch(err => console.log(err))
  const lww = new Discord.MessageEmbed()
  .setDescription('**Deleted** ' + args[0]  + " **messages..**")
  .setColor("#0f0f0f")
        message.channel.send({embeds: [lww]})
    }
}




