exports.run = async (client, message, args) => {
    const db = require("wio.db")
    const {MessageEmbed} = require("discord.js")
    const moment = require("moment");
    const prefix = "!";
    require('moment-duration-format');
    var server = message.guild
    ////////////////////////////////////////////////////////suncuu ayarı
var üyesayısı = server.members.cache.filter(a => !a.user.bot).size
var toplamsayfa = 0
if(üyesayısı < 10){
 toplamsayfa = 1
} else {
toplamsayfa = `${üyesayısı/10}`
if(toplamsayfa.includes(".")){
    toplamsayfa = Math.ceil(toplamsayfa)
} else {
    toplamsayfa = `${üyesayısı/10}`
}
}
    ///////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////ses
    var seskisi = message.guild.members.cache.filter(a => !a.user.bot).array().sort((a,b) => {
      return (db.fetch(`${server.id}.voice.${b.user.id}`) ? db.fetch(`${server.id}.voice.${b.user.id}`) : 0) - (db.fetch(`${server.id}.voice.${a.user.id}`) ? db.fetch(`${server.id}.voice.${a.user.id}`) : 0)
    })
    var ses10 = seskisi.slice(0,10)
    var sessayi = 1
    const ses2 = ses10.map(s => `**${sessayi++}** <@${s.user.id}> :  ${db.fetch(`${server.id}.voice.${s.user.id}.lvl`) ? db.fetch(`${server.id}.voice.${s.user.id}.lvl`) : "0"} Level ${db.fetch(`${server.id}.voice.${s.user.id}.xp`) ? db.fetch(`${server.id}.voice.${s.user.id}.xp`) : "0"} Xp`).join("\n")
    ///////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////yazı
      var yazkisi = message.guild.members.cache.filter(a => !a.user.bot).array().sort((a,b) => {
        return (db.fetch(`${server.id}.messages.${b.user.id}`) ? db.fetch(`${server.id}.messages.${b.user.id}`) : 0) - (db.fetch(`${server.id}.messages.${a.user.id}`) ? db.fetch(`${server.id}.messages.${a.user.id}`) : 0)
      })
      var yaz10 = yazkisi.slice(0,10)
      var yazsayi = 1
      const yaz2 = yaz10.map(s => `**${yazsayi++}** <@${s.user.id}> :  ${db.fetch(`${server.id}.messages.${s.user.id}.lvl`) ? db.fetch(`${server.id}.messages.${s.user.id}.lvl`) : "0"} Level ${db.fetch(`${server.id}.messages.${s.user.id}.xp`) ? db.fetch(`${server.id}.messages.${s.user.id}.xp`) : "0"} Xp`).join("\n")
      ///////////////////////////////////////////////////////
    if (!args[0]) {
        const top = new MessageEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL())
        .setFooter(client.user.tag, client.user.avatarURL())
        .addField("Top Voice", `${ses2}\n**More? Type ${prefix}top voice**`)
        .addField("Top Text", `${yaz2}\n**More? Type ${prefix}top text**`)
        .setDescription("This board for this server.");

        message.channel.send(top);
    } else if (args[0].toLowerCase() === "text") {
        let sayfa = args[1] ? args[1] : 1;
        if (isNaN(sayfa)) return message.channel.send("Invalid page number");
        sayfa = Number(sayfa);
        if(sayfa > toplamsayfa) return message.channel.send("Please type a page value")
        if (sayfa < 0) return message.channel.send("Please type a page value")
        var al = {
            ilk: sayfa*10-10,
            iki: sayfa*10
        }
        var yazkisi2 = message.guild.members.cache.filter(a => !a.user.bot).array().sort((a,b) => {
            return (db.fetch(`${server.id}.messages.${b.user.id}`) ? db.fetch(`${server.id}.messages.${b.user.id}`) : 0) - (db.fetch(`${server.id}.messages.${a.user.id}`) ? db.fetch(`${server.id}.messages.${a.user.id}`) : 0)
          })
          var yaz102 = yazkisi2.slice(al.ilk,al.iki)
          var yazsayi2 = al.ilk+1
          const yaz22 = yaz102.map(s => `**${yazsayi2++}** <@${s.user.id}> :  ${db.fetch(`${server.id}.messages.${s.user.id}.lvl`) ? db.fetch(`${server.id}.messages.${s.user.id}.lvl`) : "0"} Level ${db.fetch(`${server.id}.messages.${s.user.id}.xp`) ? db.fetch(`${server.id}.messages.${s.user.id}.xp`) : "0"} Xp`).join("\n")
          const top3 = new MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL())
          .setFooter(client.user.tag, client.user.avatarURL())
  
          .addField("Top Text", `${yaz22}`)
          .setDescription("This board for this server.");
  
          message.channel.send(top3);
        } else if (args[0].toLowerCase() === "voice") {
        let sayfa = args[1] ? args[1] : 1;
        if (isNaN(sayfa)) return message.channel.send("Invalid page number");
        sayfa = Number(sayfa)
        if(sayfa > toplamsayfa) return message.channel.send("Please type a page value")
        if (sayfa < 0) return message.channel.send("Please type a page value")
        ///////////////////////////////////////////////////////
       
        var al = {
            ilk: sayfa*10-10,
            iki: sayfa*10
        }
        var seskisi2 = message.guild.members.cache.filter(a => !a.user.bot).array().sort((a,b) => {
            return (db.fetch(`${server.id}.voice.${b.user.id}`) ? db.fetch(`${server.id}.voice.${b.user.id}`) : 0) - (db.fetch(`${server.id}.voice.${a.user.id}`) ? db.fetch(`${server.id}.voice.${a.user.id}`) : 0)
          })
          var ses102 = seskisi2.slice(al.ilk,al.iki)
          var sessayi2 = al.ilk+1
          const ses22 = ses102.map(s => `**${sessayi2++}** <@${s.user.id}> :  ${db.fetch(`${server.id}.voice.${s.user.id}.lvl`) ? db.fetch(`${server.id}.voice.${s.user.id}.lvl`) : "0"} Level ${db.fetch(`${server.id}.voice.${s.user.id}.xp`) ? db.fetch(`${server.id}.voice.${s.user.id}.xp`) : "0"} Xp`).join("\n")
          const top2 = new MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL())
          .setFooter(client.user.tag, client.user.avatarURL())
          .addField("Top Voice", `${ses22}`)
  
          .setDescription("This board for this server.");
  
          message.channel.send(top2);
    } else {
        message.channel.send("Please type voice or text!");
    }
};
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0,
    kategori: "bot",
  };
  exports.help = {
    name: 'top',
    description: 'Botun istatistiklerini gösterir.',
    usage: '',
  };