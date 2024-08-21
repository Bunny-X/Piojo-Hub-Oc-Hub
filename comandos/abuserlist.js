const Discord = require('discord.js');
const db = require('megadb')
const abusers = new db.crearDB('abusers')

const sexo = '0x410255'

module.exports = {
  name: "abuserlist",
  alias: [],

execute (client, message, args){

  const guildId = message.guild.id;

    try {

    const lol = abusers.has(guildId)
    if(!lol){
      const lola = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> There is not a single user on the abuse list.")
      .setColor(sexo)
      return message.reply({embeds: [lola]})
    }


      const abuserslist = abusers.map(`${guildId}.users`, (v, key) => {
      return `**${key}**\n- Username: [${v.username}](${v.link})\n- Moderator: \`${v.moderator}\`\n- Reason: \`${v.reason}\`\n- Date: \`${new Date(v.date).toDateString()}\``;
      }).then(data => {
          const embed = new Discord.MessageEmbed()
              .setTitle("List of Abusers")
              .setColor(sexo)
              .setDescription(data.join("\n"));
          message.reply({ embeds: [embed] });
      });
  
    } catch (error) {
      console.log(error);
      const errorEmbed = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> Error fetching abuser list.")
        .setColor(sexo);

      message.reply({ embeds: [errorEmbed] });
    }


 }

}