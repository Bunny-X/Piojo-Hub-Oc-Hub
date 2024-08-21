const Discord = require('discord.js');
const db = require('megadb')
const abusers = new db.crearDB('abusers')
const cabalabuserlogs = new db.crearDB('abuserlogs')
let roblox = require('noblox.js')

const sexo = '0x410255'

let cooldown = new Set()

module.exports = {
  name: "abuser",
  alias: [],

async execute (client, message, args){

  if(cooldown.has(message.author.id)){
    const l = new Discord.MessageEmbed()
    .setDescription(`<:Converter:995595217782718475> ${message.author}, you must wait 13 seconds to use the command.`)
    .setColor(sexo)
    return message.reply({embeds: [l]})
  }

  cooldown.add(message.author.id);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, 13000);

  const guildId = message.guild.id;

  const canal = await cabalabuserlogs.obtener(`${message.guild.id}`, `${message.channel.id}`)
  const canallogs = client.channels.cache.get(canal)
  if(!canallogs){
    const lol = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> There is no established channel to log abusers.\nMode of use: `.setabusers [#channelname]`")
    .setColor(sexo)
    return message.reply({embeds: [lol]})
  }
  
  try {

    const username = args.shift()
    if(!username){
      const lol = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> Please specify a valid roblox user.\nMode of use: `.abuser [username] [reason]`")
      .setColor(sexo)
      return message.reply({embeds: [lol]})
    }

    const razon = args.join(" ")
    if(!razon){
      const lol = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You have to give a reason.\nMode of use: `.abuser [username] [reason]`")
      .setColor(sexo)
      return message.reply({embeds: [lol]})
    }
  

  const userid = await roblox.getIdFromUsername(username)
  const user = await roblox.getPlayerInfo(userid)

  const existeUsuario = await abusers.obtener(`${guildId}.users.abuser_${userid}`);
    if (existeUsuario) {
      const mensajeExistente = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> This user is already in the database.")
        .setColor(sexo);
      return message.reply({embeds: [mensajeExistente]});
    }

    const groups = await roblox.getGroups(userid)

    abusers.establecer(`${guildId}.users.abuser_${userid}`, {
      username: user.username,
      userid: userid,
      reason: razon,
      moderator: message.author.tag,
      moderatorid: message.author.id,
      link: `https://www.roblox.com/users/${userid}/profile`,
      date: Date.now()
    });

    const avatar = await roblox.getPlayerThumbnail(
      [userid],
      '720x720',
      'png',
      false,
      'Headshot'
    );

    const embed = new Discord.MessageEmbed()
    .setColor(sexo)
      .setTitle(`${username} [${user.displayName}]`)
      .setDescription(`${user.blurb}` || "N/A")
      .addField("> Profile", "[Click here](https://www.roblox.com/users/" + userid + "/profile)", true)
      .addField("> Reason", `» \`${razon}\``, true)
      .addField("> Display Name", `» \`${user.displayName}\``)
      .addField("> User ID", `» \`${userid}\``)
      .addField("> Friends", `» \`${user.friendCount}\``)
      .addField("> Followers", `» \`${user.followerCount}\``)
      .addField("> Following", `» \`${user.followingCount}\``)
      .addField("> Banned", `» \`${user.isBanned}\``)
      .addField("> Created At", `» \`${user.joinDate ? user.joinDate.toDateString() : "N/A"}\``)
      .addField("> Last Online", `» \`${user.lastOnline ? user.lastOnline.toDateString() : "N/A"}\``)
    .setThumbnail(avatar[0].imageUrl)

    const embedbueno = new Discord.MessageEmbed()

    .setDescription("<:k_:995595248266915870> Abuser logged!")
    .setColor(sexo)

    message.reply({embeds: [embedbueno]})

    canallogs.send({embeds: [embed]})

    if(groups.length === 0) {
      const sex = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> This user is not in any group.")
      .setColor(sexo)
      canallogs.send({embeds: [sex]});
    } else {    

    let content = groups.map(x => x.Name).slice(0, 28)
    let content2 = groups.map(x => x.Id).slice(0, 28)
    let totalMessages = 1;

    let content3 = content.join("\n");
    let content4 = content2.join("\n");

   const embed2 = new Discord.MessageEmbed()
    .setColor(sexo)
     .addField(
       "Groups",
       content3,
       true
     )
    .addField(
      "Group ID",
      content4,
      true
    )

    canallogs.send({embeds: [embed2]}).then(msg => {
        msg.react('🐒')
        msg.react('<a:8602490714281738441:953118969861115934>')
    })
  }
    

  } catch (error) {
    const sex = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Invalid Username.")
    .setColor(sexo)
    message.reply({embeds: [sex]})
  }


}

}