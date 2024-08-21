const Discord = require('discord.js');
const db = require('megadb');
const activate = new db.crearDB('activate');

const color = '0x410255';

module.exports = {
  name: "setanti-link",
  alias: [],

async execute (client, message, args){

  var botperms = message.guild.me.permissions.has("ADMINISTRATOR")
  if(!botperms){
    const siu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> I don't have permissions. I need the `ADMINISTRATOR`.")
    .setColor(color)
    return message.reply({embeds: [siu]})
  }

    var perms = message.member.permissions.has('ADMINISTRATOR')
    if(!perms){
      const owo = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
      .setColor(color)
      return message.reply({embeds: [owo]})
    }

  const status = args[0]
  if (!status || (status.toLowerCase() !== 'on' && status.toLowerCase() !== 'off')) {
    const sex = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Please specify `'on' or 'off'.`\nMode of Use: `.setanti-link [on/off]`")
    .setColor(color)
    return message.reply({embeds: [sex]})
  }

  const isActive = status.toLowerCase() === 'on';
  await activate.establecer(`${message.guild.id}.warnsActive`, isActive);


  const saall = new Discord.MessageEmbed()
  .setDescription(`<:k_:995595248266915870> Link warning event has been \`${isActive ? 'activated' : 'deactivated'}.\`\n*Additional features:*`)
  .addField("> *.addbanl*", "- You add a limit of warnings that the user can receive and if they exceed it they will receive a ban.")
  .addField("> *.rbl*", "- Remove `addbanl`")
  .addField("> *.srol*", "- The warning system will ignore the role you set.")
  .setColor(color)

  message.reply({embeds: [saall]});






 }

}