const Discord = require('discord.js');
const sexo = '0x410255';

module.exports = {
  name: "unsafe",
  alias: [],

  execute(client, message, args) {

    var perms = message.member.permissions.has("ADMINISTRATOR");
    if (!perms) {
      const uwu = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
        .setColor(sexo);
      return message.reply({ embeds: [uwu] });
    }

    message.guild.channels.cache.forEach(async (ch) => {
      const botPermissions = ch.permissionsFor(message.guild.me);
      if (botPermissions && botPermissions.has("MANAGE_CHANNELS")) {
        try {
          await ch.permissionOverwrites.edit(message.guild.roles.everyone, {
            SEND_MESSAGES: true,
            SPEAK: true
          });
        } catch (err) {
          message.author.send(`Error updating permissions for channel ${ch.name}: ${err}`).catch(err => {
            return;
          })
        }
      }
    });

    const done = new Discord.MessageEmbed()
      .setDescription("<:k_:995595248266915870> Permissions have been reverted for all channels.")
      .setColor(sexo);
    message.reply({ embeds: [done] });

  }
};