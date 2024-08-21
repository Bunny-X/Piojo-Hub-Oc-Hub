const Discord = require('discord.js');
let roblox = require('noblox.js')

const sexo = '0x410255'

module.exports = {
  name: "groups",
  alias: [],

async execute (client, message, args){

  try {

  const username = args.shift()
  if(!username){
    const lol = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Please specify a valid roblox user.\nMode of use: `.groups [username]`")
    .setColor(sexo)
    return message.reply({embeds: [lol]})
  }

    const userid = await roblox.getIdFromUsername(username)
    const groups = await roblox.getGroups(userid)

    const avatar = await roblox.getPlayerThumbnail(
      [userid],
      '720x720',
      'png',
      false,
      'Headshot'
    );

    let content = groups.map(x => x.Name).slice(0, 28)
      let content2 = groups.map(x => x.Id).slice(0, 28)
      let totalMessages = 1;

      let content3 = content.join("\n");
      let content4 = content2.join("\n");

    const embed2 = new Discord.MessageEmbed()
    .setColor(sexo)
      .setAuthor({name: `Groups of ${username}`, iconURL: avatar[0].imageUrl})
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
    .setFooter("Info with .groupinfo [groupid]")
    
    message.reply({embeds: [embed2]}).catch(err => {
      console.log(err)
    })

    } catch (error) {
      const sex = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> Invalid Username.")
      .setColor(sexo)
      message.reply({embeds: [sex]})
    }


 }

}