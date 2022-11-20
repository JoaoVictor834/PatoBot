const Event = require('../../structures/Event')
const Bot = require('../../structures/Bot')
const { createBot } = require('mineflayer')
const { NAME, VERSION, IP } = require('../../../config')

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
client.chat.send('Reconectando ⏳')

          const CreatedBot = new Bot(createBot({
                username: 'NAME',
                version: 'VERSION',
                host: 'IP'
            }), client)

          client.bot = CreatedBot.bot
        }


        setTimeout(() => {
            relog(this.client)
        }, 31000)
}
}

