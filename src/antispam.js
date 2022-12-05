const { PREFIX, HOOK } = require('../config')
const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));
const names = require('../pfp/names').names
const { EmbedBuilder } = require('discord.js')

module.exports = {
    chat: async function(usrmsg, db, username, client, ebot, message) {
    	
    let vezes = ebot.quantity
    let val = ebot.getValue("chat")
    let dcmsgs = ebot.dcmsgs
    	
    // start of message send
            async function getUUID (path = `https://playerdb.co/api/player/minecraft/${username}`) {
                const response = await fetch(path)
                const data = await response.json()

                if (data.code !== 'player.found') return

                return await data.data.player.raw_id

            }

            async function RandomAvatar() {

                if (db.has(a => a.name === username)) {
                    let user = await db.get(a => a.name === username).avatar

                    const response = await fetch(`https://playerdb.co/api/player/minecraft/${user}`)
                    const data = await response.json()

                    if (data.code !== 'player.found') return

                    return `https://crafatar.com/avatars/${await data.data.player.raw_id}?size=32&overlay`

                } else {

                    let avatar = names[Math.floor(Math.random() * names.length)]

                    await db.create({
                        name: username,
                        avatar: avatar,
                        useCustomSkin: true
                    })

                    let user = await db.get(a => a.name === username).avatar

                    const response = await fetch(`https://playerdb.co/api/player/minecraft/${user}`)
                    const data = await response.json()

                    if (data.code !== 'player.found') return

                    return `https://crafatar.com/avatars/${await data.data.player.raw_id}?size=32&overlay`

                }
            }

            async function getAvatar() {
              
                if(!db.has(a => a.name === username)) return false

                    let user = db.get(a => a.name === username)

                    if(!user.useCustomSkin) return false
           
                        const response = await fetch(`https://playerdb.co/api/player/minecraft/${user.avatar}`)
                        const data = await response.json()
    
                        if (data.code !== 'player.found') return false
                        return `https://crafatar.com/avatars/${await data.data.player.raw_id}?size=32&overlay`   
                    
            }
            
            
            
           if(val >= 11) ebot.val = 0
           
           if(dcmsgs.some(usm => usm.usrmsg === usrmsg)) {
           	
           let DelId = dcmsgs.find(usm => usm.usrmsg === usrmsg).ID
           
         client.chat.messages.fetch(DelId).then(async msg => {
         	await msg.delete()
         
     dcmsgs.splice(dcmsgs.findIndex(usm => usm.usrmsg.startsWith(usrmsg)), 1)

         }).catch(e => console.log(e))
         
   
   
           	
           ebot.val = dcmsgs.find(usm => usm.usrmsg === usrmsg).val
           
           
           val = ebot.getValue("chat")

let x = 0

let i = 0



for(vez in vezes) {
	i++
	if(val === i) {
		vezes[vez] = vezes[vez] + 1
		x = vezes[vez]
		}
		}
		
		
		getUUID().then(uuid => {
                client.fetchWebhook(HOOK.ID, HOOK.TOKEN)
                    .then(async hk => {
  
                        hk.send(
                            {
                                content: `${ebot.filter.clean(message)}(x${x})` || `\`Mensagem inválida (x${x})\``,
                                username: username || 'Nome invalido',
                                avatarURL: await getAvatar() ? await getAvatar() : uuid ? `https://crafatar.com/avatars/${uuid}?size=32&overlay` : await RandomAvatar()

                            }).then(msg => {
                            	  
                            if(val >= 11) ebot.val = 0

dcmsgs.push({
"ID": msg.id,
"usrmsg": usrmsg,
"val": val
})

if(dcmsgs.lenght >=10) return dcmsgs.splice()

      


}).catch(e => {
                       console.log(e)
                       
})
                    })

            })
            
		
	
	
	} else {
		
		ebot.val = ebot.getValue("chat") + 1
		val = ebot.getValue("chat")
		if(val >= 11) ebot.val = 0
		
		getUUID().then(uuid => {
                client.fetchWebhook(HOOK.ID, HOOK.TOKEN)
                    .then(async hk => {
  
                        hk.send(
                            {
                                content: `${ebot.filter.clean(message)}` || `\`Mensagem inválida\``,
                                username: username || 'Nome invalido',
                                avatarURL: await getAvatar() ? await getAvatar() : uuid ? `https://crafatar.com/avatars/${uuid}?size=32&overlay` : await RandomAvatar()

                            }).then(msg => {
                            	
                       

dcmsgs.push({
"ID": msg.id,
"usrmsg": usrmsg.toString(),
"val": val

})

if(dcmsgs.lenght >=10) return dcmsgs.splice()


      


}).catch(e => {
                       console.log(e)
                       
})
                    })

            })

		}



    },

    death: async function(reason, username, ebot, client) {
    	const usrreason = `${username} ${reason}`
    
    let vezes = ebot.quantityD
    let dval = ebot.getValue("kill")
    let deathmsgs = ebot.dcmsgsD
    
    if(dval >= 11) ebot.dval = 0
    
    if(deathmsgs.some(usm => usm.usrreason === usrreason)) {
           	
           let DelId = deathmsgs.find(usm => usm.usrreason === usrreason).ID
           
         client.chat.messages.fetch(DelId).then(async msg => {
         	await msg.delete()
         
     deathmsgs.splice(deathmsgs.findIndex(usm => usm.usrreason.startsWith(usrreason)), 1)

         }).catch(e => console.log(e))
         
         
         
         
         ebot.vald = deathmsgs.find(usm => usm.usrreason === usrreason).dval
       
           dval = ebot.getValue("kill")

let x = 0

let i = 0



for(vez in vezes) {
	i++
	if(dval === i) {
		vezes[vez] = vezes[vez] + 1
		x = vezes[vez]
		}
		}
		
		
		
                            const DeathEmbedX = new EmbedBuilder()
          .setDescription(`*${username}* ${ebot.filter.clean(reason.trim())}(x${x})!`)
          .setColor('FF0000')

          client.chat.send({ embeds: [DeathEmbedX]}).then(msg => {
                            	
                            
                           
                            	if(dval >= 11) ebot.dval = 0
                         
                       

deathmsgs.push({
"ID": msg.id,
"usrreason": usrreason,
"dval": dval
})

if(deathmsgs.lenght >=10) return deathmsgs.splice()

      


}).catch(e => {
                       console.log(e)
                      })
            
		
	
	
	} else {
		
		ebot.vald = ebot.getValue("kill") + 1
		dval = ebot.getValue("kill")
		
		if(dval >= 11) ebot.dval = 0
		
		const DeathEmbed = new EmbedBuilder()
          .setDescription(`*${username}* ${ebot.filter.clean(reason.trim())}!`)
          .setColor('FF0000')

                            client.chat.send({ embeds: [DeathEmbed] }).then(msg => {
                            	
                       

deathmsgs.push({
"ID": msg.id,
"usrreason": usrreason.toString(),
"dval": dval

})

if(deathmsgs.lenght >=10) return deathmsgs.splice()


      


}).catch(e => {
                       console.log(e)
                       
})
                

		}

	
    }

    }
