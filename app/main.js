var logs = require("discord-logs")
logs(client)
var db = require("kullandıgınızdb")





client.on("message",async msg => {
    try {
      if(!msg.guild) return
      var server = msg.guild
      var user = msg.author
      var member = msg.member
  if(!db.fetch(`${server.id}.level`)) return
      db.add(`${server.id}.messages.${user.id}`,1)
      db.add(`${server.id}.messages`,1)
      if(db.fetch(`${server.id}.messages.${user.id}.xp`) > 1000){
          db.add(`${server.id}.messages.${user.id}.lvl`,1)
          var kanallar = db.fetch(`${server.id}.level.channel`) 
          var kanal = null
          var özelmsj = db.fetch(`${server.id}.level.message.default`) || `[user:mention] adlı kişi [lvl] seviyesine ulaştı! :partying_face:`
          if(!kanallar) {kanal = msg.channel
           }else{
     kanal = msg.guild.channels.cache.get(kanallar)
          }
          kanal.send(özelmsj.replace("[user]",msg.author.tag).replace("[user:mention]",`<@{msg.author.id}>`).replace("[lvl]",db.fetch(`${server.id}.messages.${user.id}.lvl`)))
          if((`${server.id}.messages.${user.id}.xp`)){
            db.delete(`${server.id}.messages.${user.id}.xp`)
        } else {
    
        }
      } else {
          db.add(`${server.id}.messages.${user.id}.xp`,1)
      }
    
      
      var lvl = db.fetch(`${server.id}.messages.${user.id}.lvl`)
      var level = db.fetch(`${server.id}.level.roles.text`)
      if(!level){
         
      } else {
        if(!Array.isArray(level)){
     
        } else {
          var lvl = db.fetch(`${server.id}.messages.${user.id}.lvl`)
         level.filter(a => {
           if(a.lvl <= lvl){
          member.roles.add(a.rol).catch(e =>{console.log("VEREMEDİM ABİ")})
          var kanallarrol = db.fetch(`${server.id}.level.channel`) 
          var kanalrol = null
          var özelmsjrol = db.fetch(`${server.id}.level.message.role`) || "[user:mention] Level atladı ve [role:mention] rolünü kazandı!!!";
          if(!kanallarrol) {kanalrol = msg.channel
           }else{
     kanalrol = msg.guild.channels.cache.get(kanallar)
          }
          var rol = msg.guild.roles.cache.get(a.rol)
          if(msg.member.roles.cache.find(a => a.id === rol.id)) return 
          msg.guild.channels.cache.get(kanallarrol).send(özelmsjrol.replace("[user]",msg.author.tag).replace("[user:mention]",`<@${msg.author.id}>`).replace("[lvl]",db.fetch(`${server.id}.messages.${user.id}.lvl`)).replace("[rol]",rol.name).replace("[role:mention]",`<@&${rol.id}>`))
           }
         })
        }
      }
    } catch(e) {
      console.log(e)
    }
  })
  client.on("voiceChannelJoin",async (member,kanal) =>{
    if(!db.fetch(`${member.guild.id}.level`)) return
      db.set(`${member.guild.id}.voice.${member.id}.join`,Date.now());
  })
  client.on("voiceChannelLeave",async (member,kanal) =>{
    if(!db.fetch(`${member.guild.id}.level`)) return
      if(!db.fetch(`${member.guild.id}.voice.${member.id}.join`)) return
      var zaman = Date.now() - db.fetch(`${member.guild.id}.voice.${member.id}.join`)
      db.add(`${member.guild.id}.voice.${member.id}`,zaman)
   var level = db.fetch(`${member.guild.id}.level.roles.voice`)
   if(!level){
  
   } else {
     if(!Array.isArray(level)){
  
     } else {
  
  
     }
   }
      db.add(`${member.guild.id}.voice.${member.id}.xp`,Math.floor(zaman/2000))
     if(db.fetch(`${member.guild.id}.voice.${member.id}.xp`)  > 2000){
         db.add(`${member.guild.id}.voice.${member.id}.lvl`,1)
         var lvl = db.fetch(`${member.guild.id}.voice.${member.id}.lvl`)
          if(!level){
  
           } else {
     if(!Array.isArray(level)){ 
  
     } else {
     (level.filter(a => {
     if(a.lvl <= lvl ){
      member.roles.add(a.rol).catch(e =>{console.log("VEREMEDİM ABİ")})
     }
        })
      
      
     )
      }
   }
         if(db.fetch(`${member.guild.id}.voice.${member.id}.xp`)){
         db.delete(`${member.guild.id}.voice.${member.id}.xp`)
         } else {
  
         }
        
         
     } 
  
  })