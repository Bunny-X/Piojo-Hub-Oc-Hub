const Discord = require('discord.js');
let roblox = require('noblox.js')

const sexo = '0x410255'

module.exports = {
  name: "groupinfo",
  alias: ["group"],

async execute (client, message, args){

try {
  
const groupId = args[0]
if(!groupId){
  const ko = new Discord.MessageEmbed()
  .setDescription("<:Converter:995595217782718475> Please specify a valid ID.\nMode of use: `.groupinfo [ID]`")
  .setColor(sexo)
  return message.reply({embeds: [ko]})
}

  let group = await roblox.getGroup(groupId).catch(err => {
    const k = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Please specify a valid ID.")
    .setColor(sexo)
    return message.reply({embeds: [k]})
  })

  let ownerr = await roblox.getGroup(groupId)

  let foto = await roblox.getLogo(groupId)

  const embed = new Discord.MessageEmbed()
  .setTitle(`${group.name}[${groupId}]`)
  .addField("> Group Description", `» ${group.description}`)
  .addField("> Group Owner", `» \`${ownerr.owner.username}\``, true)
  .addField("> Group Owner ID", `» \`${ownerr.owner.userId}\``, true)
  .addField("> Group Members", `» \`${group.memberCount}\``)
  .addField("> Group Shout", `» \`${group.shout.body}\``)
  .addField("> Group Shout Date", `» \`${group.shout.updated.toDateString()}\``)
  .setColor(sexo)
  .setThumbnail(foto)
  .setURL("https://www.roblox.com/groups/" + groupId)
  message.reply({embeds: [embed]})

} catch (err) {
  return message.reply("An error has occurred, please try again.")
  console.log(err)
}


 }

}