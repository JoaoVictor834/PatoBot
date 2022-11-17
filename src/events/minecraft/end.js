const Event = require('../../structures/Event')
const Bot = require('../../structures/Bot')
const { createBot } = require('mineflayer')
require('dotenv').config()

module.exports = class extends Event.mEvent {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'end'
        })
    }
    
    run = (reason) => {
        console.log('Reconectando ' + reason)

        async function relog(client) {

console.log('Reconnecting...')
client.chat.send('Reconectando...')

          return new Bot(createBot({
                username: process.env['NAME'],
                version: process.env['VERSION'],
                host: process.env['IP']
            }), client)

        }


        setTimeout(() => {

relog(this.client).then(CreatedBot => {
this.client.updateBot(CreatedBot.bot).then(() =>
this.client.loadCommands()
this.loadEvents()

this.client.chat.send('Reconectado com sucesso!')
})
})

    }, 35000)
}
}
