const Discord = require('discord.js');

const color = '0x410255'

module.exports = {
  name: "calculate",
  alias: [],

async execute (client, message, args){

let signos = ["*","/","+","-","x","~"]; 
  
      if(!args[0]){
        const uwu = new Discord.MessageEmbed()
        .setDescription("Please specify an amount with your sign which are these \`(+, *, -, /, x, ~)\`\nMode of use: `.calculate 1 x 8` ")
        .setColor(color)
        return message.reply({embeds: [uwu]})
      } 

  if(args[0] > 100000){
   const out = new Discord.MessageEmbed()
   .setDescription("You can't put a large amount")
   .setColor(color)
   return message.reply({embeds: [out]})
 }
  
      if(isNaN(args[0])){
        const ou = new Discord.MessageEmbed()
        .setDescription('Only numbers are put, except for the signs, which are these \`(+, *, -, /, x, ~)\`\nMode of use: `.calculate 1 + 2`')
        .setColor(color)
        return message.reply({embeds: [ou]})
      } 

      if(!signos.some(x => x.toLowerCase(message.content))){
        const ow = new Discord.MessageEmbed()
        .setDescription('You must place the signs! \`(+, *, -, /, x, ~)\`')
        .setColor(color)
        return message.reply({embeds: [ow]})
      } 

      if(!args[2]){
        const embeds = new Discord.MessageEmbed()
        .setDescription("You have to enter a second amount!")
        .setColor(color)
        return message.reply({embeds: [embeds]})
      }

  if(args[2] > 100000){
   const aña = new Discord.MessageEmbed()
   .setDescription("You can't put a large amount")
   .setColor(color)
   return message.reply({embeds: [aña]})
 }
  
       if(isNaN(args[2])){
        const ous = new Discord.MessageEmbed()
        .setDescription('Only numbers are put, except for the signs, which are these \`(+, *, -, /, x, ~)\`\nMode of use: `.calculate 1 + 2`')
        .setColor(color)
        return message.reply({embeds: [ous]})
      } 

      let signo = args[1];
      if(signo === 'x'){
        signo = '*'
      }

      if(signo === '~'){
        signo = '/'
      }

      try {
      const resultado = eval(args[0]+signo+args[2]); 

      const calcula = new Discord.MessageEmbed()
    .setAuthor({name: `${client.user.username} `, iconURL: client.user.displayAvatarURL({format: 'png'}) })
      .setColor(color)
      .addField("Quantity", '```js\n'+args[0]+' '+signo+' '+args[2]+'```')
      .addField('Exit', '```js\n'+await resultado+'```')
      

      return message.reply({embeds: [calcula]});

      } catch (e) { 
      const err = new Discord.MessageEmbed()
        .setTitle(":warning: Error")
      .setDescription('`'+e.message+'`') 
      .setColor(color)
     return message.reply({embeds: [err]}); 
    }
 



 }

}