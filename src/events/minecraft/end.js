const Event = require('../../structures/Event')
const Bot = require('../../structures/Bot')
const { createBot } = require('mineflayer')
require('dotenv').config()

module.exports = class extends Event.mEvent {
    constructor(bot, client) {
        super(bot, client, {
            name: 'end'
        })
    }
    
    run = (reason) => {
        console.log('Reconectando ' + reason)

        function relog(client) {
console.log('Reconnecting...')
            new Bot(createBot({
                username: process.env['NAME'],
                version: process.env['VERSION'],
                host: process.env['IP']
            }), client)

        }


        setTimeout(relog, 40000, this.client)

    }
}