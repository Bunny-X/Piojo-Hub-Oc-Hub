const Discord = require('discord.js');

const color = "#410255"

module.exports = {
  name: "hell",
  alias: [],

async execute (client, message, args){

  var botperms = message.guild.me.permissions.has("ADMINISTRATOR")
  if(!botperms){
    const siu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> I don't have permissions. I need the `ADMINISTRATOR`.")
    .setColor(color)
    return message.reply({embeds: [siu]})
  }

  var perms = message.member.permissions.has('ADMINISTRATOR')
  if(!perms){
    const owo = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
    .setColor(color)
    return message.reply({embeds: [owo]})
  }

  try {

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
          if(!member){
           const qq = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You have to mention a user.\nMode of use: `.hell [user] `")
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

     let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'hell');

    if(!role) {
      try {
        message.reply("<:Converter:995595217782718475> **Creating the role..**")

        role = await message.guild.roles.create({
          data: {
            permissions: []
          }
        })

        await role.setName('hell')

         message.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').forEach(async (channel) => {
           await channel.permissionOverwrites.edit(role, {
             SEND_MESSAGES: false,
             ADD_REACTIONS: false, 
             VIEW_CHANNEL: false
             });
         });

    message.channel.send('**Hell role has successfully been created and configured.**')

  } catch (err) {
    console.log(err)
    message.channel.send("**An error has occurred.**")
  }

  }

    message.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').forEach(async (channel) => {
       await channel.permissionOverwrites.edit(role, {
         CONNECT: false,
         SPEAK: false
         });
     });

   if(member.voice.channel) {
       await member.voice.setChannel(null)
   }

    if(member.roles.cache.has(role.id)) {
      const o = new Discord.MessageEmbed()
      .setDescription(`<:Converter:995595217782718475> *${member.user.username}* is already in hell.`)
      .setColor(color)
      return message.reply({embeds: [o]})
    }
    
     await member.roles.add(role)

    const sex = new Discord.MessageEmbed()
    .setDescription(`<a:8602490714281738441:953118969861115934> You are inside the cage.`)
    .addField("Mod", `\`${message.author.tag}\``, true)
    .addField("Server Name", `\`${message.guild.name}\``, true)
    .setColor(color)
    .setThumbnail("https://media.discordapp.net/attachments/947288102270021653/1156470827911487498/Converter.png?ex=651516e3&is=6513c563&hm=fda9f9cd493b7f230b0f21209c506f27f8e128d88d69b21843a4f4416d3419bc&=&width=438&height=440")
    member.send({embeds: [sex]}).catch(e => {
      console.log(e)
    })

    const lol = new Discord.MessageEmbed()
    .setDescription(`<:k_:995595248266915870> ${member} cannot see any channel on the server.`)
    .setColor(color)

  message.reply({embeds: [lol]})

  } catch (err) {
    message.reply("Error " + err)
  }


 }

}