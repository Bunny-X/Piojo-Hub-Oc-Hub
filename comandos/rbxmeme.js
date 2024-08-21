const Discord = require('discord.js');
let roblox = require('noblox.js')
const Canvas = require('canvas')
const color = '#410255'

module.exports = {
  name: "rbxmeme",
  alias: ["m"],

async execute (client, message, args){

  try {

    const username = args[0]
    if(!username){
      const lol = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> Please specify a valid roblox user.\nMode of use: `.rbxmeme [username] [text]`")
      .setColor(color)
      return message.reply({embeds: [lol]})
    }

  const userid = await roblox.getIdFromUsername(username)
  const user = await roblox.getPlayerInfo(userid)

    const avatar = await roblox.getPlayerThumbnail(
      [userid],
      '720x720',
      'png',
      false,
      'Body'
    );

  const text = args.slice(1).join(' ');
  if(!text){
    const w = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You must say something funny.\nMode of use: `.rbxmeme [username] [text]`")
    .setColor(color)
    return message.reply({embeds: [w]})
  }

    if(text.length > 20){
      const xd = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> The text must be less than 20 characters.")
      .setColor(color)
      return message.reply({embeds: [xd]})
    }

    const avatar2 = await Canvas.loadImage(avatar[0].imageUrl)

  
  const image = Canvas.createCanvas(800, 800);
  const ctx = image.getContext('2d');

   ctx.drawImage(avatar2, 0, 0, image.width, image.height);

  const textCanvas = Canvas.createCanvas(800, 200);
  const textCtx = textCanvas.getContext('2d');

  textCtx.font = '70px sans-serif';
  textCtx.fillStyle = "WHITE";
  textCtx.textAlign = 'center';

  const lineHeight = 50;
  const maxLineLength = 25;

  const lines = [];
  let currentLine = '';
  text.split(' ').forEach(word => {
    if (currentLine.length + word.length <= maxLineLength) {
      currentLine += word + ' ';
    } else {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    }
  });
  lines.push(currentLine.trim());

  lines.forEach((line, index) => {
    const y = textCanvas.height / 2 + (index - lines.length / 2) * lineHeight;
    textCtx.fillText(line, textCanvas.width / 2, y);
  });
  

  ctx.drawImage(textCanvas, 0, 0, image.width, 200);

  const attachment = new Discord.MessageAttachment(image.toBuffer(), 'memeuser.png')

  message.reply({files: [attachment]})


    } catch (error) {
      const sex = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> Invalid Username.")
      .setColor(color)
      message.reply({embeds: [sex]})
    }



 }

}