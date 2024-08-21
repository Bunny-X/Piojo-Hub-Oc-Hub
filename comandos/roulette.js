const Discord = require('discord.js');
const color = '0x410255';

module.exports = {
  name: "roulette",
  alias: [],

async execute (client, message, args){

  var botperms = message.guild.me.permissions.has("KICK_MEMBERS")
  if(!botperms){
    const siu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> I don't have permissions. I need the `KICK_MEMBERS`.")
    .setColor(color)
    return message.reply({embeds: [siu]})
  }

  var botperms = message.guild.me.permissions.has("CREATE_INSTANT_INVITE")
  if(!botperms){
    const siu = new Discord.MessageEmbed()
    .setDescription("<:Converter:995595217782718475> I don't have permissions. I need the `CREATE_INSTANT_INVITE`.")
    .setColor(color)
    return message.reply({embeds: [siu]})
  }

  try {

     const user = message.author;

    const lala = new Discord.MessageEmbed()
    .setDescription("<a:Pepe_Cowboy:952323091743248434> Wait for your result...")
    .setImage("https://media1.tenor.com/m/_o7dY73f5PkAAAAC/ruleta-rusa-ruleta-rusa-brba.gif")
    .setColor(color)

      let resultadomalo = ['mal'];
      let resultadobueno = ['bien'];
      let resultado = [resultadobueno, resultadomalo, resultadobueno, resultadobueno, resultadobueno, resultadobueno, resultadobueno, resultadobueno, resultadobueno, resultadobueno];
      let resultadofinal = resultado[Math.floor(Math.random() * resultado.length)];


      if (resultadofinal === resultadomalo) {
        const expulsado = new Discord.MessageEmbed()
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({format: 'png'})})
        .setDescription(`\`${message.author.tag}\` was kicked. <a:custom_emoji:1215555396001865800>`)
        .setColor(color);
        message.channel.send({embeds: [lala]}).then(m => {
          setTimeout(() => {
            m.edit({embeds: [expulsado]})
          }, 5000)
      })

      await message.member.kick().catch(err => {
        const ojo = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> I couldn't kick the user. Please check my permissions.")
        .setColor(color)
        return message.reply({embeds: [ojo]})
      })

        const serverID = message.guild.id;
        const server = client.guilds.cache.get(serverID);

         const inviteChannel = server.channels.cache.find((channel) => channel.type === 'GUILD_TEXT' && channel.permissionsFor(client.user).has('CREATE_INSTANT_INVITE'))

         const invite = await inviteChannel.createInvite({ maxAge: 0, unique: true })
        
        message.author.send(invite.url).catch(err => {
          console.log(err)
        })
      }

      if (resultadofinal === resultadobueno) {
        const lol = new Discord.MessageEmbed()
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({format: 'png'})})
        .setDescription(`\`${message.author.tag}\` good luck.`)
        .setColor(color)
        message.channel.send({embeds: [lala]}).then(m => {
          setTimeout(() => {
            m.edit({embeds: [lol]})
          }, 5000)
        })
      }
    
    
  } catch (err) {
    console.log(err)
  }


 }

}