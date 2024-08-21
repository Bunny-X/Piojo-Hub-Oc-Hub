const Discord = require('discord.js');
const color = '0x410255';
const { Hercai } = require('hercai');
  const axios = require('axios');

  let cooldown = new Set();

module.exports = {
  name: "image",
  alias: [],

async execute (client, message, args){

    const solicitud = args.join(" ")
if(!solicitud) {
    const la = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Please give more details.\nMode of use: `.image [text]`")
    .setColor(color)
    return message.reply({embeds: [la]})
}

    if(cooldown.has(message.author.id)){
        const l = new Discord.MessageEmbed()
        .setDescription(`<:Converter:995595217782718475> ${message.author}, you must wait 20 seconds to use the command.`)
        .setColor(color)
        return message.reply({embeds: [l]})
      }
    
      cooldown.add(message.author.id);
    
      setTimeout(() => {
        cooldown.delete(message.author.id);
      }, 20000);

try {

const herc = new Hercai();
const msg = await message.reply("<a:custom_emoji:1215557264732332053> Generating image...");

herc.drawImage({ model: "v3", prompt: solicitud }).then(async (response) => {
  try {
    const imageResponse = await axios.get(response.url, { responseType: 'arraybuffer' });
    const imageBuffer = Buffer.from(imageResponse.data, 'binary');
    const attachment = new Discord.MessageAttachment(imageBuffer, 'image.png');

    msg.edit({ content: "<a:custom_emoji:1225679453926064269> Image completed!", files: [attachment] }).catch(err => {
      msg.edit("<:Converter:995595217782718475> Invalid Image. " + err);
    });
  } catch (err) {
    msg.edit("<:Converter:995595217782718475> Error. " + err);
  }
}).catch(err => {
  msg.edit("<:Converter:995595217782718475> Invalid Image. " + err);
});




} catch (err) {
message.reply("Error." + err);
}

}


}