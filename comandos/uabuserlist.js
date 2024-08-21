const Discord = require('discord.js');
const db = require('megadb')
const cabalabuserlogs = new db.crearDB('abuserlogs')
const abusers = new db.crearDB('abusers')
let roblox = require('noblox.js')

const sexo = '0x410255'

module.exports = {
  name: "uabuser",
  alias: [],

async execute (client, message, args){

  const guildId = message.guild.id;

  const canal = await cabalabuserlogs.obtener(`${message.guild.id}`, `${message.channel.id}`)
  const canallogs = client.channels.cache.get(canal)
  if(!canallogs){
    const lol = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> There is no established channel to log abusers.\nMode of use: `.setabusers [#channelname]`")
    .setColor(sexo)
    return message.reply({embeds: [lol]})
  }
 
    var perms = message.member.permissions.has("ADMINISTRATOR")
    if(!perms){
      const uwu = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
      .setColor(sexo)
      return message.reply({embeds: [uwu]})
    }
  

  try {

    const username = args.shift()
    if(!username){
      const lol = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> Please specify a valid roblox user.\nMode of use: `.uabuser [username] [reason]`")
      .setColor(sexo)
      return message.reply({embeds: [lol]})
    }

    const razon = args.join(" ")
    if(!razon){
      const lol = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You have to give a reason.\nMode of use: `.uabuser [username] [reason]`")
      .setColor(sexo)
      return message.reply({embeds: [lol]})
    }

    const userid = await roblox.getIdFromUsername(username)

    if (!abusers.tiene(`${guildId}.users.abuser_${userid}`)) {
      const noAbuserEmbed = new Discord.MessageEmbed()
        .setDescription(`<:Converter:995595217782718475> ${username} is not in the abuser database.`)
        .setColor(sexo)
      return message.reply({ embeds: [noAbuserEmbed] })
    }
    
    const user = await roblox.getPlayerInfo(userid)

    const avatar = await roblox.getPlayerThumbnail(
      [userid],
      '720x720',
      'png',
      false,
      'Headshot'
    );

    abusers.eliminar(`${guildId}.users.abuser_${userid}`)

    const embed = new Discord.MessageEmbed()
    .setColor(sexo)
    .setTitle(`Removed ${username} [${user.displayName}]`)
    .setDescription(`${user.blurb}` || "N/A")
    .addField("> Moderator", `» \`${message.author.tag}\``, true)
    .addField("> Reason", `» \`${razon}\``, true)
    .addField("> Profile", "[Click here](https://www.roblox.com/users/" + userid + "/profile)")
    .setThumbnail(avatar[0].imageUrl)

    const embedbueno = new Discord.MessageEmbed()

    .setDescription("<:k_:995595248266915870> User Delete!")
    .setColor(sexo)

    message.reply({embeds: [embedbueno]})


    canallogs.send({embeds: [embed]})
    

    } catch (error) {
      console.log(error)
      const sex = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> Invalid Username.")
      .setColor(sexo)
      message.reply({embeds: [sex]})
    }

    




 }

}