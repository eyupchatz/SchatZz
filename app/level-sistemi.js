exports.run = (client,message,args) => {
    var db = require("wio.db")
    var server = message.guild
    var {MessageEmbed} = require("discord.js")
    if(!args[0]){
        var embed = new MessageEmbed()
        .setTitle(`${client.user.username} Level Sistemi`)
        .setDescription(`**Aç** veya **Kapat** yazınız`)
        .setColor("RED")
     return   message.channel.send(embed)
    }
    if(args[0].toLowerCase() === "aç"){
        var embed = new MessageEmbed()
        .setTitle(`${client.user.username} Level Sistemi`)
        .setDescription(`Level Sistemi Açıldı`)
        .setColor("GREEN")
        db.set(`${server.id}.level`,true)
        message.channel.send(embed)
    }
    if(args[0].toLowerCase() === "kapat"){
        if(db.fetch(`${server.id}.level`)){
        var embed = new MessageEmbed()
        .setTitle(`${client.user.username} Level Sistemi`)
        .setDescription(`Level Sistemi Kapandı`)
        .setColor("RED")
        db.delete(`${server.id}.level`)
        message.channel.send(embed)
        } else {
            var embed = new MessageEmbed()
            .setTitle(`${client.user.username} Level Sistemi`)
            .setDescription(`Level Sistemi Kapanlı  Zaten Kanka Kapalı Olanı Bidaha Nasıl Kapatcan`)
            .setColor("RED") 
            message.channel.send(embed)
        }
    }
}
exports.conf = {
    Enabled:true,
    guildOnly:true,
    permLevel:4,
    aliases:["ls"]
}
exports.help = {
    name:"level-sistemi",
    description:"",
    usage:""
}