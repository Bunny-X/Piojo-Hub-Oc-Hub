const Discord = require('discord.js');
const db = require('megadb')
const blacklist = new db.crearDB("blacklist")
const color = '0x410255'

module.exports = {
  name: "servers",
  alias: [],

execute (client, message, args){

  let servers = client.guilds.cache.map(r => `**${r.name}**\n \`(${r.id})\``);
  let chunks = [];
  let chunkSize = 1000;

  
  while (servers.length) {
    let chunk = [];
    let length = 0;

    while (servers.length && length + servers[0].length < chunkSize) {
      let server = servers.shift();
      chunk.push(server);
      length += server.length;
    }

    chunks.push(chunk.join('\n'));
  }

  let embed = new Discord.MessageEmbed()
    .setAuthor({name: `Targets: ${client.guilds.cache.size} servers!,  ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} monkeys 🐒`, iconURL: client.user.displayAvatarURL()})
    .setColor(color);

  
  chunks.forEach((chunk, index) => {
    embed.addField(`Servers ${index + 1}`, chunk);
  });

  message.reply({embeds: [embed]}).catch(err => {
    console.log(err);
  });
}
};
