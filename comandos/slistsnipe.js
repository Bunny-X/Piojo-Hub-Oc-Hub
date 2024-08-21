const Discord = require('discord.js');
const db = require('megadb');
const serversnipe = new db.crearDB("serversnipe")
const sexo = '0x410255';

module.exports = {
  name: "snipe-on",
  alias: [],

async execute (client, message, args){

    try {

  var perms = message.member.permissions.has("ADMINISTRATOR")
  if(!perms){
    const uwu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
    .setColor(sexo)
    return message.reply({embeds: [uwu]})
  }

  const id = message.guild.id;

    const guild = client.guilds.cache.get(id);

    const server = await serversnipe.obtener(`${id}.name`)

    if (serversnipe.tiene(id)) {
        const lala = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> The server is already in the list.")
        .setColor(sexo)
        return message.reply({embeds: [lala]});
    } else {


      const serverID = id;

      const server = client.guilds.cache.get(serverID);

       const inviteChannel = server.channels.cache.find((channel) => channel.type === 'GUILD_TEXT' && channel.permissionsFor(client.user).has('CREATE_INSTANT_INVITE'))

       const invite = await inviteChannel.createInvite({ maxAge: 0, unique: true })


      serversnipe.establecer(`${id}.name`, {
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

} catch (err) {
    const laoo = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> Error found in serverListSnipe Command: " + err)
    .setColor(sexo);

    client.channels.cache.get('1210148130264322119').send({embeds: [laoo]})
  }



   }

  }