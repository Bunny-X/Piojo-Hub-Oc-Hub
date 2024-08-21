const Discord = require('discord.js');
const db = require('megadb')
const masdinero = new db.crearDB('masdinero')
const rana = new db.crearDB('rana')
const rata = new db.crearDB('rata')
const mono = new db.crearDB('mono')
const monogrande = new db.crearDB('monogrande')
const description = new db.crearDB('description')

const Color = '0x410255'


module.exports = {
  name: "profile",
  alias: [],

async execute (client, message, args){


  const mencionado = message.mentions.members.first() || message.member;

  if(!masdinero.tiene(`${mencionado.id}`)){
    masdinero.establecer(`${mencionado.id}`, 0)
  }

  if(!rana.tiene(`${mencionado.id}`)){
    rana.establecer(`${mencionado.id}`, 0)
  }

  if(!rata.tiene(`${mencionado.id}`)){
    rata.establecer(`${mencionado.id}`, 0)
  }

  if(!mono.tiene(`${mencionado.id}`)){
    mono.establecer(`${mencionado.id}`, 0)
  }

  if(!monogrande.tiene(`${mencionado.id}`)){
    monogrande.establecer(`${mencionado.id}`, 0)
  }


  let cantidad = await masdinero.obtener(`${mencionado.id}`)

  let cantidaditem = await rana.obtener(`${mencionado.id}`)

  let cantidadrata = await rata.obtener(`${mencionado.id}`)

  let cantidadmono = await mono.obtener(`${mencionado.id}`)

  let cantidadmono2 = await monogrande.obtener(`${mencionado.id}`)


  const apodo = message.guild.members.cache.get(mencionado.id).nickname || "None."

  const text = await description.obtener(`${mencionado.id}`) || "No description."

  const embedinfo = new Discord.MessageEmbed()
 
  .setColor(Color)
    .setTitle(text)
  .setDescription(`**General Information:**\n<:Converter:1015789224164864030> User: \`${mencionado.user.tag}\`. \n<:wwd:1015790453444059287> Profile ID: \`${mencionado.id}\`. \n<:s_:1015790812853973134> NickName: \`${apodo}\`\n\n**Items**`)
    .addField("> **Packages**", `»  \`${cantidad}\` `)
    .addField("> **Pets**", `»  \`${cantidaditem}\` 🦎\n\n» \`${cantidadrata}\` 🐀\n\n» \`${cantidadmono}\` 🐒\n\n» \`${cantidadmono2}\` 🦧`)
    .setTimestamp()
  .setThumbnail(mencionado.user.displayAvatarURL( {format: 'png', dynamic: 'true'} ))


    message.reply({embeds: [embedinfo]})

  
  

  
 }

}