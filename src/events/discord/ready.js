const Event = require('../../structures/Event')
const { ActivityType } = require('discord.js')
const { createBot } = require('mineflayer')
const Bot = require('./Bot')

module.exports = class extends Event.dEvent {
    constructor(client, bot) {
        super(client, bot, {
            name: 'ready'
        })
    }
    
    run = () => {


        console.log(`Bot logado!`)
        this.client.chat = this.client.updateChat('chatbot')
        this.client.cmd = this.client.updateChat('chatcmd')


        // Create the Minecraft bot
        const CreatedBot = new Bot(createBot({
            username: process.env['NOME'],
            version: process.env['VERSION'],
            host: process.env['IP']
           }), this.client)
    
           this.client.updateBot(CreatedBot.bot)

           this.client.loadCommands()
       

        //this.client.registryCommands()
        
        this.client.user.setPresence({
            activities: [{
                name: `Patobot chad`,
                type: ActivityType.Playing,
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            }
            ],
            status: 'online'
        })
    }
}