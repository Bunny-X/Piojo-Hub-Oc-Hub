const Discord = require('discord.js');

const color = "0x410255"

module.exports = {
  name: "hack",
  alias: [],

execute (client, message, args){

  let user = message.mentions.members.first()
  if(!user){
     const qq = new Discord.MessageEmbed()
    .setDescription("You have to mention a user.\nMode of use: `.hack [user]`")
    .setColor(color)
    return message.reply({embeds: [qq]})
  }

  if(user.id === client.user.id){
    const si = new Discord.MessageEmbed()
    .setDescription(`You can't hack ${client.user.username}.`)
    .setColor(color)
    return message.reply({embeds: [si]})
  }

  if(user.id === message.author.id){
    const uwu = new Discord.MessageEmbed()
    .setDescription(`You can't hack ${message.author.username}.`)
    .setColor(color)
    return message.reply({embeds: [uwu]})
  }

  let loo = ["Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36", "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36", "Mozilla/5.0 (iPhone; CPU iPhone OS 13_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (Linux; Android 10; ZTE Blade V10 Build/QP1A.190711.020) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Mobile Safari/537.36 OPX/1.4"]

  let pais =  ["México", "Colombia", "Argentina", "Peru", "Chile", "Bolivia", "Brasil", "Venezuela"]

  let ip = ["`2806:108e:19:ba14:c986:f166:8b26:3ec9`", "`181.43.242.56`", "`181.174.127.36`", "`190.86.135.40`", "`2806:108e:1e:4917:486a:6f78:20e2:7ef2`"]

  let os = ["Android", "IOS", "BSD", "Windows", "Linus", "MacOs"]

  let number = ["`+593-993-700-697`", "`849-885-244-888`", "`8284-963-835`", "`99 44-511-350`"]

  let location = ["Toluca, México", "San Jose, California", "Brest, Brittany", "Palmares, Provincia de Alajuela", "Durango, Durango", "Grecia, Provincia de Alajuela", "Lima, Lima", "Tancanhuitz, San Luis Potosí", "Maipu, Santiago Metropolitan", "Guatemala City, Departamento de Guatemala", "Santa Tecla, Departamento de La Libertad"]

  let isp = ["`Mega Cable, S.A. de C.V.`", "`Uninet S.A. de C.V.`", "`Cable Tica`", "`Ufinet Panama S.A.`"]

  let cordenadas = ["`24.0422, -104.8234`", "`10.0578, -84.4297`", "`-12.0464, -77.0428`", "`38.9586, -77.357`"]

 
   const emailfinal = loo[Math.floor(Math.random() * loo.length)]
  
   const paisfinal = pais[Math.floor(Math.random() * pais.length)]

   const ipfinal = ip[Math.floor(Math.random() * ip.length)]

    const osfinal = os[Math.floor(Math.random() * os.length)]

   const numberfinal = number[Math.floor(Math.random() * number.length)]

    const agefinal = location[Math.floor(Math.random() * location.length)]

    const cordenadasfinal = cordenadas[Math.floor(Math.random() * cordenadas.length)]

    const ispfinal = isp[Math.floor(Math.random() * isp.length)]

    const om = new Discord.MessageEmbed()
    .setDescription(`<a:custom_emoji:1215557264732332053> Wait.`)
    .setColor(color)

    const hack = new Discord.MessageEmbed()

    .setTitle("Ip Logger")
    .setColor(color)
    .addField("IP", `${ipfinal}`, true)
     .addField("Location", `\`${agefinal}\``, true)
    .addField("Country", `\`${paisfinal}\``, true)
    .addField("ISP", `${ispfinal}`)
    .addField("Coordinates", `${cordenadasfinal}`) 
    .addField("Phone", `\`${numberfinal}\``)  
    .addField("Browser Info", `\`${emailfinal}\``)
 
    
    

    .setTimestamp()
  

   message.channel.send({embeds: [om]}).then(m => {
setTimeout(() =>{
m.edit({embeds: [hack]})
}, 6000)
})






 }

}