const Discord = require('discord.js');
const db = require('megadb');
const addbanl = new db.crearDB('addbanl');
const activate = new db.crearDB('activate');

const color = '0x410255';

module.exports = {
  name: "addbanl",
  alias: [],

async execute (client, message, args){

  var botperms = message.guild.me.permissions.has("BAN_MEMBERS")
  if(!botperms){
    const siu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> I don't have permissions. I need the `BAN_MEMBERS`.")
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

    const isActive = await activate.obtener(`${message.guild.id}.warnsActive`);
    if (!isActive) {
      const la = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> Anti-Link warning event is not active.\n Mode of use: `.setanti-link on`")
      .setColor(color)
      return message.reply({embeds: [la]})
    }

const mount = args[0]
  if(!mount){
    const a = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You must specify a mount.")
    .setColor(color)
    return message.reply({embeds: [a]})
  }

  if(isNaN(mount)){
    const awwa = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You must specify a mount.")
    .setColor(color)
    return message.reply({embeds: [awwa]})
  }

  if(mount < 0){
    const l = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You can't put negative numbers.")
    .setColor(color)
    return message.reply({embeds: [l]})
  }

  if(mount > 10){
    const ma = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You can't put a mount higher than 10.")
    .setColor(color)
    return message.reply({embeds: [ma]})
  }

  addbanl.establecer(message.guild.id, mount)


  const aña = new Discord.MessageEmbed()
  .setDescription(`<:k_:995595248266915870> The mount has been set to \`${mount}\``)
  .addField("> *How to remove it?*", "» Type: `.rbl`")
  .setColor(color)
  message.reply({embeds: [aña]})



 }

}