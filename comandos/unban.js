const Discord = require('discord.js');

const color = "#410255"

module.exports = {
  name: "unban",
  alias: [],

async execute (client, message, args){

 var perms = message.member.permissions.has("BAN_MEMBERS")
 if(!perms){
   const sex = new Discord.MessageEmbed()
   .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `BAN_MEMBERS`.")
   .setColor("#410255")
   return message.reply({embeds: [sex]})
 }

 if(!message.guild.me.permissions.has("BAN_MEMBERS")){
   const lol = new Discord.MessageEmbed()
   .setDescription("<:Converter:995595217782718475> I don't have permissions. I need the `BAN_MEMBERS`.")
   .setColor("#410255")
   return message.reply({embeds: [lol]})
 }

 try {

 let userID = args[0];
 if(!userID){
   const llw = new Discord.MessageEmbed()
   .setDescription("<:Converter:995595217782718475> Too few arguments given.\nMode of use: `.unban [ID User] [reason]`")
   .setColor("#410255")
   return message.reply({embeds: [llw]})
 }
 
 const member = await client.users.fetch(userID)

 message.guild.bans.fetch().then(bans => {
   if(bans.size === 0) return message.reply("<:Converter:995595217782718475> There are no banned members.")

   let bUser = bans.find(b => b.user.id == userID)
   if(!bUser){
     const lol = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> ***The user is not banned.***")
      .setColor("#410255")
      return message.reply({embeds: [lol]})
   }
 
   message.guild.members.unban(userID)

   

   const embed = new Discord.MessageEmbed()


  .setDescription(`<:k_:995595248266915870> ***${member.tag} was unbanned***`)
  .setColor(color)
  

  message.reply({embeds: [embed]})

  return;

 })
 
 } catch (e) {
   message.reply("<:Converter:995595217782718475> Invalid ID")
 }

 }

}