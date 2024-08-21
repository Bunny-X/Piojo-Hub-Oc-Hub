const Discord = require('discord.js');
const weather = require("weather-js");

const Color = '0x410255'

module.exports = {
  name: "weather",
  alias: [],

execute (client, message, args){

 if (!args[0]) return message.reply("Please Give Location!");

    weather.find({ search: args.join(" ") }, function(error, result) {
      if (error) return message.reply(`Something Went Wrong, Try Again Later!`);

      if (result === undefined || result.length === 0)
        return message.reply(
          `Invalid Location, Please Give Valid Location!`
        );

      var current = result[0].current;
      var location = result[0].location;

      const Weather = new Discord.MessageEmbed()
        .setColor(Color)
        .setTitle(`${location.name} Weather!`)
        .setDescription(`${current.skytext}`)
        .setThumbnail(current.imageUrl)
        .addField("Degree Type", location.degreetype, true)
        .addField("Temperature", `${current.temperature}°`, true)
        .addField("Humidity", `${current.humidity}%`, true)
        .addField("Wind", current.winddisplay, true)
        .addField("Feels Like", `${current.feelslike}°`, true)
        .addField("Timezone", `UTC${location.timezone}`, true)
        .setTimestamp();

      message.reply({embeds: [Weather]});
    });




 }

}