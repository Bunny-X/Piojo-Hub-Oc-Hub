const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB("blacklist")
const serverlist = new db.crearDB("serverlist")
const color = '0x410255'


module.exports = {
  name: "perms",
  alias: [],

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

  
   const botMember = message.guild.members.cache.get(client.user.id);

  const botPermissions = botMember.permissions.toArray();

  const kok = new Discord.MessageEmbed()
  .setAuthor(client.user.username, client.user.avatarURL())
  .setDescription(botPermissions.join("\n"))
  .setColor(color)
  message.author.send({embeds: [kok]}).catch(error => {
    message.reply("I can't send you the permissions, please open your DM.").then(msg => {
      setTimeout(() => {
        msg.delete()
      }, 5000)
    })
  })


 }

}