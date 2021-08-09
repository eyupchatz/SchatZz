exports.run = (client,msg,args) => {

    const { MessageEmbed } = require("discord.js");
    const db = require("kullandıgınzdb");
    var message = msg
    if (!db.fetch(`${message.guild.id}.level`)) return message.channel.send("Level sistemi aktif değil!");
    if (!args[0]) return msg.reply(new MessageEmbed()
    .setColor("RED")
    .setDescription("Lütfen bir kanal etiketleyin veya kapat yazın."));

    if (args[0].toLowerCase() === "sil") {
        if (!db.fetch(`${msg.guild.id}.level.channel`)) return msg.reply(new MessageEmbed()
        .setColor("RED")
        .setDescription("Level-log kanalı zaten ayarlanmamış!"));
        msg.reply(new MessageEmbed()
        .setColor("GREEN")
        .setDescription("Level-log kanalı silindi."));
        db.delete(`${msg.guild.id}.level.channel`);
        return;
    }

    let kanal = msg.mentions.channels.first() || msg.guild.channels.cache.get(args[0]);
    if (!kanal) return msg.reply(new MessageEmbed()
    .setColor("RED")
    .setDescription("Kanal bulunamadı"));
    if (kanal.type !== "text") return msg.reply(new MessageEmbed()
    .setColor("RED")
    .setDescription("Level-log kanalının bir yazı kanalı olması zorunludur."));
    if (!kanal.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return msg.reply(new MessageEmbed()
    .setColor("RED")
    .setDescription("Bu kanala yazı yazma iznim yok!"));

    msg.channel.send(new MessageEmbed()
    .setColor("GREEN")
    .setDescription(`<#${kanal.id}> kanalı level-log kanalı olarak ayarlandı!`));
    db.set(`${msg.guild.id}.level.channel`,kanal.id);
};
exports.conf = {
    Enabled:true,
    guildOnly:true,
    permLevel:4,
    aliases: ["lka"]
};
exports.help = {
    name:"level-kanal-ayarla"
};