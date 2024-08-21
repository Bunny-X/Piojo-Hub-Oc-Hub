const Discord = require('discord.js');
const db = require('megadb')
const serverlist = new db.crearDB("serverlist")
const sexo = '0x410255'

module.exports = {
  name: "serverlist",
  alias: [],

execute (client, message, args){

  try {
  const lol = serverlist.map(false, (v, key) => {
    return `**WhiteList_${key}**\n- ServerName: [${v.name.name}](${v.name.link})\n- ServerID: \`${key}\`\n- Mod: \`${v.name.Mod}\`\n- Date: \`${new Date(v.name.Date).toDateString()}\``;
  }).then(data => {
    const embed = new Discord.MessageEmbed()
      .setTitle("List of Servers")
      .setColor(sexo)
      .setDescription(data.join("\n"));
    message.reply({ embeds: [embed] });
  });

} catch (err) {
  const embed = new Discord.MessageEmbed()
  .setDescription("<:Converter:995595217782718475> An error has happened!")
  .setColor(sexo)
  return message.reply({embeds: [embed]})

  const laoo = new Discord.MessageEmbed()
  .setDescription("<:Converter:995595217782718475> Error found in serverList Command: " + err)
  .setColor(sexo);

  client.channels.cache.get('1210148130264322119').send({embeds: [laoo]})

}

 


 }

}