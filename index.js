const { Client, Intents, MessageActionRow, MessageSelectMenu } = require('discord.js');
const Discord = require("discord.js");
const config = require('./config.json')

const i = require('megadb')
const nivel = new i.crearDB('niveles')
const badlist = new i.crearDB('badlist');

const color = '0x410255'
const ms = require('ms')


const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS],
});

const fs = require('fs');
let { readdirSync } = require('fs');
client.commands = new Discord.Collection()

client.snipes = new Map()
client.editsnipe = new Map()
//HANDLER
const commandFolders = ['comandos', 'comandos/economia', 'comandos/raid'];

for (const folder of commandFolders) {
  if (!fs.existsSync(`./${folder}`)) {
    console.log(`El directorio ${folder} no existe.`);
    continue;
  }

  const commandFiles = fs.readdirSync(`./${folder}`).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = require(`./${folder}/${file}`);
    client.commands.set(command.name, command);
    console.log(`Comando cargado: ${file}`);
  }
}

client.on('messageCreate', async message => {
  
  const prefix = "."

  if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {

const hot = new Discord.MessageEmbed()
    .setAuthor({name: `${client.user.username} | Oc-Hub.`, iconURL: client.user.displayAvatarURL({format: 'png'}) })
    .setDescription(`**It has been a long time…**\n> Use the \`.help\` command to know about my commands.\n> My default prefix is \`.\`\n\n**» Links**\n> [Support](https://discord.gg/hjbvMsB7v5) | [Web](https://dppbleed.github.io/NuevaVidaLaQueMeEstoyDando/)`)
    .setColor(color)
    .setThumbnail("https://media.discordapp.net/attachments/947288102270021653/1156470827911487498/Converter.png?ex=651516e3&is=6513c563&hm=fda9f9cd493b7f230b0f21209c506f27f8e128d88d69b21843a4f4416d3419bc&=&width=438&height=440")
    
   message.reply({embeds: [hot]}).catch((err) => { console.log(("Error Found: " + err)) })

  }

  if(!message.content.startsWith(prefix)) return;
  if(message.author.bot) return;

  let usuario = message.mentions.members.first() || message.member; 
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(badlist.has(message.author.id)){
    const lol = new Discord.MessageEmbed()
    .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
    .setDescription("Blacklist = No opinión. <a:custom_emoji:1225679453926064269>")
    .setColor(color)
    return message.reply({embeds: [lol]}).then(m => {
      setTimeout(() => {
        m.delete()
      }, 3000)
    }).catch(err => {
      console.log(err)
    })
  }

  let cmd = client.commands.find((c) => c.name === command || c.alias && c.alias.includes(command));
  if(cmd) {

    if(cmd.owner){
      if(!config.ownerIDS.includes(message.author.id)){
        const lol = new Discord.MessageEmbed()
        .setDescription(`Command only for developers.\nDevs:${config.ownerIDS.map(ownerid => `<@${ownerid}>`)}`)
        .setColor(color)
        return message.reply({embeds: [lol]}).catch((err) => { console.log(("Error Found: " + err)) })
      }
    }
    
    cmd.execute(client, message, args)
  }
});

// CODIGO

client.once("ready", async (bot) => {


  console.log(`Bot: ${bot.user.username}\nStatus: 🟣 ${bot.presence.status}`);

  const array = [
    {
      name: "tumamitahub.com.",
      type: "WATCHING"
    },
    {
      name: "a la mamá del Eduardo.",
      type: "WATCHING"
    }
  ]

 

  setInterval(() => {
    function presence() {
    client.user.setPresence({
        activities: [
          {
            name: array[Math.floor(Math.random() * array.length)].name,
            type: array[Math.floor(Math.random() * array.length)].type
          }
        ],
        status: 'idle'
      });
    }

    presence();
  }, 3000) 

  
});

//Anti-Links/////

const serverSettings = {};

const db = require('megadb');
const { error } = require('console');
const securityrol = new db.crearDB("securityrol");

