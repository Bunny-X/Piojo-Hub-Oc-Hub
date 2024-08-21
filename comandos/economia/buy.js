const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const masdinero = new db.crearDB('masdinero')
const rana = new db.crearDB('rana')
const rata = new db.crearDB('rata')
const mono = new db.crearDB('mono')
const monogrande = new db.crearDB('monogrande')

const color = '0x410255'

let cooldown = new Set()

module.exports = {
  name: "buy",
  alias: [],

async execute (client, message, args){

  if(cooldown.has(message.author.id)){
    const l = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> ${message.author}, you must wait 3 seconds to use the command.`)
    .setColor(color)
    return message.reply({embeds: [l]})
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, 3000);

  try {

  const user = message.author;

  const objeto = args.join(' ')
  if(!objeto){
    const owo = new Discord.MessageEmbed()
    .setDescription("You have to mention an object.\nMode of use: `.buy x2`")
    .setColor(color)
    return message.reply({embeds: [owo]})
  } 


  if(!masdinero.tiene(`${user.id}`)){
    masdinero.establecer(`${user.id}`, 0)
  }

  if(!rana.tiene(`${user.id}`)){
    rana.establecer(`${user.id}`, 0)
  }

  if(!rata.tiene(`${user.id}`)){
    rata.establecer(`${user.id}`, 0)
  }

  if(!mono.tiene(`${user.id}`)){
    mono.establecer(`${user.id}`, 0)
  }

  if(!monogrande.tiene(`${user.id}`)){
    monogrande.establecer(`${user.id}`, 0)
    }

  const dinerouser = await dinero.obtener(`${user.id}`)

  if(objeto === 'x2'){

    if(dinerouser < 5000){
      const si = new Discord.MessageEmbed()
       .setDescription("<:Converter:995595217782718475> You don't have enough money.")
       .setColor(color)
       return message.reply({embeds: [si]})
    }

    dinero.restar(user.id, 5000)

  masdinero.sumar(`${user.id}`, 3)

  const embed12 = new Discord.MessageEmbed()

  .setDescription("<:k_:995595248266915870> You have adquired the **Double xp** item, now you earn double.")
  .setColor(color)

  message.reply({embeds: [embed12]})


  }

  if(objeto === 'x3'){

    if(dinerouser < 15000){
      const si = new Discord.MessageEmbed()
       .setDescription("<:Converter:995595217782718475> You don't have enough money.")
       .setColor(color)
       return message.reply({embeds: [si]})
    }

    dinero.restar(user.id, 15000)

  masdinero.sumar(`${user.id}`, 5)

  const embedi = new Discord.MessageEmbed()

  .setDescription("<:k_:995595248266915870> You have adquired the **Triple xp**, now you earn triple.")
  .setColor(color)


  message.reply({embeds: [embedi]})

  } 

  if(objeto === '🦎'){

    if(dinerouser < 5000){
      const si = new Discord.MessageEmbed()
       .setDescription("<:Converter:995595217782718475> You don't have enough money.")
       .setColor(color)
       return message.reply({embeds: [si]})
    }

    dinero.restar(user.id, 5000)

  rana.sumar(`${user.id}`, 1)

  const embedsiu = new Discord.MessageEmbed()

  .setDescription("<:k_:995595248266915870> You have acquired **Oc-Hub**, now it will always accompany you.")
  .setColor(color)

  message.reply({embeds: [embedsiu]})


  }

  if(objeto === '🐀'){

    if(dinerouser < 5000){
      const si = new Discord.MessageEmbed()
       .setDescription("<:Converter:995595217782718475> You don't have enough money.")
       .setColor(color)
       return message.reply({embeds: [si]})
    }

    dinero.restar(user.id, 5000)

  rata.sumar(`${user.id}`, 1)

    const embedsiu = new Discord.MessageEmbed()

    .setDescription("<:k_:995595248266915870> You have acquired 🐀, now it will always accompany you.")
    .setColor(color)

    message.reply({embeds: [embedsiu]})


  }

  if(objeto === '🐒'){

    if(dinerouser < 5000){
      const si = new Discord.MessageEmbed()
       .setDescription("<:Converter:995595217782718475> You don't have enough money.")
       .setColor(color)
       return message.reply({embeds: [si]})
    }

    dinero.restar(user.id, 5000)

  mono.sumar(`${user.id}`, 1)

    const embedsiu = new Discord.MessageEmbed()

    .setDescription("<:k_:995595248266915870> You have acquired 🐒, now it will always accompany you.")
    .setColor(color)

    message.reply({embeds: [embedsiu]})

  }

    if(objeto === '🦧'){

      if(dinerouser < 6500){
        const si = new Discord.MessageEmbed()
         .setDescription("<:Converter:995595217782718475> You don't have enough money.")
         .setColor(color)
         return message.reply({embeds: [si]})
      }

      dinero.restar(user.id, 6500)

    monogrande.sumar(`${user.id}`, 1)

      const embedsiu = new Discord.MessageEmbed()

      .setDescription("<:k_:995595248266915870> You have acquired 🦧, now it will always accompany you.")
      .setColor(color)

      message.reply({embeds: [embedsiu]})

    }

    if(objeto === 'pssvip') {

      if (message.guild.id !== '1120552642440085574') {
        const embed = new Discord.MessageEmbed()
          .setDescription("<:Converter:995595217782718475> This item can only be purchased at *`Passione`*.")
          .setColor(color)
        return message.reply({ embeds: [embed] })
      }

      const pssvipRoleID = '1139430521466789919'
      if (message.member.roles.cache.has(pssvipRoleID)) {
        const embed = new Discord.MessageEmbed()
          .setDescription("<:Converter:995595217782718475> You already have that role")
          .setColor(color)
        return message.reply({ embeds: [embed] })
      }

      
      if(dinerouser < 50000){
        const si = new Discord.MessageEmbed()
         .setDescription("<:Converter:995595217782718475> You don't have enough money.")
         .setColor(color)
         return message.reply({embeds: [si]})
      }

      dinero.restar(user.id, 50000)

      const pssvipRole = message.guild.roles.cache.get(pssvipRoleID)
      message.member.roles.add(pssvipRole)

      const embed = new Discord.MessageEmbed()
        .setDescription("<:k_:995595248266915870> Congratulations, you now have access to the *`Passione`* VIP server")
        .setColor(color)
      return message.reply({ embeds: [embed] })

      
    }


  

    } catch (e) {
      const embed = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> This item does not exist in the store." + e)
      .setColor(color)
      return message.reply({embeds: [embed]})
  }

 }

}