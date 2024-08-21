const Discord = require('discord.js');
const db = require('megadb')
const dinero = new db.crearDB('dinero')
const dinerobanco = new db.crearDB('dinerobanco')
const rana = new db.crearDB('rana')
const rata = new db.crearDB('rata')
const mono = new db.crearDB('mono')
const monogrande = new db.crearDB('monogrande')

const color = "0x410255"

let cooldown = new Set()

module.exports = {
  name: "pvp",
  alias: [],

async execute (client, message, args){

const user = message.author 
 const mencionado = message.mentions.users.first()


if(!mencionado){
  const oo = new Discord.MessageEmbed()
  .setDescription("<:Converter:995595217782718475> You have to mention user.\nMode of use: `.pvp [user]`")
  .setColor(color)
  return message.reply({embeds: [oo]})
}

  let dineropersona = await dinero.obtener(`${mencionado.id}`)
  if (isNaN(dineropersona) || dineropersona <= 0) {
    const errorEmbed = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> The user has no money to bet.")
      .setColor(color)
    return message.reply({ embeds: [errorEmbed] })
  }
 let dinerouser = await dinero.obtener(`${user.id}`)

  let dineroaleatorio = Math.floor(Math.random() * dineropersona) + 1

  let ratapersona = await rata.obtener(`${mencionado.id}`)
  if (isNaN(ratapersona) || ratapersona <= 0) {
    const errorEmbed = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> The user has no rat to bet.")
      .setColor(color)
    return message.reply({ embeds: [errorEmbed] })
  }
 let ratauser = await rata.obtener(`${user.id}`)

  let rataaleatorio = Math.floor(Math.random() * ratapersona) + 1

let ranapersona = await rana.obtener(`${mencionado.id}`)
  if (isNaN(ranapersona) || ranapersona <= 0) {
    const errorEmbed = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> The user has no Oc-Hub to bet.")
      .setColor(color)
    return message.reply({ embeds: [errorEmbed] })
  }
 let ranauser = await rana.obtener(`${user.id}`)

  let ranaaleatorio = Math.floor(Math.random() * ranapersona) + 1

  let monopersona = await mono.obtener(`${mencionado.id}`)
  if (isNaN(monopersona) || monopersona <= 0) {
    const errorEmbed = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> The user has no frog to bet.")
      .setColor(color)
    return message.reply({ embeds: [errorEmbed] })
  }
 let monouser = await mono.obtener(`${user.id}`)

  let monoaleatorio = Math.floor(Math.random() * monopersona) + 1

   let monograndepersona = await monogrande.obtener(`${mencionado.id}`)
    if (isNaN(monograndepersona) || monograndepersona <= 0) {
      const errorEmbed = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> The user has no Mono ratero to bet.")
        .setColor(color)
      return message.reply({ embeds: [errorEmbed] })
    }
   let monograndeuser = await monogrande.obtener(`${user.id}`)

    let monograndealeatorio = Math.floor(Math.random() * monograndepersona) + 1




if(mencionado.id === message.author.id){
  const o = new Discord.MessageEmbed()
 .setDescription("<:Converter:995595217782718475> You can't pick fights with yourself.")
  .setColor(color)
  return message.reply({embeds: [o]})
}

  if(mencionado.bot){
    const error = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> User invalid!")
    .setColor(color)
    return message.reply({embeds: [error]})
  }

  if(!dinero.tiene(`${mencionado.id}`)){
    const cody = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You have no money. <a:custom_emoji:1215555396001865800>")
    .setColor(color)
    return message.reply({embeds: [cody]}) 
 }

   if(dinerouser < 100){
     const lol = new Discord.MessageEmbed()
       .setDescription("<:Converter:995595217782718475> The minimum amount of money to bet is *$100*")
   .setColor(color)
     return message.reply({embeds: [lol]})
   }

  if(ranauser < 1){
    const lol = new Discord.MessageEmbed()
         .setDescription("<:Converter:995595217782718475> The minimum amount of Oc-Hub to bet is *1*")
     .setColor(color)
       return message.reply({embeds: [lol]})
   }

  if(ratauser < 1){
    const lol = new Discord.MessageEmbed()
         .setDescription("<:Converter:995595217782718475> The minimum amount of 🐀 to bet is *1*")
     .setColor(color)
       return message.reply({embeds: [lol]})
   }

  if(monouser < 1){
    const lol = new Discord.MessageEmbed()
         .setDescription("<:Converter:995595217782718475> The minimum amount of 🐒 to bet is *1*")
     .setColor(color)
       return message.reply({embeds: [lol]})
   }

  if(monograndeuser < 1) {
    const lol = new Discord.MessageEmbed()
         .setDescription("<:Converter:995595217782718475> The minimum amount of 🦧 to bet is *1*")
     .setColor(color)
       return message.reply({embeds: [lol]})
  }

  if(ranapersona < 1){
    const lol = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> That person needs at least one Oc-Hub to start pvp!")
     .setColor(color)
       return message.reply({embeds: [lol]})
   }

  if(ratapersona < 1){
    const lol = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> That person needs at least one 🐀 to start pvp!")
     .setColor(color)
       return message.reply({embeds: [lol]})
   }

  if(monopersona < 1){
    const lol = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> That person needs at least one 🐒 to start pvp!")
     .setColor(color)
       return message.reply({embeds: [lol]})
   }

  if(dineropersona < 100){
    const lol = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> That person needs at least $100 to start the pvp!")
     .setColor(color)
       return message.reply({embeds: [lol]})
 }

  if(cooldown.has(message.author.id)){
    const l = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> ${message.author}, you must wait 8 seconds to use the command.`)
    .setColor(color)
    return message.reply({embeds: [l]})
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, 8000);



  const embed = new Discord.MessageEmbed()

 .setTitle("PVP")
    .addField(`${message.author.username}`, `**Money:** \`$${dinerouser}\`\n**Oc-Hub:** \`${ranauser}\`\n**Rat:** \`${ratauser}\`\n**Monkey:** \`${monouser}\`\n**Pickpocket Monkey:** \`${monograndeuser}\``, true)
    .addField(`${mencionado.username}`, `**Money:** \`$${dineropersona}\`\n**Oc-Hub:** \`${ranapersona}\`\n**Rat:** \`${ratapersona}\`\n**Monkey:** \`${monopersona}\`\n**Pickpocket Monkey:** \`${monograndepersona}\``, true)

    .setThumbnail("https://media.discordapp.net/attachments/947288102270021653/1156470827911487498/Converter.png?ex=651516e3&is=6513c563&hm=fda9f9cd493b7f230b0f21209c506f27f8e128d88d69b21843a4f4416d3419bc&=&width=438&height=440")
  .setColor(color)

  let resultadomalo = ['mal']
 let resultadobueno = ['bien']
 let resultado = [resultadobueno, resultadomalo]
 let resultadofinal = resultado[Math.floor(Math.random() * resultado.length)]


  if(resultadofinal === resultadomalo){

   dinero.restar(mencionado.id, dineroaleatorio)

     rata.restar(mencionado.id, rataaleatorio)
    rana.restar(mencionado.id, ranaaleatorio)
   mono.restar(mencionado.id, monoaleatorio)
    monogrande.restar(mencionado.id, monograndealeatorio)

   dinero.sumar(user.id, dineroaleatorio)

    dinero.sumar(user.id, dineroaleatorio)
  rata.sumar(user.id, rataaleatorio)
    rana.sumar(user.id, ranaaleatorio)
   mono.sumar(user.id, monoaleatorio)
    monogrande.sumar(user.id, monograndealeatorio)

  const embedwe = new Discord.MessageEmbed()

    .setAuthor(mencionado.tag, mencionado.displayAvatarURL({dynamic: true, format: 'png'}))
.setDescription(`**You lost:**`)
  .setThumbnail(mencionado.displayAvatarURL({dynamic: true, format: 'png'}))
    .addField("Lost Money:", `\`$${dineroaleatorio}\``, true)
  .addField("Lost pets:", `🐀 \`${rataaleatorio}\`, 🐸 \`${ranaaleatorio}\`, 🐒 \`${monoaleatorio}\`, 🦧 \`${monograndealeatorio}\``, true)
.setColor(color)


message.channel.send({embeds: [embed]}).then(m => {
setTimeout(() =>{
return message.channel.send(`${mencionado} you lost :joy:`), m.edit({embeds: [embedwe]})
}, 10000)
})
 }

 if(resultadofinal === resultadobueno){

  dinero.restar(user.id, dineroaleatorio)

     rata.restar(user.id, rataaleatorio)
    rana.restar(user.id, ranaaleatorio)
   mono.restar(user.id, monoaleatorio)
    monogrande.restar(user.id, monograndealeatorio)


   dinero.sumar(mencionado.id, dineroaleatorio)
  rata.sumar(mencionado.id, rataaleatorio)
    rana.sumar(mencionado.id, ranaaleatorio)
   mono.sumar(mencionado.id, monoaleatorio)
   monogrande.sumar(mencionado.id, monograndealeatorio)

const embedpeleae = new Discord.MessageEmbed()

  .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true, format: 'png'}))
.setDescription(`**You lost:**`)
    .setThumbnail(message.author.displayAvatarURL({dynamic: true, format: 'png'})) 
  .addField("Lost Money:", `\`$${dineroaleatorio}\``, true)
  .addField("Lost pets:", `🐀 \`${rataaleatorio}\`, 🐸 \`${ranaaleatorio}\`, 🐒 \`${monoaleatorio}\`, 🦧 \`${monograndealeatorio}\``, true)
.setColor(color)


message.channel.send({embeds: [embed]}).then(m => {
setTimeout(() =>{
return message.channel.send(`<@${message.author.id}> you lost :joy:`), m.edit({embeds: [embedpeleae]})
}, 10000)
})
 }






 }

}