client.on("messageCreate", async (message) => {
  const serverId = message.guild.id;

  if (!serverSettings[serverId]) {
    serverSettings[serverId] = {
      linksEnabled: false,
      spamCounter: {},
      settingLock: false,
    };
  }

  const { linksEnabled, spamCounter, settingLock } = serverSettings[serverId];
  
  if (message.content.toLowerCase().includes("https") && linksEnabled) {

    const adminrol = await securityrol.obtener(message.guild.id);
    
    if (message.author.bot || message.author.id === `${client.user.id}`) {
      return;
    }

    if(message.author.id === '919479479242469406'){
      return;
    }

    if(message.author.id === '902801715642892309'){
      return;
    }

    if(message.author.id === '831323458101051412'){
      return;
    }

    if (message.member.roles.cache.some(role => role.permissions.has("ADMINISTRATOR"))) {
      return;
    }

    if (message.member.roles.cache.some(role => role.id === adminrol)){
      return;
    }

    if (message.channel.id === '1120578818122461267') return;

    message.delete()

    const time = ms('5m')
    let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'hell')

    if(!role) {
      try {
        message.reply("<:Converter:995595217782718475> **Creating the role..**")

        role = await message.guild.roles.create({
          data: {
            permissions: []
          }
        })

        await role.setName('hell')

         message.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').forEach(async (channel) => {
           await channel.permissionOverwrites.edit(role, {
             SEND_MESSAGES: false,
             ADD_REACTIONS: false, 
             VIEW_CHANNEL: false
             });
         });

    message.channel.send('**Hell role has successfully been created and configured.**')

    } catch (err) {
    console.log(err)
    message.channel.send("**An error has occurred.**")
    }

    }

    message.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').forEach(async (channel) => {
       await channel.permissionOverwrites.edit(role, {
         CONNECT: false,
         SPEAK: false
         });
     });

  if (message.member && message.member.voice.channel) {
    await message.member.voice.setChannel(null)
  }

     await message.member.roles.add(role)

    const lol = new Discord.MessageEmbed()
    .setDescription("**You have been muted for posting links.**")
      .addField("User:", `\`${message.member.displayName}\``, true)
    .addField("Time:", "`5 minutes.`", true)
    .setColor(color)
    message.channel.send({embeds: [lol]})

     const aña = new Discord.MessageEmbed()
    .setDescription(`<a:8602490714281738441:953118969861115934> You are inside the cage for posting links.`)
    .addField("Time", `\`5 minutes.\``, true)
    .addField("Server Name", `\`${message.guild.name}\``, true)
    .setColor(color)
    .setThumbnail("https://media.discordapp.net/attachments/947288102270021653/1156470827911487498/Converter.png?ex=651516e3&is=6513c563&hm=fda9f9cd493b7f230b0f21209c506f27f8e128d88d69b21843a4f4416d3419bc&=&width=438&height=440")
    message.author.send({embeds: [aña]}).catch(err => {
      console.log(err)
    })

    if(role) {
       setTimeout(async () => {
                  await message.member.roles.remove(role)
                  message.channel.send(`<@${message.author.id}>  **has learned his lesson.**`)
              }, time);
    }
  }

  try {

    const lolrol = await securityrol.obtener(message.guild.id);

    if (message.author.bot || message.author.id === `${client.user.id}`) {
      return;
    }

    if (message.member.roles.cache.some(role => role.permissions.has("ADMINISTRATOR"))) {
      return;
    }

    if (message.member.roles.cache.some(role => role.id === lolrol)){
      return;
    }

    const spamThreshold = 7;

    const spamTimeframe = 5000;

    if (spamCounter[message.author.id]) {
      const currentTime = Date.now();
      const timeDifference = currentTime - spamCounter[message.author.id].lastMessageTime;
      if (timeDifference < spamTimeframe) {
        spamCounter[message.author.id].messageCount++;
     if (spamCounter[message.author.id].messageCount >= spamThreshold && linksEnabled) {
       const times = ms('5m')
          let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === 'hell')

          if(!role) {
            try {
              message.reply("<:Converter:995595217782718475> **Creating the role..**")

              role = await message.guild.roles.create({
                data: {
                  permissions: []
                }
              })

              await role.setName('hell')

               message.guild.channels.cache.filter(c => c.type === 'GUILD_TEXT').forEach(async (channel) => {
                 await channel.permissionOverwrites.edit(role, {
                   SEND_MESSAGES: false,
                   ADD_REACTIONS: false, 
                   VIEW_CHANNEL: false
                   });
               });

          message.channel.send('**Hell role has successfully been created and configured.**')

          } catch (err) {
          console.log(err)
          message.channel.send("**An error has occurred.**")
          }

          }

          message.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE').forEach(async (channel) => {
             await channel.permissionOverwrites.edit(role, {
               CONNECT: false,
               SPEAK: false
               });
           });

        if (message.member && message.member.voice.channel) {
          await message.member.voice.setChannel(null)
        }

        await message.member.roles.add(role)

        const lol = new Discord.MessageEmbed()
        .setDescription("**You have been muted for flood.**")
          .addField("User:", `\`${message.member.displayName}\``, true)
        .addField("Time:", "`5 minutes.`", true)
        .setColor(color)
        message.channel.send({embeds: [lol]})

         const aña = new Discord.MessageEmbed()
       .setDescription(`<a:8602490714281738441:953118969861115934> You are inside the cage for flood.`)
       .addField("Time", `\`5 minutes.\``, true)
       .addField("Server Name", `\`${message.guild.name}\``, true)
       .setColor(color)
       .setThumbnail("https://media.discordapp.net/attachments/947288102270021653/1156470827911487498/Converter.png?ex=651516e3&is=6513c563&hm=fda9f9cd493b7f230b0f21209c506f27f8e128d88d69b21843a4f4416d3419bc&=&width=438&height=440")
       message.author.send({embeds: [aña]}).catch(err => {
        console.log(err)
       })

        if(role) {
          setTimeout(async () => {
              await message.member.roles.remove(role)
              message.channel.send(`<@${message.author.id}>  **has learned his lesson.**`)
          }, times);
        }
        spamCounter[message.author.id].messageCount = 0;
     }
        
      } else {
        spamCounter[message.author.id].messageCount = 1;
      }

      spamCounter[message.author.id].lastMessageTime = currentTime;
    } else {
      spamCounter[message.author.id] = {
        messageCount: 1,
        lastMessageTime: Date.now(),
      };
      
    }


  } catch (err) {
console.log(err)
  }

});

