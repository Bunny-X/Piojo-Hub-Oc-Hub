const Discord = require('discord.js');
const moment = require("moment");
require("moment-duration-format");

let color = '#410255'

module.exports = {
  name: "ping",
  alias: [],

async execute (client, message, args){

 let embed1 = new Discord.MessageEmbed()
    .setDescription("🏓 | Ping ...")
    .setColor('#410255')

   let msg = await message.reply({embeds: [embed1]})

let ping = msg.createdTimestamp - message.createdTimestamp

const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

let zap = "⚡" 
      
let green = "🟢"

let red = "🔴"

let yellow = "🟡"

var color = zap;
var color2 = zap;

let cPing = Math.round(client.ws.ping)

if( cPing >= 40) {
 color2 = green;
}
      
if( cPing >= 200) {
 color2 = yellow;
}

if(cPing >= 400) {
 color2 = red;
}

if( ping >= 40) {
 color = green;
}
  
if(ping >= 200) {
 color = yellow;
}

if(ping >= 400) {
 color = red;
}

        let info = new Discord.MessageEmbed()
          .setThumbnail(client.user.displayAvatarURL({format: 'png'}))
          .setTitle("🏓 | Pong!")
          .addField("API latency", `${color2} | ${cPing}ms`, true)
          .addField("Message latency", `${color} | ${ping}ms`, true)
          .addField("Uptime", `⏲️ | ${duration}`, true)
          .setColor('#410255')
          .setTimestamp()
          .setFooter({text: `Requested by ${message.author.username}`, iconURL:  message.author.displayAvatarURL()})
    msg.edit({ embeds: [info] })
 



 }

}