const Discord = require('discord.js');

const color = "#410255"

module.exports = {
  name: "uhell",
  alias: [],

async execute (client, message, args){

  var botperms = message.guild.me.permissions.has("MANAGE_ROLES")
  if(!botperms){
    const siu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> I don't have permissions. I need the `MANAGE_ROLES`.")
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

   const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

  if(!member) {
    const qq = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You have to mention a user.\nMode of use: `.uhell [user] `")
    .setColor(color)
    return message.reply({embeds: [qq]})
  }

  if (
    message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0
  ) {
    return message.reply("**I couldn't unmute that user. Please check my permissions and role position.**")
  }

  const role = message.guild.roles.cache.find(r => r.name.toLowerCase() === 'hell')

  if(!role) {
    const qq = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> The role `hell` was not found. Please create it.")
    .setColor(color)
    return message.reply({embeds: [qq]})
  }

  if(!member.roles.cache.has(role.id)) {
    const o = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> This user is not in hell.`)
    .setColor(color)
    return message.reply({embeds: [o]})
  }

  await member.roles.remove(role)

  const sex = new Discord.MessageEmbed()
  .setDescription(`<a:8602490714281738441:953118969861115934> Your punishment has been lifted.`)
  .addField("Mod", `\`${message.author.tag}\``, true)
  .addField("Server Name", `\`${message.guild.name}\``, true)
 .setThumbnail("https://media.discordapp.net/attachments/947288102270021653/1156470827911487498/Converter.png?ex=651516e3&is=6513c563&hm=fda9f9cd493b7f230b0f21209c506f27f8e128d88d69b21843a4f4416d3419bc&=&width=438&height=440")
  .setColor(color)
  member.send({embeds: [sex]}).catch(e => {
    console.log(e)
  })

  const o = new Discord.MessageEmbed()
      .setDescription(`<:k_:995595248266915870> ***${member.displayName} was uhell***`)
      .setColor(color)

      message.reply({embeds: [o]})
  



 }

}