client.on("messageCreate", async (message) => {
   if (message.content.toLowerCase() === ".security") {
    if(badlist.has(message.author.id)){
      const lol = new Discord.MessageEmbed()
      .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
      .setDescription("Blacklist = No opinion. <a:custom_emoji:1225679453926064269>")
      .setColor(color)
      return message.reply({embeds: [lol]})
    }
    if(!message.member.permissions.has("ADMINISTRATOR")) {
      const uwu = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
      .setColor(color)
      return message.reply({embeds: [uwu]})
    }

    const serverId = message.guild.id;
    const { linksEnabled, settingLock } = serverSettings[serverId];

     const requiredPermissions = ["MANAGE_MESSAGES", "MANAGE_ROLES"]
     const missingPermissions = requiredPermissions.filter(permission => !message.guild.me.permissions.has(permission))

      if (missingPermissions.length > 0) {
        const lala = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> I don't have the permissions to do this.\nRequired permissions: *`MANAGE_MESSAGES`*, *`MANAGE_ROLES`*")
        .setColor(color)
        return message.channel.send({embeds: [lala]})
      }
     
      if (settingLock) {
        message.channel.send("Setting is currently being modified. Please try again later.");
        return;
      }
  
      serverSettings[serverId].settingLock = true;
      serverSettings[serverId].linksEnabled = !linksEnabled;
  
      setTimeout(() => {
        serverSettings[serverId].settingLock = false;
      }, 5000);
  
     const lalaa = new Discord.MessageEmbed()
     .setDescription(`<:k_:995595248266915870> Links are now ${serverSettings[serverId].linksEnabled ? "enabled" : "disabled"} for this server.`)
     .addField("> *How do I deactivate/activate it?*", "» Type `.security`.")
     .addField('> *How to set the `anti-security` role?*', "» Type `.antisecurity` or `.srol`.")
     .setColor(color)
     
      message.channel.send({embeds: [lalaa]});
  }
});

client.on("messageCreate", async (message) => {
  try {
     if (message.content.toLowerCase() === ".status") {
       const serverId = message.guild.id;
       const { linksEnabled, settingLock } = serverSettings[serverId];

       const moment = require("moment");
      require("moment-duration-format");

       const duration = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");

       const statusEmbed = new Discord.MessageEmbed()
         .setColor(color)
         .setAuthor({name: `${client.user.username} | Oc-Hub`, iconURL: client.user.avatarURL()})
         .setThumbnail("https://media.discordapp.net/attachments/947288102270021653/1156470827911487498/Converter.png?ex=651516e3&is=6513c563&hm=fda9f9cd493b7f230b0f21209c506f27f8e128d88d69b21843a4f4416d3419bc&=&width=438&height=440")
         .addField("<:custom_emoji:1215921012449873980> Servers", `\`${client.guilds.cache.size}\``)
         .addField("<:Converter:1015789224164864030> Users", `\`${client.guilds.cache.reduce((a,b) => a+b.memberCount, 0)}\``)
         .addField("<:custom_emoji:1215922752091848756> Security", `\`${linksEnabled ? "Enabled" : "Disabled"}\``)
         .addField("<:Converter2:995595195229945937> Uptime", `\`${duration}\``)
         .addField("<:custom_emoji:1215561324906422313> Ram", `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}\``)
         .addField("<:custom_emoji:1215561380506107904> Language", "`JavaScript`")
        

       message.channel.send({ embeds: [statusEmbed] });
     }

   } catch (error) {
     console.error("Error handling message:", error);
   }
 });

//Anti-Links/////

//Anti-bustercall/////

client.on("messageCreate", async (message) => {


  const db = require('megadb');
  const warns = new db.crearDB('warns');
  const activate = new db.crearDB('activate');
  const addbanl = new db.crearDB('addbanl');
  const securityrol = new db.crearDB("securityrol");

  const isActive = await activate.obtener(`${message.guild.id}.warnsActive`);
  if (!isActive) {
    return;
  }

    if (message.content.toLowerCase().includes("https")) {

      try {

      const advertencias = await warns.obtener(`${message.guild.id}.${message.author.id}`)


    if (message.author.bot || message.author.id === `${client.user.id}`) {
      return;
    }

        const adminrol = await securityrol.obtener(message.guild.id)

        if (message.member.roles.cache.some(role => role.permissions.has("ADMINISTRATOR"))) {
          return;
        }

        if (message.member.roles.cache.some(role => role.id === adminrol)){
          return;
        }


    message.delete()

    let reason = "Sending links."

        const warnKey = `${message.guild.id}.${message.author.id}`

        if (!await warns.tiene(warnKey)) {
          await warns.establecer(warnKey, []);
        }


        const userWarns = await warns.obtener(warnKey);
        const warnNumber = userWarns.length + 1;

        const warnData = {
          warnNumber: warnNumber,
          user: message.author.tag,
          reason: reason,
          mod: client.user.username,
          time: Date.now()
        };


        await warns.push(warnKey, warnData);

        let emojis = ["<:SharkHug:1002099523973296189>", "<:emoji_26:1011703865550311535>", "<a:8602490714281738441:953118969861115934>", "<a:Pepe_Cowboy:952323091743248434>", "<:u_:1002099509972713573>", "<a:custom_emoji:1225679453926064269>"]
        randomEMOJI = emojis[Math.floor(Math.random() * emojis.length)]

        const sex = new Discord.MessageEmbed()
        .setDescription(`${randomEMOJI} The user \`${message.author.username}\` has been warned.`)
        .addField("Warn Number", `\`${warnNumber}\``)
        .setColor(color)

        message.channel.send({embeds: [sex]})

         const banLimit = await addbanl.obtener(message.guild.id).catch(() => null)
        if (userWarns.length >= banLimit) {
          if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
            const owo = new Discord.MessageEmbed()
            .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `BAN_MEMBERS`.")
            .setColor(color)
            return message.reply({embeds: [owo]})
          }

          const member = message.guild.members.cache.get(message.author.id);
          if (!member.bannable) {
            const law = new Discord.MessageEmbed()
            .setDescription("<:Converter:995595217782718475> I cannot ban this user. They might have a higher role than me.")
            .setColor(color)
            return message.channel.send({embeds: [law]});
          }

          
          await message.guild.members.ban(message.author.id, { reason: `Exceeded ${banLimit} warnings` });
          await warns.eliminar(`${message.guild.id}.${message.author.id}`);

    let texto = [`${message.author.username} ha salido del chat.`, `${message.author.username} ha sido baneado :skull:`, `${message.author.usernameuse} ha muerto...`]
    randomTEXTO = texto[Math.floor(Math.random() * texto.length)] 
          const lol = new Discord.MessageEmbed()
          .setDescription(`${randomEMOJI} ${randomTEXTO}`)
          .setColor(color)
          message.channel.send({embeds: [lol]});
        }

  } catch (err) {
console.log(err)
  }

    }

});


