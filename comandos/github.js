const Discord = require('discord.js');
const fetch = require('node-fetch');
const color = '0x410255';

module.exports = {
  name: "github",
  alias: [],

async execute (client, message, args){

   const username = args[0];
  if(!username) {
    const sexa = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You must put a username.\nMode of Use: `.github [User]`")
    .setColor(color)
    return message.reply({embeds: [sexa]})
  }

  try {
  const response = await fetch(`https://api.github.com/users/${username}`);
  const data = await response.json();

    if (data.message === 'Not Found'){
        const sexaa = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> The user does not exist.")
        .setColor(color)
        return message.reply({embeds: [sexaa]})
    }


    const embed = new Discord.MessageEmbed()
      .setAuthor({name: `${data.login}`, iconURL: "https://cdn.discordapp.com/attachments/945559913055256616/1212292991285465098/b51b78ecc9e5711274931774e433b5e6.png?ex=65f14ed4&is=65ded9d4&hm=d6319a906946dd672cf06db752f363712dbdce2ba08f62b90a9733c232d573b3&", url: `https://github.com/${username}`})
      .setDescription(data.bio || "No description available.")
      .setColor(color)
      .setThumbnail(data.avatar_url)
      .addField("> <:Converter:1015789224164864030> User", `[${data.name || "No name"}](https://github.com/${username})`, true)
      .addField("> <:wwd:1015790453444059287> ID", `*» \`${data.id}\`*`, true)
      .addField("> <:s_:1015790812853973134> Repos", `*» \`${data.public_repos}\`*`, true)
      .addField("> <:Converter:1015789224164864030> Followers", `*» \`${data.followers}\`*`, true)
      .addField("> <:Converter:1015789224164864030> Following", `*» \`${data.following}\`*`, true)
      .addField("> <:s_:1015790812853973134> Location", `*» \`${data.location || "N/A"}\`*`, true)
  
     


    message.reply({embeds: [embed]})

    
  } catch (err) {
    console.log(err)
  }



 }

}