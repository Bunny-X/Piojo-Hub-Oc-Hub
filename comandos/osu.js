const Discord = require('discord.js');
const osu = require('node-osu');

const api = new osu.Api("48771cc882d2f2083b11c2db94e474d4d3745040", {

   notFoundAsError: true,
    completeScores: false 
})

module.exports = {
  name: "osu!",
  alias: ["osu"],

execute (client, message, args){

 let username = args[0]
  
  
if (!args[0]){
  const oo = new Discord.MessageEmbed()
  .setDescription("<:Converter:995595217782718475> Please, provide a valid user\'s nickname! (osu!)")
  .setColor("#0f0f0f")
  return message.reply({embeds: [oo]})  
}

api.getUser({u: username}).then(user => {
const osu = new Discord.MessageEmbed()
.setTitle('User Osu Search System')
.setThumbnail(`http://s.ppy.sh/a/${user.id}}`)
.setColor("#0f0f0f")
.addField('> Nickname', `» \`${user.name}\` `)
.addField('> PP', `» \`${Math.round(user.pp.raw)}\` `)
.addField('> Rank', `» \`${user.pp.rank}\` `)
.addField('> Level', `» \`${Math.round(user.level)}\` `)
.addField('> Country', `» \`${user.country}\` `)
.addField('> Country Rank', `» \`${user.pp.countryRank}\` `)
.addField('> Playcount', `» \`${user.counts.plays}\` `)
.addField('> Accuracy', `» \`${user.accuracyFormatted}\` `)
.setURL(`https://osu.ppy.sh/u/${user.id}`)


message.reply({embeds: [osu]})
  
}).catch(error =>{
  const aña = new Discord.MessageEmbed()
  .setDescription("<:Converter:995595217782718475> Invalid Username.")
  .setColor("#0f0f0f")
        return message.reply({embeds: [aña]})
    })


 }

}