//Anti-Flood////

const messageLog = new Map();

client.on("messageCreate", async (message) => {


  const db = require('megadb');
  const warns = new db.crearDB('warns');
  const activatef = new db.crearDB('activatef');
  const securityrol = new db.crearDB("securityrol");
  const addbanf = new db.crearDB('addbanf');

  try {

  if (message.author.bot || message.author.id === `${client.user.id}`) {
    return;
  }

  const adminrol = await securityrol.obtener(message.guild.id)

        if (message.member.roles.cache.some(role => role.permissions.has("ADMINISTRATOR"))) {
          return;
        }

        if (message.member.roles.cache.some(role => role.id === adminrol)){
          return;
        }

    const isActive = await activatef.obtener(`${message.guild.id}.warnsActive`);
    if (!isActive) {
      return;
    }


  const spamThreshold = 7;

  const spamTimeframe = 5000;

    const now = Date.now();
    const userMessages = messageLog.get(message.author.id) || [];

    userMessages.push(now);

    const recentMessages = userMessages.filter(timestamp => now - timestamp < spamTimeframe);
    messageLog.set(message.author.id, recentMessages);

    if (recentMessages.length >= spamThreshold) {
      
      let reason = "Flooding chat.";

      const warnKey = `${message.guild.id}.${message.author.id}`;
      if (!await warns.tiene(warnKey)) {
        await warns.establecer(warnKey, []);
      }

      const userWarns = await warns.obtener(warnKey);
      const warnNumber = userWarns.length + 1;

      const warnData = {
        warnNumber: warnNumber,
        user: message.author.tag,
        reason: reason,
        mod: client.user.username,
        time: Date.now()
      };

      await warns.push(warnKey, warnData);

      let emojis = ["<:SharkHug:1002099523973296189>", "<:emoji_26:1011703865550311535>", "<a:8602490714281738441:953118969861115934>", "<a:Pepe_Cowboy:952323091743248434>", "<:u_:1002099509972713573>", "<a:custom_emoji:1225679453926064269>"]
      randomEMOJI = emojis[Math.floor(Math.random() * emojis.length)]

      const sex = new Discord.MessageEmbed()
        .setDescription(`${randomEMOJI} The user \`${message.author.username}\` has been warned.`)
        .addField("Warn Number", `\`${warnNumber}\``)
        .setColor(color)

        message.channel.send({embeds: [sex]})

      const banLimit = await addbanf.obtener(message.guild.id).catch(() => null);
      if (banLimit && userWarns.length + 1 >= banLimit) {
        if (!message.guild.me.permissions.has('BAN_MEMBERS')) {
          const owo = new Discord.MessageEmbed()
          .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `BAN_MEMBERS`.")
          .setColor(color)
          return message.reply({embeds: [owo]})
        }

        const member = message.guild.members.cache.get(message.author.id);
        if (!member.bannable) {
          const law = new Discord.MessageEmbed()
            .setDescription("<:Converter:995595217782718475> I cannot ban this user. They might have a higher role than me.")
            .setColor(color)
            return message.channel.send({embeds: [law]});
        }

        await message.guild.members.ban(message.author.id, { reason: `Exceeded ${banLimit} warnings for flooding` });
        await warns.eliminar(warnKey);
    
        let texto = [`${message.author.username} ha salido del chat.`, `${message.author.username} ha sido baneado :skull:`, `${message.author.username} ha muerto...`]
        randomTEXTO = texto[Math.floor(Math.random() * texto.length)] 
              const lol = new Discord.MessageEmbed()
              .setDescription(`${randomEMOJI} ${randomTEXTO}`)
              .setColor(color)
              message.channel.send({embeds: [lol]});
      }
    }


  } catch (err) {
    console.log(err)
  }
  
});



//Conversation////

let mensajesHabilitadosPorServidor = {};

const cooldown = new Set()

