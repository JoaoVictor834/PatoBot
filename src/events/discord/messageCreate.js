const Event = require('../../structures/Event')
const { CHATBOT, CMDBOT, HOOK } = require('../../../config')
const { PermissionsBitField } = require('discord.js');

module.exports = class extends Event.dEvent {
    constructor(client) {
        super(client, {
            name: 'messageCreate'
        })
    }
    
    run = async (message) => {
      
        
        if(message.author.id === this.client.user.id) return
        if(message.channel.id === CMDBOT) {
            return message.client.bot.chat(`${message}`)
        }

      if(message.channel.id !== CHATBOT) return
      if(message.webhookId === HOOK.ID) return
      if(message.content.lenght > 240) return
      if(/\n/.test(message)) return
      

      if(message.content.startsWith('&') && !interaction.user.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.reply('Se quiser usar cor compre apoiador boboca https://loja.anarkcraft.xyz')

      async function db(client) {

        if(!client.ebot) return

        if(!client.ebot.debounce) {
      
        client.ebot.debounce = true

       await client.ebot.debounceFunction(1000)

       return message.client.bot.chat(`${message.author.username}: ${message.content}`)
        } else {
            
             message.reply("Você esta enviando mensagens rapido demais!").then(msg => {
                 setTimeout(() => {
                     msg.delete()
     
                 }, 5000)})
                 const MutedRole = message.guild.roles.cache.find(
                    role => role.name === "Muted"
                 )
                 if(!MutedRole) return console.log("[DEBUG] mutar falhou sem cargo")

      
                 message.member.roles.add(MutedRole).then(() => {
                    setTimeout(() => {
                        message.member.roles.remove(MutedRole)
                        console.log("[DEBUG] removido cargo de mutado")
                    }, 3000)
                 }).catch(err => {
                   console.error(err)
                 })
        }
            }

           await db(this.client)
      }
    }

