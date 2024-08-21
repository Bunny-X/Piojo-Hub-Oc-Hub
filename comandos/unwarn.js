const Discord = require('discord.js');
const db = require('megadb');
const warns = new db.crearDB('warns');

const color = '0x410255';

module.exports = {
  name: "unwarn",
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
        .setDescription("<:Converter:995595217782718475> You must mention a user.\nMode of use: `.unwarn [Specific Warning Number || all] [User]`\n\nNote: Para borrar una advertencia, debes escribir el `numero especifico de la advertencia` o escribir `all` para borrar todas las advertencias del usuario.")
        .setColor(color)
        return message.reply({embeds: [awa]})
    }

    if (!await warns.tiene(`${message.guild.id}.${target.id}`)) {
      const aa = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> This user doesn't have any warnings.")
      .setColor(color)
      return message.reply({embeds: [aa]})
    }

    if (target.id === message.author.id){
        const awawaa = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> You can't unwarn yourself.")
        .setColor(color)
        return message.reply({embeds: [awawaa]})
    }

    if (message.member.roles.highest.comparePositionTo(target.roles.highest) <= 0){
        const lala = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> You can't unwarn someone with a higher or equal role.")
        .setColor(color)
        return message.reply({embeds: [lala]})
    }

    const warnKey = `${message.guild.id}.${target.id}`;
    let userWarns = await warns.obtener(warnKey);

    if (args[0] && args[0].toLowerCase() === 'all') {
      await warns.eliminar(warnKey);
      const aña = new Discord.MessageEmbed()
      .setDescription(`<:k_:995595248266915870> All warnings for ${target.user.tag} have been removed.`)
      .setColor(color)
      return message.reply({embeds: [aña]});
    }

    const warnNumber = parseInt(args[0]);
    if (isNaN(warnNumber) || warnNumber < 1 || warnNumber > userWarns.length) {
        const laaw = new Discord.MessageEmbed()
        .setDescription(`<:Converter:995595217782718475> Invalid warning number. Please provide a number between \`1 and ${userWarns.length}.\``)
        .setColor(color)
      return message.reply({embeds: [laaw]});
    }

    userWarns.splice(warnNumber - 1, 1);

    userWarns.forEach((warn, index) => {
      warn.warnNumber = index + 1;
    });

    if (userWarns.length > 0) {
      await warns.establecer(warnKey, userWarns);
    } else {
      await warns.eliminar(warnKey); 
    }

    const embed = new Discord.MessageEmbed()
    .setDescription(`<:k_:995595248266915870> Warning number ${warnNumber} for ${target.user.tag} has been removed.`)
    .setColor(color)

    message.reply({embeds: [embed]});
  }
};