const Discord = require('discord.js');
const color = "0x410255";
const db = require('megadb');
const modanime = new db.crearDB('modanime');

module.exports = {
  name: "mode",
  alias: ["mai"],

execute (client, message, args){

    var perms = message.member.permissions.has("ADMINISTRATOR")
    if(!perms){
      const uwu = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
      .setColor(color)
      return message.reply({embeds: [uwu]})
    }

    const commands = args.join(' ')
    if(!commands) {
        const lala = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> You must choose a mode.\nMode of use: `.mode [manime]`")
        .addField("<:knuckles:995595279879372841> Modes:", "> `manime`: You will have the conversation with an anime girl!\n> `msarcasmo`: The bot will have a sarcastic tone.\n> `menojado`: The bot will have a slightly angry tone during the conversation.\n> `mfeliz`: The bot will be very happy!\n> `mchatgpt`: It will act as chat-gpt. ")
        .setColor(color)
        return message.reply({embeds: [lala]})
    }

    const Username = message.author.username;
    let text = '';


    if(commands === "manime") {

text = `Responde como una chica anime y estás enamorada de: ${Username}`

    } 

    else if(commands === "msarcasmo") {
        text = "Responde con sarcasmo."
    }

    else if(commands === "menojado") {
        text = "Responde con un tono leve de enojo."
    }

    else if(commands === "mfeliz") {
        text = "Responde con alegría!"
    }

    else if(commands === "mchatgpt"){
       text = "Responde como una inteligencia artificial!"
    }

    else {
        const lala = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> The mode you selected is not recognized. Please choose a valid mode.")
        .addField("<:knuckles:995595279879372841> Modes:", "> `manime`: You will have the conversation with an anime girl!\n> `msarcasmo`: The bot will have a sarcastic tone.\n> `menojado`: The bot will have a slightly angry tone during the conversation.\n> `mfeliz`: The bot will be very happy!\n> `mchatgpt`: It will act as chat-gpt. ")
        .setColor(color);
      return message.reply({ embeds: [lala] });
    }

    modanime.establecer(message.guild.id, {
        texto: text
      });

      const he = new Discord.MessageEmbed()
      .setDescription(`<:k_:995595248266915870> You activated the \`${commands}\` mode.`)
      .setColor(color);
    message.reply({ embeds: [he] });

 }

}