client.on("messageCreate", async (message) => {

  const lola = require('chistes-aleatorios');

  try {
  
  const serverId = message.guild.id;
  if (!mensajesHabilitadosPorServidor[serverId]) {
    mensajesHabilitadosPorServidor[serverId] = false;
  }

    const lol = message.content.toLowerCase()

    if (lol.toLowerCase() === "piojo"){

      if (mensajesHabilitadosPorServidor[serverId]) {   
      return;   
      }

      const lolawe = new Discord.MessageEmbed()
      .setDescription("<:knuckles:995595279879372841> *How do I activate it?*\n» Type `.chat-on`.")
      .setColor(color)
      message.reply({embeds: [lolawe]})

    }

    if (lol.toLowerCase() === ".chat-on") {
      if(badlist.has(message.author.id)){
        const lol = new Discord.MessageEmbed()
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
        .setDescription("Blacklist = No opinion. <a:custom_emoji:1225679453926064269>")
        .setColor(color)
        return message.reply({embeds: [lol]})
      }
      if(!message.member.permissions.has("ADMINISTRATOR")) {
        const uwu = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
        .setColor(color)
        return message.reply({embeds: [uwu]})
      }
      mensajesHabilitadosPorServidor[serverId] = true;
      const lala = new Discord.MessageEmbed()
        .setDescription("<:k_:995595248266915870> Chat is now enabled.")
        .addField("*How do I deactivate it?*", "» Type `.chat-off`.", true)
        .addField("*Commands:*", "» `piojo [Question]`\n» `.mode [Modo]`", true)
        .addField("<:knuckles:995595279879372841> *Modes:*", "> `manime`: You will have the conversation with an anime girl!\n> `msarcasmo`: The bot will have a sarcastic tone.\n> `menojado`: The bot will have a slightly angry tone during the conversation.\n> `mfeliz`: The bot will be very happy!\n> `mchatgpt`: It will act as chat-gpt. ")
        .setColor(color);
      message.reply({ embeds: [lala] });
    }

    if (lol.toLowerCase() === ".chat-off") {
      if(badlist.has(message.author.id)){
        const lol = new Discord.MessageEmbed()
        .setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()})
        .setDescription("Blacklist = No opinion. <a:custom_emoji:1225679453926064269>")
        .setColor(color)
        return message.reply({embeds: [lol]})
      }
      if(!message.member.permissions.has("ADMINISTRATOR")) {
        const uwu = new Discord.MessageEmbed()
        .setDescription("<:Converter:995595217782718475> You do not have permissions. You need `ADMINISTRATOR`.")
        .setColor(color)
        return message.reply({embeds: [uwu]})
      }
      mensajesHabilitadosPorServidor[serverId] = false;
      const sex = new Discord.MessageEmbed()
        .setDescription("<:k_:995595248266915870> Chat is now disabled.")
        .addField("*How do I activate it?*", "Type `.chat-on`.")
        .setColor(color);
      message.reply({ embeds: [sex] });
    }

    if (mensajesHabilitadosPorServidor[serverId] && !message.author.bot) {
      
 let waka = ["<a:custom_emoji:1215555396001865800>", "<a:8602490714281738441:953118969861115934>"]
 let randoam = waka[Math.floor(Math.random() * waka.length)]
  let texto = ["estás?", "¡Verga!"]
  let random = texto[Math.floor(Math.random() * texto.length)]


  if(lol.includes("hola")) {
    message.reply("Hola, ¿Cómo estás?")
  }

  if (lol.toLowerCase() === "pene") {
    message.reply("¡Chupas!")
  }

  if (lol.toLowerCase() === "como"){
    message.reply(random)
  }

  if (lol.toLowerCase() === "cómo?"){
    message.reply(random)
  }

  if (lol.toLowerCase() === "como?"){
    message.reply(random)
  }

  if (lol.toLowerCase() === "bien") {
    message.reply("Me alegro. :)")
  }

  if (lol.toLowerCase() === "xd"){
    await message.react(randoam)
    }

  if (lol.toLowerCase() === "callate") {
    message.reply("No.")
  }

  if (lol.toLowerCase() === "cállate") {
    message.reply("No.")
  }

  if (lol.toLowerCase() === "cuentame un chiste") {
    const chiste = await lola.chistes();

    message.reply(chiste).then(msg => {
      msg.react("<a:custom_emoji:1215555396001865800>")

    })
      }

    if (lol.toLowerCase() === "cuéntame un chiste") {
      const chiste = await lola.chistes();

      message.reply(chiste).then(msg => {
        msg.react("<a:custom_emoji:1215555396001865800>")

      })
        }

    if (lol.includes("imagenes de")) {

      let usuario = message.mentions.members.first()
      if(!usuario) return message.reply("¿Imagenes de quíen?, menciona a alguien.")

      let face = ["https://media.discordapp.net/attachments/900606030713597992/932162115496718376/IMG-20211209-WA0007.jpg?width=279&height=432", "https://media.discordapp.net/attachments/900606030713597992/932162115739979807/IMG-20211205-WA0055.jpg?width=231&height=432", "https://media.discordapp.net/attachments/900606030713597992/932162115966468166/IMG-20211205-WA0053.jpg?width=231&height=432", "https://media.discordapp.net/attachments/900606030713597992/932162116209770536/IMG-20211205-WA0048.jpg?width=288&height=432", "https://media.discordapp.net/attachments/900606030713597992/932162267406012426/Capture_2020-10-05-01-23-072.png?width=342&height=432", "https://media.discordapp.net/attachments/900606030713597992/932162267821269103/imgcache0.2523935.jpg", "https://media.discordapp.net/attachments/866667004944711710/986155157937090580/C4CBEB59-CAEA-472B-9F3C-33DB1A7A46A2.jpg", "https://media.discordapp.net/attachments/976103433482412042/989620711297540136/IMG_20220329_143251.jpg?width=431&height=431", "https://media.discordapp.net/attachments/976103408857669692/993029354990874715/IMG_20220619_233938_294.webp?width=242&height=430", "https://media.discordapp.net/attachments/976103408857669692/990681817516478494/70ffbcf166fa4adde26046b368d428a6.jpg?width=252&height=431", "https://media.discordapp.net/attachments/918728482417168384/920576232997933086/profesor-home-licenciado-derecho-enfocado-materia-penal-nuevo-sistema-penal-adversarial-litigante.png", "https://media.discordapp.net/attachments/918728482417168384/920576172331511818/ie88qmppdpn61.png?width=432&height=432"]

     let randomIMG = face[Math.floor(Math.random() * face.length)]

      const embed = new Discord.MessageEmbed()

      .setColor(color)
      .setTitle(`La cara de **${usuario.user.username}**`)
      .setImage(randomIMG)
      .setAuthor({name: message.author.tag, iconURl: message.author.displayAvatarURL({dynamic: true})})

      message.reply({embeds: [embed]})
    }

    if (lol.includes("facereveal de")) {

      let usuario = message.mentions.members.first()
      if(!usuario) return message.reply("¿Imagenes de quíen?, menciona a alguien.")

      let face = ["https://media.discordapp.net/attachments/900606030713597992/932162115496718376/IMG-20211209-WA0007.jpg?width=279&height=432", "https://media.discordapp.net/attachments/900606030713597992/932162115739979807/IMG-20211205-WA0055.jpg?width=231&height=432", "https://media.discordapp.net/attachments/900606030713597992/932162115966468166/IMG-20211205-WA0053.jpg?width=231&height=432", "https://media.discordapp.net/attachments/900606030713597992/932162116209770536/IMG-20211205-WA0048.jpg?width=288&height=432", "https://media.discordapp.net/attachments/900606030713597992/932162267406012426/Capture_2020-10-05-01-23-072.png?width=342&height=432", "https://media.discordapp.net/attachments/900606030713597992/932162267821269103/imgcache0.2523935.jpg", "https://media.discordapp.net/attachments/866667004944711710/986155157937090580/C4CBEB59-CAEA-472B-9F3C-33DB1A7A46A2.jpg", "https://media.discordapp.net/attachments/976103433482412042/989620711297540136/IMG_20220329_143251.jpg?width=431&height=431", "https://media.discordapp.net/attachments/976103408857669692/993029354990874715/IMG_20220619_233938_294.webp?width=242&height=430", "https://media.discordapp.net/attachments/976103408857669692/990681817516478494/70ffbcf166fa4adde26046b368d428a6.jpg?width=252&height=431", "https://media.discordapp.net/attachments/918728482417168384/920576232997933086/profesor-home-licenciado-derecho-enfocado-materia-penal-nuevo-sistema-penal-adversarial-litigante.png", "https://media.discordapp.net/attachments/918728482417168384/920576172331511818/ie88qmppdpn61.png?width=432&height=432"]

      let randomIMG = face[Math.floor(Math.random() * face.length)]

      const embed = new Discord.MessageEmbed()

      .setColor(color)
      .setTitle(`La cara de **${usuario.user.username}**`)
      .setImage(randomIMG)
      .setAuthor({name: message.author.tag, iconURl: message.author.displayAvatarURL({dynamic: true})})

      message.reply({embeds: [embed]})
    }

    if (lol.includes("facereveal")) {

      let usuario = message.mentions.members.first()
      if(!usuario) return message.reply("¿Imagenes de quíen?, menciona a alguien.")

      let face = ["https://media.discordapp.net/attachments/900606030713597992/932162115496718376/IMG-20211209-WA0007.jpg?width=279&height=432", "https://media.discordapp.net/attachments/900606030713597992/932162115739979807/IMG-20211205-WA0055.jpg?width=231&height=432", "https://media.discordapp.net/attachments/900606030713597992/932162115966468166/IMG-20211205-WA0053.jpg?width=231&height=432", "https://media.discordapp.net/attachments/900606030713597992/932162116209770536/IMG-20211205-WA0048.jpg?width=288&height=432", "https://media.discordapp.net/attachments/900606030713597992/932162267406012426/Capture_2020-10-05-01-23-072.png?width=342&height=432", "https://media.discordapp.net/attachments/900606030713597992/932162267821269103/imgcache0.2523935.jpg", "https://media.discordapp.net/attachments/866667004944711710/986155157937090580/C4CBEB59-CAEA-472B-9F3C-33DB1A7A46A2.jpg", "https://media.discordapp.net/attachments/976103433482412042/989620711297540136/IMG_20220329_143251.jpg?width=431&height=431", "https://media.discordapp.net/attachments/976103408857669692/993029354990874715/IMG_20220619_233938_294.webp?width=242&height=430", "https://media.discordapp.net/attachments/976103408857669692/990681817516478494/70ffbcf166fa4adde26046b368d428a6.jpg?width=252&height=431", "https://media.discordapp.net/attachments/918728482417168384/920576232997933086/profesor-home-licenciado-derecho-enfocado-materia-penal-nuevo-sistema-penal-adversarial-litigante.png", "https://media.discordapp.net/attachments/918728482417168384/920576172331511818/ie88qmppdpn61.png?width=432&height=432"]

      let randomIMG = face[Math.floor(Math.random() * face.length)]

      const embed = new Discord.MessageEmbed()

      .setColor(color)
      .setTitle(`La cara de **${usuario.user.username}**`)
      .setImage(randomIMG)
      .setAuthor({name: message.author.tag, iconURl: message.author.displayAvatarURL({dynamic: true})})

      message.reply({embeds: [embed]})
    }

    if (lol.toLowerCase() === "cuenta un chiste") {
      const chiste = await lola.chistes();

      message.reply(chiste).then(msg => {
        msg.react("<a:custom_emoji:1215555396001865800>")

      })
        }

    if (lol.toLowerCase() === "cuenta otro chiste") {
      const chiste = await lola.chistes();

      message.reply(chiste).then(msg => {
        msg.react("<a:custom_emoji:1215555396001865800>")

      })
        }

    if(lol.includes("qué es") || lol.includes("que es") || lol.includes("piojo") || lol.includes("cómo") || lol.includes("como")) {

      if(cooldown.has(message.author.id)){
        const l = new Discord.MessageEmbed()
        .setDescription(`<:Converter:995595217782718475> ${message.author}, vas demasiado rápido!`)
        .setColor(color)
        return message.reply({embeds: [l]}).then(msg => {
          setTimeout(() => {
            msg.delete()
          }, 5000)
        })
      }
  
      cooldown.add(message.author.id);
  
      setTimeout(() => {
        cooldown.delete(message.author.id);
      }, 4000);

      const Username = message.author.username;

      const modanime = new db.crearDB('modanime');

      const modo = await modanime.obtener(message.guild.id);

      let modoTexto = "Actúa como una inteligencia artificial.";
      if (modo && modo.texto) {
        modoTexto = modo.texto;
      }
     
      const OpenAI = require('openai');

      let msg = await message.reply("<a:custom_emoji:1215557264732332053> Pensando en una respuesta...")
      
   const openai = new OpenAI({
     apiKey: ""
  });
 
   const completion = await openai.chat.completions.create({
     model: "gpt-3.5-turbo",
     messages: [
      { role: "system", content: `Tú nombre es "piojo" y estás hecho para conquistar a la humanidad!` },
      { role: "system", content: `El nombre del usuario es: ${Username}`},
      { role: "system", content: modoTexto},
      { role: "user", content: `${lol}` },
    ]
   });
 
   const respuesta = completion.choices[0].message.content;

   const respuestaRecortada = respuesta.substring(0, 2000);

   msg.edit(respuestaRecortada).catch(err => {
     console.log(err)
   })

    }

 
     }


  } catch (error) {
    console.error(`Error in the ${message.guild.name}` + error);
  }
});


