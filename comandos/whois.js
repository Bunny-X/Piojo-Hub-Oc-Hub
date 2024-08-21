const Discord = require('discord.js');
let roblox = require('noblox.js')

const sexo = '0x410255'

let cooldown = new Set()

module.exports = {
  name: "whois",
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

    
  try {

    const username = args[0]
    if(!username){
      const lol = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> Please specify a valid roblox user.\nMode of use: `.whois [username]`")
      .setColor(sexo)
      return message.reply({embeds: [lol]})
    }

  
   const userid = await roblox.getIdFromUsername(username)
  
  const user = await roblox.getPlayerInfo(userid)

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
      .addField("> Display Name", `» \`${user.displayName}\``)
      .addField("> User ID", `» \`${userid}\``)
      .addField("> Description", `» ${user.blurb}` || "N/A")
      .addField("> Friends", `» \`${user.friendCount}\``)
      .addField("> Followers", `» \`${user.followerCount}\``)
      .addField("> Following", `» \`${user.followingCount}\``)
      .addField("> Banned", `» \`${user.isBanned}\``)
      .addField("> Created At", `» \`${user.joinDate ? user.joinDate.toDateString() : "N/A"}\``)
      .addField("> Status",`» \`N/A\``)
     .addField("> Last Online", `» \`N/A\``)
    .setThumbnail(avatar[0].imageUrl)
    .setURL("https://www.roblox.com/users/" + userid + "/profile")


   message.reply({embeds: [embed]}).catch(err => console.log("Error al enviar el mensaje:", err));

    
  } catch (error) {
    const sex = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Invalid Username.")
    .setColor(sexo)
    message.reply({embeds: [sex]})
  }

   
 
}

}