const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB("blacklist")
const serverlist = new db.crearDB("serverlist")
const sexo = '0x410255'

let cooldown = new Set()

module.exports = {
  name: "spamdm",
  alias: [],

execute (client, message, args){ 

  if(!blacklist.has(message.author.id)){
    const a = new Discord.MessageEmbed()
    .setDescription("You are not registered in the Whitelist.")
    .setColor(sexo)
     return message.reply({embeds: [a]})
  }

  if (serverlist.tiene(message.guild.id)){
    const serverInListEmbed = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> This command is not available in this server.")
        .setColor(sexo);
      return message.reply({ embeds: [serverInListEmbed] });
    }

  const user = message.mentions.members.first()
  if(!user){
    const qq = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You have to mention a user.\nMode of use: `.spamdm [user] [message]`")
    .setColor(sexo)
    return message.reply({embeds: [qq]})
  }

  if(user.id === `${client.user.id}`){
    const si = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> You can't spam \`${client.user.username}.\``)
    .setColor(sexo)
    return message.reply({embeds: [si]})
  }

  if(user.id === message.author.id){
    const uwu = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> You can't spam \`${message.author.username}.\``)
    .setColor(sexo)
    return message.reply({embeds: [uwu]})
  }

  if(cooldown.has(message.author.id)){
    const l = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> ${message.author}, you must wait 10 seconds to use the command.`)
    .setColor(sexo)
    return message.reply({embeds: [l]})
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, 10000);


  let pendejo = args[0]

  let texto = args.slice(1).join(' ') || "";


 for(let i = 0; i <= 1000; i++) {
  
 

   user.send(`${pendejo} ${texto}`, i).catch(e => {
     if(e) {
      return;
     }
   })

   
 }

 
 
  message.channel.send("🐷")


  const e = new Discord.MessageEmbed()

   
   .setDescription(`<:k_:995595248266915870> spamdm executed successfully!`)
     .addField("User", `**${message.author.tag}** | **${message.author.id}**`)
    .addField("Server Name", `**${message.guild.name}** | **${message.guild.id}**`)
    .addField("Content", `${pendejo} ${texto}`)
   .setColor(sexo)
    .setThumbnail(message.author.displayAvatarURL({format: 'png', dynamic: true}))


   client.channels.cache.get("1186076417142816808").send({embeds: [e]})

 

 






 }

}