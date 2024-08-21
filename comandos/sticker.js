const Discord = require('discord.js');

const color = '0x410255'

module.exports = {
  name: "emoji",
  alias: [],

async execute (client, message, args){

  var botperms = message.guild.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS")
  if(!botperms){
    const siu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> I don't have permissions. I need the `MANAGE_EMOJIS_AND_STICKERS`.")
    .setColor(color)
    return message.reply({embeds: [siu]})
  }

  var perms = message.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")
  if(!perms){
    const uwu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `MANAGE_EMOJIS_AND_STICKERS`.")
    .setColor(color)
    return message.reply({embeds: [uwu]})
  }

  if (!message.attachments.first() || !message.attachments.first().url) {
    const owo = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You must attach an image.\nMode of use: `.emoji [attach an image]`")
      .setImage("https://media.discordapp.net/attachments/947288102270021653/1186939200294092810/Converter.png?ex=65951245&is=65829d45&hm=081753e79d76fd19d3f48559f225a5901e089b73e6d9480fb2672922b80f989a&=&format=webp&quality=lossless&width=773&height=278")
      .setColor(color);
    return message.reply({ embeds: [owo] });
  }

  const imageUrl = message.attachments.first().url;

      try {
        const emoji = await message.guild.emojis.create(imageUrl, 'custom_emoji', { reason: `Emoji added by ${message.author.tag}` });

        const successEmbed = new Discord.MessageEmbed()
          .setDescription(`<:k_:995595248266915870> Emoji added successfully! ${emoji}`)
          .setColor(color);

        message.reply({ embeds: [successEmbed] });
      } catch (error) {
        const errorEmbed = new Discord.MessageEmbed()
          .setDescription("<:Converter:995595217782718475> Error adding emoji. Make sure the emoji is valid.")
          .setColor(color);

        message.reply({ embeds: [errorEmbed] });
      }


 }

}