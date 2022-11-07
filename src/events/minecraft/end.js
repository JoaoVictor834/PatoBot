const Event = require('../../structures/Event')
const Bot = require('../../structures/Bot')
const { createBot } = require('mineflayer')

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
                username: 'PatoBot',
                version: '1.16.5',
                host: 'Patobot.aternos.me'
            }), client)

        }


        setTimeout(relog, 40000, this.client)

    }
}