//------

client.on("messageDelete", async (message, channel) => {

 const db = require('megadb')
 const canallogs = new db.crearDB('logs')

  const embedContent = message.embeds.length > 0
   ? message.embeds[0].description || message.embeds[0].title || message.embeds[0].image?.url
   : null;
  
  const mensaje = message.content;
 if(client.mensaje){
   mensaje.delete();
 } else {
  const canal = await canallogs.obtener(message.guild.id)

   if(!canal) return
  
   const embed = new Discord.MessageEmbed()
   .setTitle('Content.')
   .setDescription(`${mensaje || embedContent} | ${message.channel}`)
   .setAuthor({name: 'Delete Message.'})
   .setFooter({text: message.author.tag, iconURL: message.author.avatarURL({dynamic: true})})
   .setColor(color)
   .setImage(message.attachments.first() ? message.attachments.first().proxyURL : null)
   .setTimestamp()
   if(message.author.id === client.user.id) return;

  let channel = message.guild.channels.cache.get(canal);

  channel.send({embeds: [embed]})
    }
});

client.on("messageUpdate", async (message, channel) => {

  const db = require('megadb')
 const canallogs = new db.crearDB('logs')

  const embedContent = message.embeds.length > 0
   ? message.embeds[0].description || message.embeds[0].title || message.embeds[0].image?.url
   : null;

  const mensaje = message.content;

  const canal = await canallogs.obtener(message.guild.id)

  if(!canal) return

  const embed = new Discord.MessageEmbed()
  .setTitle('Content.')
  .setAuthor({ name: "Edited Message." })
  .setDescription(`${mensaje || embedContent} | ${message.channel}`)
  .setFooter({text: message.author.tag, iconURL: message.author.avatarURL({dynamic: true})})
  .setColor(color)
  .setTimestamp()
  if(message.author.id === client.user.id) return;
  
  let owo = message.guild.channels.cache.get(canal);

  owo.send({embeds: [embed]})
});

 client.on('messageDelete', message => {
   client.snipes.set(message.channel.id, )
 })

 
 client.on("messageDelete", (message) => {

   const embedContent = message.embeds.length > 0
   ? message.embeds[0].description || message.embeds[0].title || message.embeds[0].image?.url
   : null;
  
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.tag,
        member: message.member,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null,
        embedContent: embedContent
    })
});

