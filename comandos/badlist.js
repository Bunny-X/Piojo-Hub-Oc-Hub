const Discord = require('discord.js');
const db = require('megadb')
const badlist = new db.crearDB('badlist')

const color = '0x410255'

module.exports = {
  name: "blacklist",
  alias: ["blist"],
  owner: true,

 execute (client, message, args){

  let usuario = message.mentions.members.first()
  if(!usuario) return message.reply("**You have to mention a user.**")

  var razon = args.slice(1).join(" ")
 if(!razon){
   razon = 'No hay ni una razón.'
 }

  if(badlist.has(usuario.id)) return message.channel.send("**This user was already registered in the BlackList.**")


   if(usuario.id === message.author.id){
    const uwu = new Discord.MessageEmbed()

     .setDescription("No")
     .setColor(color)
     return message.channel.send({embeds: [uwu]})
   }


  if(usuario.user.bot) return message.channel.send("**No**") 


 badlist.establecer(usuario.id, usuario.user.tag)

   const a = new Discord.MessageEmbed()
   .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL()})
   .setDescription(`<:custom_emoji:1215561290819575840> Information about ${usuario}`)
   .addField("> User Tag", `\`${usuario.user.tag}\``, true)
   .addField("> User ID", `\`${usuario.id}\``, true)
   .addField("> Nickname", `\`${usuario.nickname ? usuario.nickname : 'None'}\``, true)
   .addField("> Account Created", `\`${usuario.user.createdAt.toDateString()}\``, true)
   .addField("> Reason", `\`${razon}\``, true)
   .setColor(color)
   .setThumbnail(usuario.user.displayAvatarURL({ format: 'png', dynamic: true }))

  
   client.channels.cache.get("1266578332749664387").send({embeds: [a]})

   message.react("<a:custom_emoji:1225679453926064269>").catch(err => {
    console.log(err)
   })

 }

}