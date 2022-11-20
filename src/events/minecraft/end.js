const Event = require('../../structures/Event')
const Bot = require('../../structures/Bot')
const { createBot } = require('mineflayer')
const { NAME, VERSION, IP, LOGIN } = require('../../../config')
const AutoAuth = require('mineflayer-auto-auth')

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
                plugins: [AutoAuth],
                AutoAuth: LOGIN,
                username: NAME,
                version: VERSION,
                host: IP
            }), client)

          client.bot = CreatedBot.bot
        }


        setTimeout(() => {
            relog(this.client)
        }, 31000)
}
}