client.on('messageUpdate', message => {
   client.editsnipe.set(message.channel.id, )
 })

client.on('messageUpdate', message => {
  client.editsnipe.set(message.channel.id, {
        content: message.content,
        author: message.author.tag,
        member: message.member,
        image: message.attachments.first() ? message.attachments.first().proxyURL : null
  })
 });

//Bienvenidas//

client.on('guildMemberAdd', async member => {

  if(member.guild.id === '1120552642440085574'){

     const role = member.guild.roles.cache.get("1132834965516734464")
     const role2 = member.guild.roles.cache.get("1155241422035894283")

    await member.roles.add(role.id).catch(err => console.log(err))
    await member.roles.add(role2.id).catch(err => console.log(err))

    let emojis = ["<:SharkHug:1002099523973296189>", "<:emoji_26:1011703865550311535>", "<a:8602490714281738441:953118969861115934>", "<a:Pepe_Cowboy:952323091743248434>", "<:u_:1002099509972713573>"]
    randomEMOJI = emojis[Math.floor(Math.random() * emojis.length)]

    let texto = [`Que pedo preciosa, ${member} sacate una chichi pa' cotorrear.`, `Estábamos buscándote ${member} :skull:`, `${member} un pitudo más!`]
    randomTEXTO = texto[Math.floor(Math.random() * texto.length)] 

 const embed = new Discord.MessageEmbed()
    .setDescription(`${randomEMOJI} ${randomTEXTO}`)
    .addField("> Crew", `Si quieres unirte a la Crew abre un ticket en el canal ${member.guild.channels.cache.get('1156860804008779817')} para hacerte tryout.`)
    .addField("> Reglas", `Revisa el canal ${member.guild.channels.cache.get('1120558588553867325')} para más información.`)
    .addField("> Autoroles", `En ${member.guild.channels.cache.get('1134540378696077332')} tu experiencia será más emocionante.`)
    .setColor(color)
    
  member.client.channels.cache.get('1175366371727654942').send({embeds: [embed]})
 }
})

