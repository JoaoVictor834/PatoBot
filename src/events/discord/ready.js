const Event = require('../../structures/Event')
const { ActivityType } = require('discord.js')
const { createBot } = require('mineflayer')
const Bot = require('../../structures/Bot')

module.exports = class extends Event.dEvent {
    constructor(client) {
        super(client, {
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
                name: `Como dupa?`,
                type: ActivityType.Playing,
                url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            }
            ],
            status: 'online'
        })
    }
}
