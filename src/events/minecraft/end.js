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

        function relog(client) {
console.log('Reconnecting...')
client.chat.send('Reconectando...')

           const BOT = new Bot(createBot({
                username: process.env['NAME'],
                version: process.env['VERSION'],
                host: process.env['IP']
            }), client)
            client.bot = BOT
        }


        setTimeout(relog, 35000, this.client)

    }
}
