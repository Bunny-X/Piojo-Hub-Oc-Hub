const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB("blacklist")

module.exports = {
  name: "dmall",
  alias: ["mdall"],

async execute (client, message, args){

    if(!blacklist.has(message.author.id)){
      const a = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You are not registered in the Whitelist.")
      .setColor("#410255")
       return message.reply({embeds: [a]})
    }

    try {

  await message.guild.members.fetch()

  let pendejo = args.join(" ")
  if(!pendejo){
    const lol = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You must write a message.\nMode of use: `.dmall [message]`")
    .setColor("#410255")
     return message.reply({embeds: [lol]})
  } 

  let members = message.guild.members.cache.filter(member => !member.user.bot)

  members.forEach(member => {
    member.send(pendejo).catch(e => {
      return message.author.send(`<:Converter:995595217782718475> Error sending message to ${member.user.tag}`).catch(error => {
        console.log(error)
      })
    })
  })


  const sexo = new Discord.MessageEmbed()
  .setDescription("<:k_:995595248266915870> successfully!")
  .setColor("#410255")

  message.reply({embeds: [sexo]})

  const e = new Discord.MessageEmbed()

   .setDescription(`<:k_:995595248266915870> dmall executed successfully!`)
     .addField("User", `**${message.author.tag}** | **${message.author.id}**`)
    .addField("Server Name", `**${message.guild.name}** | **${message.guild.id}**`)
    .addField("Content", `${pendejo}`)
    .setColor("#410255")
    .setThumbnail(message.author.displayAvatarURL({format: 'png', dynamic: true}))


   client.channels.cache.get("1186076417142816808").send({embeds: [e]})

    } catch (err) {
      const laoo = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> Error found")
      .addField("> Command", "`dmall`", true)
      .addField("> Error", `\`${err}\``, true)
      .setColor("#410255")
    
      client.channels.cache.get('1210148130264322119').send({embeds: [laoo]})
    }


 }

}