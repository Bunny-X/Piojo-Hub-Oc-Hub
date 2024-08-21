const Discord = require('discord.js');
const db = require('megadb');
const warns = new db.crearDB('warns');

const color = '0x410255';

module.exports = {
  name: "warns",
  alias: [],

  async execute(client, message, args) {

    var perms = message.member.permissions.has('ADMINISTRATOR')
    if(!perms){
      const owo = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
      .setColor(color)
      return message.reply({embeds: [owo]})
    }
    
    let target = message.mentions.members.first();
    if (!target){
        const awa = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> You must mention a user.\nMode of use: `.warns [User]`")
        .setColor(color)
        return message.reply({embeds: [awa]})
    }

    if (!await warns.tiene(`${message.guild.id}.${target.id}`)) {
        const aa = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> This user doesn't have any warnings.")
        .setColor(color)
        return message.reply({embeds: [aa]})
    }

    const userWarns = await warns.obtener(`${message.guild.id}.${target.id}`);

    const warnList = userWarns.map((warn, index) => {
      return `**Warn number: ${index + 1}**\n- Mod: \`${warn.mod}\`\n- Reason: \`${warn.reason}\`\n- Date: \`${new Date(warn.time).toDateString()}\``;
    });

    const embed = new Discord.MessageEmbed()
      .setTitle(`Warns of *\`${target.user.tag}\`*`)
      .setDescription(warnList.join('\n\n'))
      .setThumbnail("https://images-ext-1.discordapp.net/external/JMymjG8u-fAR8-RTsvrA7jHfsVCaigl7k4hlL6ofeHA/%3Fsize%3D96%26quality%3Dlossless/https/cdn.discordapp.com/emojis/1248090996730761247.gif?width=42&height=42")
      .setColor(color);

    message.reply({embeds: [embed]});
  }
};