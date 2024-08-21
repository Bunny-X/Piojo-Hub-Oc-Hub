const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')

const sexo = '0x410255'

module.exports = {
  name: "ruleta",
  alias: [],

async execute (client, message, args){

  let user = message.author; 
  let mor = args[0]; 
  let gan = mor * 2; 

 const din = new Discord.MessageEmbed() 
  .setDescription("<:Converter:995595217782718475> You have to say an amount.\nMode of use: `.ruleta [amount]`\n\nNote: The minimum amount of money to bet is *$100*") 
  .setColor(sexo)

  if(!mor) return message.reply({embeds: [din]}) 

  const minimo = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> The minimum amount of money to bet is *$100*") 
    .setColor(sexo)

    if(mor <= 99) return message.reply({embeds: [minimo]}) 

   if(!dinero.tiene(`${user.id}`))
     dinero.establecer(`${user.id}`, 0) 

     let money = await dinero.obtener(`${user.id}`);  

    if(isNaN(mor)){ 
        const nonum = new Discord.MessageEmbed()
        .setDescription(`<:Converter:995595217782718475> You can only bet money.`) 
        .setColor(sexo)
        message.reply({embeds: [nonum]}) 

        return; 
    }

    if(mor > money){ 
      const si = new Discord.MessageEmbed()
       .setDescription("<:Converter:995595217782718475> You don't have that many coins!")
       .setColor(sexo)
       return message.reply({embeds: [si]})

        return; 
  } 

    let co = args[1]; 

  if(!co){ 
  const color = new Discord.MessageEmbed() 
  .setDescription("You must choose a color between `black` or `red`\nMode of use: `.ruleta 100 black`") 
  .setColor(sexo)

  message.reply({embeds: [color]}) 
  }
   else if(co === "red" || co === "black"){ 
   var cro = ["red","black"] 
   var cros = Math.floor(Math.random()*(cro.length)); 
   var crosi = cro[cros]
   if(crosi === "red"){ 
  if(co === "red"){ 

   if(dinero.tiene(`${user.id}`)) 
     dinero.sumar(`${user.id}`, mor) 

    const ganaste = new Discord.MessageEmbed() 
    .setAuthor({name: user.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setDescription(`The ball fell in the color RED\nMoney earned: \`$${gan}\``)
    .setColor("#37b910")

  return message.channel.send(`<@${message.author.id}>`), message.channel.send({embeds: [ganaste]})
  }



   if(dinero.tiene(`${user.id}`)) 
     dinero.restar(`${user.id}`, mor) 

  const perdiste = new Discord.MessageEmbed() 
  .setAuthor({name: user.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
  .setDescription(`The ball fell in the color RED\nLost Money: \`$${mor}\` <a:custom_emoji:1215555396001865800>`) 
  .setColor("RED")

  message.channel.send({embeds: [perdiste]}) 

  return; 
  }

  if(crosi === "black"){
  if(co === "black"){ 

   if(dinero.tiene(`${user.id}`)) 
     dinero.sumar(`${user.id}`, mor)

    const ganaste2 = new Discord.MessageEmbed()
    .setAuthor({name: user.tag, iconURL: message.author.displayAvatarURL({dynamic: true})})
    .setDescription(`The ball fell in the color BLACK.\n Money earned: \`$${gan}\``)
    .setColor("#37b910")

  return message.channel.send({embeds: [ganaste2]})  
  }


   if(dinero.tiene(`${user.id}`)) 
     dinero.restar(`${user.id}`, mor)


  const perdiste2 = new Discord.MessageEmbed()
  .setAuthor(user.tag, message.author.displayAvatarURL({dynamic: true}))
  .setDescription(`The ball fell in the color BLACK.\nLost Money: \`$${mor}\` <a:custom_emoji:1215555396001865800>`)
  .setColor("RED")

  message.channel.send({embeds: [perdiste2]})

  return; 
  }

  }
    else { //acá ponemos un else 
      const solop = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You can only put black or red.") 
      .setColor(sexo)

      message.reply({embeds: [solop]}) 


    }

   }

}
