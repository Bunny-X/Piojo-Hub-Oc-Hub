const Discord = require('discord.js');
const ytsr = require("ytsr");

const color = '0x410255'

module.exports = {
  name: "search",
  alias: [],

async execute (client, message, args){

 const query = args.join(" ")
 if(!query){
   const oi = new Discord.MessageEmbed()
   .setDescription("<:Converter:995595217782718475> What do you want to search on YouTube?\nMode of use: `.search [query]`")
   .setColor(color)
   return message.reply({embeds: [oi]})
 }

 const res = await ytsr(query).catch(e => {
   const embed = new Discord.MessageEmbed()
   .setDescription("<:Converter:995595217782718475> No results found.")
   .setColor(color)
   return message.reply({embeds: [embed]})
 })

const video = res.items.filter(i => i.type == "video")[0];
if(!video){
  const embed = new Discord.MessageEmbed()
   .setDescription("<:Converter:995595217782718475> No results found.")
   .setColor(color)
   return message.reply({embeds: [embed]})
}

const oi = new Discord.MessageEmbed()
.setDescription("> <:k_:995595248266915870> Video found.\nLoading..")
.setColor(color)

const owo = new Discord.MessageEmbed()

.setTitle(video.title)
.setImage(video.bestThumbnail.url)
.setColor(color)
.setFooter({ text: `By ${message.author.tag}`, iconURL: message.author.displayAvatarURL({ dynamic: true})})
.setTimestamp()
.setAuthor({ name: video.author.name, iconURL: video.author.bestAvatar.url})
.addField("Visits", video.views.toLocaleString(), true)
.addField("Duration", video.duration, true)
  .setURL(video.url)

message.reply({embeds: [oi]}).then(m => {
setTimeout(() =>{
m.edit({embeds: [owo]})
}, 1000)
})



 }

}