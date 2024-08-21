const Discord = require('discord.js');
const sexo = '0x410255'

module.exports = {
  name: "help",
  alias: [],

async execute (client, message, args){

   const waitingembed = new Discord.MessageEmbed()
        
        .setDescription('Please wait while the commands load <a:custom_emoji:1215557264732332053>')
        .setColor(sexo)

  let msg = await message.reply({embeds: [waitingembed]})

  const embed = new Discord.MessageEmbed()

  .setAuthor({name: `${client.user.username} | Oc-Hub.`, iconURL: client.user.displayAvatarURL({format: 'png'}) })
  .setDescription("**Commands (13)**\n> `avatar`: Show Member Avatar!\n> `status`: Status bot.\n> `badge`: Show Member HypeSquad Badge.\n> `coinflip`: Flip A Coin!\n> `hack`: Hack command bitch!\n> `emojify`: Emojify command.\n> `howgay`: Show How Gay Member Is!\n> `meme`: meme random! *`(Maintenance)`*\n> `converter`: Format to convert and attach a valid file.\n> `emoji`: Convert an image to emoji.\n> `image`: Image generator.\n> `calculate`: Calculate an operation.\n> `github`: Github user information. \n\n**Commands to set on the server (5)**\n> `setlogs`: Set logs for your server.\n> `setlevel`: Set levels for your server.\n> `security`: Security for your server.\n> `chat-on`: Start a conversation with Piojo-Hub.\n> `chat-off`: Deactivate the conversation with Piojo-Hub.\n\n**Roblox Commands (5)**\n> `whois`: Roblox User Finder.\n> `rbxav`: Roblox Avatar User Finder.\n> `rbxmeme`: Make a meme for the Roblox avatar.\n> `groupinfo`: Roblox group information.\n> `groups`: Roblox user groups.\n\n**Commands to manipulate images (5)**\n> `tadd`: Create ticket.\n> `timage`: Search ticket.\n> `trandom`: Random ticket.\n> `tdelete`: Delete ticket.\n> `tlist`: List ticket.\n\n**List Of Servers (4)**\n> `serverlist`: List of servers that are whitelisted.\n> `serverlistsnipe`: Serverlisted Anti-Snipe\n> `snipe-on`: Activate anti-snipe.\n> `snipe-off`: Disable anti-snipe.\n\n**Abuser System (4)**\n> `setabusers`: Abusers logs.\n> `abuser`: Add Roblox users to the abuse list.\n> `uabuser`: Delete Roblox users to the abuse list.\n> `abuserlist`: List of abusers.\n\n**Advanced Warning System (9)**\n> `warn`: Give a warning to a user.\n> `unwarn`: Remove a warning from a user.\n> `warns`: View user warnings.\n> `setanti-link`: Anti-Link warning system.\n> `addbanl`: Adds a limit of warns in the anti-link system.\n> `rbl`: Removes the limit of warns in the anti-link system.\n> `setanti-flood`: Anti-Flood warning system.\n> `addbanf`: Adds a limit of warns in the anti-flood system.\n> `rbf`: Removes the limit of warns in the anti-flood system.\n\n**Games Commands (12)**\n> `osu`: !Osu User Finder.\n> `roulette`: Try your luck with Russian roulette.\n> `eroulette`: Extrem russian roulette!! *`(WhiteList)`*\n> `ping`: Bot ping information.\n> `weather`: Information about a country or region.\n> `serverinfo`: Show Server Information!\n> `ship`: Ship command u.u.\n> `search`: YouTube video Finder.\n> `rank`: User level.\n> `anime`: Anime Finder.\n> `snipe`: See the last deleted message.\n> `editsnipe`: See the last edited message.\n\n**Administration Commands (11)**\n> `ban`: Ban Members.\n> `mute`: Mute Members.\n> `unmute`: Unmute Members.\n> `safe`: Makes your server a safe.\n> `unsafe`: Revert the safe command.\n> `clear`: Delete a specific amount of messages.\n> `unban`: Unmute members.\n> `md`: Message Anonymous.\n> `addrole`: Add a specific role to all members of the server. *`(WhiteList)`*\n> `hell`: User will not be able to see any channel.\n> `uhell`: Remove the curse from the user.\n\n**Economy Commands (13)**\n> `work`: Work to get coins.\n> `rob`: Steal coins from a user.\n> `crime`: Crime to get coins.\n> `bal`: Check how many coins you have.\n> `profile`: Profile command.\n> `dep`: Save money to your bank.\n> `with`: Retire money to your bank.\n> `ruleta`: Make use of your luck. <a:custom_emoji:1215555396001865800>\n> `shop`: Check the store for unique items.\n> `buy`: Buy items from the store.\n> `sell`: Sell items.\n> `pvp`: Pvp with a user.\n> `addmoney`: Add Money. *`(WhiteList)`*\n\n**Commands (2):**\n> `profile`: Profile command.\n> `profile-description`: To be able to add a description to your profile.\n\n**» Others...**\nTo access the White List commands, type `.command`\n [© Oc-Hub](https://dppbleed.github.io/NuevaVidaLaQueMeEstoyDando/)")
.setColor(sexo)
  .setThumbnail(`https://media.discordapp.net/attachments/947288102270021653/1156470827911487498/Converter.png?ex=651516e3&is=6513c563&hm=fda9f9cd493b7f230b0f21209c506f27f8e128d88d69b21843a4f4416d3419bc&=&width=438&height=440`)
  

   msg.edit({ embeds: [embed] })





 }

}