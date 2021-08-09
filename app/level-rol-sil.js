exports.run = async (client,msg,args ) =>{
 var {MessageEmbed} = require("discord.js")
 var db = require("kullandgıınzdb")
 var message = msg
 if (!db.fetch(`${message.guild.id}.level`)) return message.channel.send("Level sistemi aktif değil!");
 if(!args[0]){
     var embed = new MessageEmbed()
     .setTitle(`${client.user.username} Level Sistemi`)
     .setDescription(`Bir değer belirtin. **text** veya **voice**`)
     .setColor("RED")
     return msg.channel.send(embed)
 }
 if(args[0].toLowerCase() === "voice"){
     if(!args[1]){
         var embed = new MessageEmbed()
         .setTitle(`${client.user.username} Level Sistemi`)
         .setDescription('Lütfen bir level değeri yazın!')
         .setColor('RED')
         return msg.channel.send(embed);
     }
     if(isNaN(args[1])){
        var embed = new MessageEmbed()
        .setTitle(`${client.user.username} Level Sistemi`)
        .setDescription('Lütfen SAYI DEĞERİ OLARAK level yazın!')
        .setColor('RED')
        return msg.channel.send(embed);
     }
     var voiceRoles = db.fetch(`${message.guild.id}.level.roles.voice`);
     if (!voiceRoles) return message.channel.send("Zaten hiç rol ayarlanmamış!");
     var rakam = 0
     voiceRoles.forEach(a =>rakam=rakam+1)
     if(!voiceRoles.filter(a => a.lvl === args[1])) return message.channel.send('Bulunamadı!')
     if(rakam === 1){
        db.delete(`${message.guild.id}.level.roles.voice`)
     } else {
         var oso = []
         voiceRoles.filter(a=> {
             a.lvl !== args[1]
         }).forEach(a => oso.push(a))
         db.set(`${message.guild.id}.level.roles.voice`,oso)
     }
     var embed = new MessageEmbed()
        .setTitle(`${client.user.username} Level Sistemi`)
        .setDescription('Silindi.')
        .setColor('GREEN')
        return msg.channel.send(embed);
 } else if (args[0].toLowerCase() === 'text') {
    if(!args[1]){
        var embed = new MessageEmbed()
        .setTitle(`${client.user.username} Level Sistemi`)
        .setDescription('Lütfen bir level değeri yazın!')
        .setColor('RED')
        return msg.channel.send(embed);
    }
    if(isNaN(args[1])){
       var embed = new MessageEmbed()
       .setTitle(`${client.user.username} Level Sistemi`)
       .setDescription('Lütfen SAYI DEĞERİ OLARAK level yazın!')
       .setColor('RED')
       return msg.channel.send(embed);
    }
    var textRoles = db.fetch(`${message.guild.id}.level.roles.text`);
    if (!textRoles) return message.channel.send("Zaten hiç rol ayarlanmamış!");
    var rakam = 0
    textRoles.forEach(a =>rakam=rakam+1)
    if(!textRoles.filter(a => a.lvl === args[1])) return message.channel.send('Bulunamadı!')
    if(rakam === 1){
       db.delete(`${message.guild.id}.level.roles.text`)
    } else {
        var oso = []
        textRoles.filter(a=> {
            a.lvl !== args[1]
        }).forEach(a => oso.push(a))
        db.set(`${message.guild.id}.level.roles.text`,oso)
    }
    var embed = new MessageEmbed()
       .setTitle(`${client.user.username} Level Sistemi`)
       .setDescription('Silindi.')
       .setColor('GREEN')
       return msg.channel.send(embed);
 } else return message.reply(new MessageEmbed()
 .setTitle(`${client.user.username} Level Sistemi`)
 .setDescription('Lütfen sadece voice veya text yazın!')
 .setColor('RED'));
}
exports.conf = {
    Enabled:true,
    guildOnly:true,
    permLevel:4,
    aliases:["lrs"]
}
exports.help = {
    name:"level-rol-sil",
    description:"",
    usage:""
}