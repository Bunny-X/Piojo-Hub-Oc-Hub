const Discord = require('discord.js');
const malScraper = require('mal-scraper');

const color = '0x410255'

module.exports = {
  name: "anime",
  alias: ["animesearch"],

async execute (client, message, args){

const search = `${args}`;
if(!search){
  const uwu = new Discord.MessageEmbed()
  .setDescription("<:SharkHug:1002099523973296189> Enter the name of an anime.\nMode of use: `.anime [name]`")
  .setColor(color)
  return message.reply({embeds: [uwu]})
}

  function formatDate (template, date){
  var tiempo = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(tiempo[i]).join(item)

  }, template)
  }

malScraper.getInfoFromName(search)
  .then((data) => {
  const malEmbed = new Discord.MessageEmbed()
    .setAuthor(`My Anime List search result for ${args}`.split(',').join(' '))
    .setThumbnail(data.picture)
    .setColor(color) 
    .addField('> Title', `» ${data.englishTitle}`, true)
    .addField('> Title in Japanese', `» ${data.japaneseTitle}`, true)
    .addField('> Type', `» \`${data.type}\``)
    .addField('> Episodes', `» \`${data.episodes}\``)
    .addField('> Classification', `» \`${data.rating}\``)
    .addField('> Broadcast', `» \`${data.aired}\``)
    .addField('> Score', `» \`${data.score}\``)
    .addField('> Score statistics', `» \`${data.scoreStats}\``)
    .addField('> Link', `${data.url}`)

    message.reply({embeds: [malEmbed]});

  }).catch(error =>{
        const yami = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Invalid anime!")
    .setColor(color)
    return message.reply({embeds: [yami]})
    })

 }

}