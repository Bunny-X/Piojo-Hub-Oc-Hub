const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB("blacklist")
const serverlist = new db.crearDB("serverlist")
const sexo = '0x410255'

let cooldown = new Set()

module.exports = {
  name: "spam",
  alias: [],

execute (client, message, args){ 

   if(cooldown.has(message.author.id)){
    const l = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> ${message.author.username}, you must wait 3 seconds to reuse the command`)
    .setColor(sexo)
    return message.reply({embeds: [l]})
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, 3000);

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


  let pendejo = args[1]

  let texto = args.slice(2).join(' ') || "";
  


const user = message.mentions.members.first()
  if(!user){
    const qq = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You have to mention a user.\nMode of use: `.spam [amount] [user] [text]`")
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

  let cantidad = args[0]
  if(!cantidad){
    const qq = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You must say an amount!.\nMode of use: `.spam [amount] [user] [text]`")
    .setColor(sexo)
    return message.reply({embeds: [qq]})
  }

  if(isNaN(cantidad)){
    const qq = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You must say number!.\nMode of use: `.spam [amount] [user] [text]`")
    .setColor(sexo)
    return message.reply({embeds: [qq]})
  }

    for(let i = 0; i < cantidad; i++) {


   message.channel.send(`${pendejo} ${texto}`, i)
}



  const e = new Discord.MessageEmbed()

   
   .setDescription(`<:k_:995595248266915870> Spam executed successfully!`)
     .addField("User", `**${message.author.tag}** | **${message.author.id}**`)
    .addField("Server Name", `**${message.guild.name}** | **${message.guild.id}**`)
    .addField("Content", `${pendejo} ${texto}`, true)
    .addField("Quantity", `\`${cantidad}\``, true)
   .setColor(sexo)
    .setThumbnail(message.author.displayAvatarURL({format: 'png', dynamic: true}))


   client.channels.cache.get("1186076417142816808").send({embeds: [e]}).catch(err => {
    console.log(err)
   })

 






 }

}