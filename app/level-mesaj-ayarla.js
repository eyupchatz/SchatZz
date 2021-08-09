exports.run = (client,msg,args) => {
    const { MessageEmbed } = require("discord.js");
    const db = require("kullandıgınzdb")
    if (!db.fetch(`${msg.guild.id}.level`)) return msg.channel.send("Level sistemi aktif değil!");
    if (!db.fetch(`${msg.guild.id}.level.channel`)) return msg.reply(new MessageEmbed()
    .setColor("RED")
    .setDescription("Level-log kanalı ayarlı değil!"));
    if(!args[0]){
        const embed = new MessageEmbed()
        .setTitle(`${client.user.username} Level Sistemi`)
        .setDescription(`**normal** veya **rol** türünde seçiniz`)
        .setColor("RED")
        return msg.channel.send(embed)
    }
    if(args[0].toLowerCase() === "normal"){
        var mesaj = args.slice(1).join(" ");
        
        if(!mesaj) return msg.channel.send(new MessageEmbed()
        .setTitle(`${client.user.username} Level Sistemi`)
        .setDescription(`Lütfen Mesaj Giriniz.\n\n**Birkaç ipucu:**\n[lvl] => Kişinin seviyesi\n[user:mention] => Kişi etiketi\n[user] => Kişi adı ve ayrımcısı`)
        .setColor("RED"));
        var embed = new MessageEmbed()
        .setTitle(`${client.user.username} Level Sistemi`)
        .setDescription(`Biri Level Atladığında Aşağıdaki Cevap Verilecek:\n${mesaj.replace("[lvl]",1).replace("[user:mention]", `<@!${client.user.id}>`).replace("[user]",client.user.tag)}`)
       msg.channel.send(embed);
       db.set(`${msg.guild.id}.level.message.default`,mesaj);
    } else if (args[0].toLowerCase() === "rol") {
        var mesaj = args.slice(1).join(" ");
        if (!mesaj) return msg.reply(new MessageEmbed()
        .setColor("YELLOW")
        .setDescription("Bir mesaj yazın.\n\n**Birkaç ipucu:**\n[lvl] => Kişinin seviyesi\n[user] => Kişinin adı#ayrımcısı\n[user:mention] => Kişinin etiketi\n[role] => Kişinin kazandığı rol adı\n[role:mention] => Kişinin kazandığı rol etiketi"));
        
        var rol = msg.guild.roles.cache.random();
        msg.reply(new MessageEmbed()
        .setColor("GREEN")
        .addField("Mesaj ayarlandı", mesaj.replace("[lvl]",1).replace("[user:mention]", `<@!${client.user.id}>`).replace("[user]",client.user.tag).replace("[role]", rol.name).replace("[role:mention]",`<@&${rol.id}>`)));
        db.set(`${msg.guild.id}.level.message.role`,mesaj);
    } else return msg.reply(new MessageEmbed()
    .setColor("RED")
    .setDescription("Lütfen **normal** veya **rol** yazın."));
};
exports.conf = {
    Enabled:true,
    guildOnly:true,
    permLevel:4,
    aliases: ["lma"]
};
exports.help = {
    name:"level-mesaj-ayarla"
};