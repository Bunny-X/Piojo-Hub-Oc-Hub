const Discord = require('discord.js');
const db = require('megadb')
const serverlist = new db.crearDB("serverlist")
const blacklist = new db.crearDB('blacklist')
const sexo = '0x410255'

module.exports = {
  name: "slist",
  alias: [],
  owner: true,
 

async execute (client, message, args){

  try {

  const id = args[0]
  if(!id){
    const k = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Please specify a valid ID.\nMode of use: `.slist [Serverid]`")
    .setColor(sexo)
    return message.reply({embeds: [k]})
  }

  const guild = client.guilds.cache.get(id);
  if (!guild){
    const k = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Please specify a valid ID.")
    .setColor(sexo)
    return message.reply({embeds: [k]})
  }

  const server = await serverlist.obtener(`${id}.name`)

  if (serverlist.tiene(id)) {
    const lala = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> The server is already in the list.")
    .setColor(sexo)
    return message.reply({embeds: [lala]});
  } else {
 
    const serverID = id;

    const servera = client.guilds.cache.get(serverID);

     const inviteChannel = servera.channels.cache.find((channel) => channel.type === 'GUILD_TEXT' && channel.permissionsFor(client.user).has('CREATE_INSTANT_INVITE'))

     const invite = await inviteChannel.createInvite({ maxAge: 0, unique: true })

    serverlist.establecer(`${id}.name`, {
      name: guild.name,
      Mod: message.author.tag,
      link: invite.url,
      Date: Date.now()
    })

    const sex = new Discord.MessageEmbed()
    .setDescription("<:k_:995595248266915870> Server Logged.")
    .setColor(sexo)
    
    message.reply({embeds: [sex]})

  }

  const e = new Discord.MessageEmbed()

  .setTitle("<:custom_emoji:1215561290819575840> Server Logged")
  .addField("> Moderator", `\`${message.author.tag} | ${message.author.id}\``)
  .addField("> Server Name", `\`${guild.name} | ${guild.id}\``)
  .addField("> Owner", `<@${guild.ownerId}>`, true)
  .addField("> Members", `\`${guild.memberCount}\``, true)
  .setColor(sexo)
  .setThumbnail(guild.iconURL({format: "png", dynamic: true}))
  .setTimestamp()

  client.channels.cache.get("1200029936782688287").send({embeds: [e]})

  } catch (err) {
    const laoo = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Error found in serverList Command: " + err)
    .setColor(sexo);

    client.channels.cache.get('1210148130264322119').send({embeds: [laoo]})
  }


 }

}