const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB("blacklist")

module.exports = {
  name: "addrole",
  alias: ["addrol"],

async execute (client, message, args){

    if(!blacklist.has(message.author.id)){
      const a = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You are not registered in the Whitelist.")
      .setColor("#410255")
       return message.reply({embeds: [a]})
    }
    
  var perms = message.member.permissions.has('ADMINISTRATOR')
  if(!perms){
    const owo = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
    .setColor("#410255")
    return message.reply({embeds: [owo]})
  }

  await message.guild.members.fetch()

  let rolID = args[0]
  let lol = message.guild.roles.cache.get(rolID)

  if(!lol){
    const lele = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Not found role.\nMode of use: `.addrole [rolID]`")
    .setColor("#410255")
    return message.reply({embeds: [lele]})
  }


   let members = message.guild.members.cache.filter(member => !member.user.bot && member.id !== message.author.id)

  members.forEach(member => {
    member.roles.add(lol).catch(error => console.log(`Error al otorgar el rol: ${error}`))
  })


  const sexo = new Discord.MessageEmbed()
  .setDescription("<:k_:995595248266915870> successfully!")
  .setColor("#410255")

  message.reply({embeds: [sexo]})

  


 }

}