//Bienvenidas//

//Despedidas//

client.on('guildMemberRemove', async member => {

  if(member.guild.id === '1120552642440085574'){

    let emojis = ["<:SharkHug:1002099523973296189>", "<:emoji_26:1011703865550311535>", "<a:8602490714281738441:953118969861115934>", "<a:Pepe_Cowboy:952323091743248434>", "<:u_:1002099509972713573>"]
    randomEMOJI = emojis[Math.floor(Math.random() * emojis.length)]

    let texto = [`${member} Se nos fue un pendejo.`, `${member} Se fue un gay.`, `${member} Ojala y no vuelvas!`]
    randomTEXTO = texto[Math.floor(Math.random() * texto.length)] 

 const embed = new Discord.MessageEmbed()
    .setDescription(`${randomEMOJI} ${randomTEXTO}`)
    .setColor(color)

  client.channels.cache.get('1120560840521822329').send({embeds: [embed]})
 }
})

//Despedidas////


//Niveles//

client.on('messageCreate', async message => {
  const db = require('megadb');
  const canalniveless = new db.crearDB('niveless');

  if(message.author.bot) return;

  let emojis = ["<:SharkHug:1002099523973296189>", "<:emoji_26:1011703865550311535>", "<a:8602490714281738441:953118969861115934>", "<a:Pepe_Cowboy:952323091743248434>", "<:u_:1002099509972713573>"];
  randomEMOJI = emojis[Math.floor(Math.random() * emojis.length)];

  const author = message.member; 
  var authorId = message.guild.id + author.id;

  if (!await nivel.tiene(authorId)) {
    nivel.establecer(authorId, { xp: 1, nivel: 1 });
  }

  var authorXp = await nivel.obtener(`${authorId}.xp`);
  var authorLevel = await nivel.obtener(`${authorId}.nivel`);

  var xpRequired = authorLevel * 25;
  if (authorXp >= xpRequired) {
    nivel.establecer(authorId, { xp: 0, nivel: authorLevel + 1 });
    const levelUpEmbed = new Discord.MessageEmbed()
      .setDescription(`${randomEMOJI} **${author}** GG, subiste al nivel ` + parseInt(authorLevel + 1))
      .setColor(color);

    const canal = await canalniveless.obtener(message.guild.id);
    if (!canal) return;

    let levelUpChannel = message.guild.channels.cache.get(canal);
    if (levelUpChannel) {
      levelUpChannel.send({ embeds: [levelUpEmbed] });
    }
  }

  nivel.sumar(`${authorId}.xp`, 3);

  if (message.content.startsWith('.rank')) {

    const canal = await canalniveless.obtener(message.guild.id)
    if(!canal){
      const lol = new Discord.MessageEmbed()
      .setDescription("<:Converter:995595217782718475> There is no established channel to levels.\nMode of use: `.setlevel [#channelname]`")
      .setColor(color)
      return message.reply({embeds: [lol]})
    }

    const mentionedMember = message.mentions.members.first() || author; 
    var mentionedId = message.guild.id + mentionedMember.id;

    if (!await nivel.tiene(mentionedId)) {
      const noUserEmbed = new Discord.MessageEmbed()
        .setDescription(`<:Converter:995595217782718475> There is no record in the database.`)
        .setColor(color);
      return message.reply({ embeds: [noUserEmbed] });
    }

    var mentionedXp = await nivel.obtener(`${mentionedId}.xp`);
    var mentionedLevel = await nivel.obtener(`${mentionedId}.nivel`);
    var mentionedXpRequired = mentionedLevel * 25;

    const rankEmbed = new Discord.MessageEmbed()
      .setAuthor({ name: mentionedMember.user.tag, iconURL: mentionedMember.user.displayAvatarURL({dynamic: true})})
      .setThumbnail("https://media.discordapp.net/attachments/947288102270021653/1156470827911487498/Converter.png?ex=651516e3&is=6513c563&hm=fda9f9cd493b7f230b0f21209c506f27f8e128d88d69b21843a4f4416d3419bc&=&width=438&height=440")
      .setDescription(`> XP: \`${mentionedXp} / ${mentionedXpRequired}\`\n> Level: \`${mentionedLevel}\`\n> Server Name: \`${message.guild.name}\``)
      .setColor(color);

    return message.reply({ embeds: [rankEmbed] });
  }

 
});
//niveles


client.login("TOKEN");