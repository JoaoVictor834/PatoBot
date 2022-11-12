const Event = require('../../structures/Event')
const { ActivityType } = require('discord.js')

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



       // this.client.registryCommands()
        
        this.client.user.setPresence({
            activities: [{
                name: `Faça parte dos ${this.client.users.cache.size} usuarios que me utilizam, em mais de ${this.client.guilds.cache.size} servidores!`,
                type: ActivityType.Playing,
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            }
            ],
            status: 'online'
        })
    }
}