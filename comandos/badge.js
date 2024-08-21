const Discord = require('discord.js');

module.exports = {
  name: "badge",
  alias: [],

execute (client, message, args){

 const user = message.mentions.users.first() || message.author;

        const flags = user.flags.toArray();
        
        message.channel.send(`**${user}'s badges: ${flags.join(', ')}**`)




 }

}