const Discord = require('discord.js');
const db = require('megadb')
const serversnipe = new db.crearDB("serversnipe")

module.exports = {
  name: "serverlistsnipe",
  alias: [],

async execute (client, message, args){

    try {

  const lol = serversnipe.map(false, (v, key) => {    
    return `**AntiSnipe_${key}**\n- ServerName: [${v.name.name}](${v.name.link})\n- ServerID: \`${key}\`\n- Mod: \`${v.name.Mod}\`\n- Date: \`${new Date(v.name.Date).toDateString()}\``;
  }).then(data => {
    const embed = new Discord.MessageEmbed()
      .setTitle("List of Servers Anti Snipe")
      .setColor("0x410255")
      .setDescription(data.join("\n"));
    message.reply({ embeds: [embed] });
  });

    } catch (err) {
        console.log(err)
    }





 }

}