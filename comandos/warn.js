const Discord = require('discord.js');
const db = require('megadb');
const warns = new db.crearDB('warns');

const color = '0x410255';

module.exports = {
  name: "warn",
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
        .setDescription("<:Converter:995595217782718475> You must mention a user.\nMode of use: `.warn [User] [Reason]`")
        .setColor(color)
        return message.reply({embeds: [awa]})
    }

    let reason = args.slice(1).join(" ") || "No reason";

    if (target.user.bot){
     const waaw = new Discord.MessageEmbed()
     .setDescription("<:Converter:995595217782718475> You can't warn bots.")
     .setColor(color)
     return message.reply({embeds: [waaw]})
    }

    if (target.id === message.author.id){
        const awawaa = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> You can't warn yourself.")
        .setColor(color)
        return message.reply({embeds: [awawaa]})
    }

    if (message.member.roles.highest.comparePositionTo(target.roles.highest) <= 0){
        const lala = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> You can't warn someone with a higher or equal role.")
        .setColor(color)
        return message.reply({embeds: [lala]})
    }

    const warnKey = `${message.guild.id}.${target.id}`;

    
    if (!await warns.tiene(warnKey)) {
      await warns.establecer(warnKey, []);
    }

    
    const userWarns = await warns.obtener(warnKey);
    const warnNumber = userWarns.length + 1;

    const warnData = {
      warnNumber: warnNumber,
      user: target.user.tag,
      reason: reason,
      mod: message.author.tag,
      time: Date.now()
    };

    
    await warns.push(warnKey, warnData);

    const em = new Discord.MessageEmbed()
    .setDescription(`<:k_:995595248266915870> \`${target.user.tag}\` has been successfully warned.`)
    .addField("*Warn Number*", `- \`${warnNumber}\``, true)
    .addField("*Reason*", `- \`${reason}\``, true)
    .setColor(color)

    message.reply({embeds: [em]});
  }
};