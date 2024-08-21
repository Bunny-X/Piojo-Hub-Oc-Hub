const Discord = require('discord.js');
const Shitpost = require('discord-shitpost');
const color = '0x410255';

module.exports = {
  name: "meme",
  alias: [],

async execute (client, message, args){

  try {

  var botperms = message.guild.me.permissions.has("USE_EXTERNAL_EMOJIS")
  if(!botperms){
    const siu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> I don't have permissions. I need the `USE_EXTERNAL_EMOJIS`.")
    .setColor(color)
    return message.reply({embeds: [siu]})
  }

   let msg = await message.reply("Generating...")

  const meme = Shitpost.allShitpost()

  msg.edit("<a:custom_emoji:1225679453926064269>")
  msg.edit({ files: [{ attachment: `${meme}`}] })
 

} catch (error) {
  const lala = new Discord.MessageEmbed()
  .setDescription("An unexpected error has occurred.")
  .setColor(color)
  message.reply({embeds: [lala]})
}




 }

}