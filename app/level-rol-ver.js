exports.run = (client,message,args) => {
    const db = require("kullandıgınzdb");
    var {MessageEmbed} = require("discord.js")
    if (!db.fetch(`${message.guild.id}.level`)) return message.channel.send("Level sistemi aktif değil!");
    if(!Array.isArray(db.fetch(`${message.guild.id}.level.roles.text`))){
      db.set(`${message.guild.id}.level.roles.text`,[])
    }
    if(!Array.isArray(db.fetch(`${message.guild.id}.level.roles.voice`))){
        db.set(`${message.guild.id}.level.roles.voice`,[])
      }
      if(!args[0]){
          var embed = new MessageEmbed()
          .setTitle(`${client.user.username} Level Sistemi`)
          .setDescription(`Bir değer belirtin. **text** veya **voice**`)
          .setColor("RED")
         return message.channel.send(embed)
        }
        if(args[0].toLowerCase() === "voice"){
            if(!args[1]){
                var embed = new MessageEmbed()
                .setTitle(`${client.user.username} Level Sistemi`)
                .setDescription("Lütfen bir level yazın! Ör: !lrv voice 15 @Rol")
                .setColor("RED")
               return message.channel.send(embed)
            }
            if(args[1]){
                if(isNaN(args[1])) return message.channel.send("Lütfen sayı olarak level değeri yazın")
                if (Number(args[1]) < 1) return message.channel.send("Lütfen 1 den büyük bir sayı yazın")
            }
            var role = message.mentions.roles.first() || message.guild.roles.cache.find(a => a.id === args[2]) || message.guild.roles.cache.find(a => a.name === args.slice(2).join(" "))
            if(!role){
                var embed = new MessageEmbed()
                .setTitle(`${client.user.username} Level Sistemi`)
                .setDescription("Rol bulunamadı")
                .setColor("RED")
               return message.channel.send(embed)
            }
            if (message.guild.me.roles.highest.position <= role.position) {
                var embed = new MessageEmbed()
                .setTitle(`${client.user.username} Level Sistemi`)
                .setColor("RED")
                .setDescription(`<@&${role.id}> rolünü yönetme yetkim yok. Lütfen rolümü bu rolün üstüne taşıyın`)
                return message.channel.send(embed);
            }
            if(db.fetch(`${message.guild.id}.level.roles.voice`).map(a => a.rol === role.id)) return
            var basarili = new MessageEmbed()
            .setTitle(`${client.user.username} Level Sistemi`)
            .setDescription(`${args[1]} seviyesinde <@&${role.id}> rolü verilecek (voice)`)
            .setColor("GREEN")
            message.channel.send(basarili);
            db.push(`${message.guild.id}.level.roles.voice`,{rol:role.id,lvl:args[1]})
        }
        else if(args[0].toLowerCase() === "text"){
            if(!args[1]){
                var embed = new MessageEmbed()
                .setTitle(`${client.user.username} Level Sistemi`)
                .setDescription("Lütfen bir level yazın! Ör: !lrv text 15 @Rol")
                .setColor("RED")
               return message.channel.send(embed)
            }
            if(args[1]){
                if(isNaN(args[1])) return message.channel.send("Lütfen sayı olarak level değeri yazın")
                if (Number(args[1]) < 1) return message.channel.send("Lütfen 1 den büyük bir sayı yazın")
            }
            var role = message.mentions.roles.first() || message.guild.roles.cache.find(a => a.id === args[2]) || message.guild.roles.cache.find(a => a.name === args.slice(2).join(" "))
            if(!role){
                var embed = new MessageEmbed()
                .setTitle(`${client.user.username} Level Sistemi`)
                .setDescription("Rol bulunamadı")
                .setColor("RED")
               return message.channel.send(embed)
            }
            if (message.guild.me.roles.highest.position <= role.position) {
                var embed = new MessageEmbed()
                .setTitle(`${client.user.username} Level Sistemi`)
                .setColor("RED")
                .setDescription(`<@&${role.id}> rolünü yönetme yetkim yok. Lütfen rolümü bu rolün üstüne taşıyın`)
                return message.channel.send(embed);
            }
            if(db.fetch(`${message.guild.id}.level.roles.text`).map(a => a).includes(role.id)) return console.log("e")
            var basarili = new MessageEmbed()
            .setTitle(`${client.user.username} Level Sistemi`)
            .setDescription(`${args[1]} seviyesinde <@&${role.id}> rolü verilecek (text)`)
            .setColor("GREEN")
            message.channel.send(basarili);
            db.push(`${message.guild.id}.level.roles.text`,{rol:role.id,lvl:args[1]})
        }
        else return message.channel.send("Lütfen **text** veya **voice** yazın");
      
} 
exports.conf = {
    Enabled:true,
    guildOnly:true,
    permLevel:4,
    aliases:["lrv"]
}
exports.help = {
    name:"level-rol-ver",
    description:"",
    usage:""
}