const Discord = require('discord.js');

const color = '0x410255'

module.exports = {
  name: "mute",
  alias: [],

async execute (client, message, args){

  var perms = message.member.permissions.has("MANAGE_ROLES")
  if(!perms){
    const uwu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `MANAGE_ROLES`.")
    .setColor(color)
    return message.reply({embeds: [uwu]})
  }

  var botperms = message.guild.me.permissions.has("MANAGE_ROLES")
  if(!botperms){
    const siu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> I don't have permissions. I need the `MANAGE_ROLES`.")
    .setColor(color)
    return message.reply({embeds: [siu]})
  }

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
          if(!member){
           const qq = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You have to mention a user.\nMode of use: `.mute [user] `")
      .setColor(color)
      return message.reply({embeds: [qq]})
    }

    if (
      message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0
    ) {
      return message.reply("<:Converter:995595217782718475> **I couldn't hell that user. Please check my permissions and role position.**")
    }

    if(member.id === client.user.id) {
     const si = new Discord.MessageEmbed()
        .setDescription(`<:Converter:995595217782718475> You can't hell ${client.user.username}.`)
        .setColor(color)
        return message.reply({embeds: [si]})
    } 

     let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'muted');

    if(!role) {
      try {
        message.reply("<:Converter:995595217782718475> **Creating the role..**")

        role = await message.guild.roles.create({
          data: {
            permissions: []
          }
        })

        await role.setName('muted')

         message.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').forEach(async (channel) => {
           await channel.permissionOverwrites.edit(role, {
             SEND_MESSAGES: false,
             });
         });

    message.channel.send('**Muted role has successfully been created and configured.**')

  } catch (err) {
    console.log(err)
    message.channel.send("**An error has occurred.**")
  }

  }

if (
      message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0
    ) {
      return message.reply("<:Converter:995595217782718475> I couldn't mute that user. Please check my permissions and role position.")
    }

    if(member.id === message.author.id){
   const uwu = new Discord.MessageEmbed()
      .setDescription(`<:Converter:995595217782718475> You can't mute ${message.author.username}.`)
    .setColor(color)
    return message.reply({embeds: [uwu]})
  }

  if(member.id === client.user.id) {
 const si = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> You can't mute ${client.user.username}.`)
    .setColor(color)
    return message.reply({embeds: [si]})
}

    if(member.roles.cache.has(role.id)) {
      const o = new Discord.MessageEmbed()
      .setDescription(`<:Converter:995595217782718475> ${member} has already been muted.`)
      .setColor(color)
      return message.reply({embeds: [o]})
    }
  
        await member.roles.add(role)
          const o = new Discord.MessageEmbed()
        
        .setDescription(`<:k_:995595248266915870> ***${member.user.username} was muted***`)
        .setColor(color)
       
        message.reply({embeds: [o]})


 }

}