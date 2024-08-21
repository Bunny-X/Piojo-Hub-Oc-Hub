const Discord = require('discord.js');

const sexo = '0x410255'

module.exports = {
  name: "unmute",
  alias: [],

async execute (client, message, args){

  var perms = message.member.permissions.has("MANAGE_ROLES")
  if(!perms){
    const uwu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `MANAGE_ROLES`.")
    .setColor(sexo)
    return message.reply({embeds: [uwu]})
  }

  var botperms = message.guild.me.permissions.has("MANAGE_ROLES")
  if(!botperms){
    const siu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> I don't have permissions. I need the `MANAGE_ROLES`.")
    .setColor(sexo)
    return message.reply({embeds: [siu]})
  }

 const Member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

            if(!Member){
         const qq = new Discord.MessageEmbed()
    .setDescription("You have to mention a user.\nMode of use: `.unmute [user] [reason]`")
    .setColor("#410255")
    return message.reply({embeds: [qq]})
  }

  if (
      message.member.roles.highest.comparePositionTo(Member.roles.highest) <= 0
    ) {
      return message.reply("I couldn't unmute that user. Please check my permissions and role position.")
    }

        const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'muted');

        await Member.roles.remove(role)

   const o = new Discord.MessageEmbed()
        .setDescription(`<:k_:995595248266915870> **${Member.displayName} was unmuted**`)
        .setColor(sexo)

        message.channel.send({embeds: [o]})
    }





}