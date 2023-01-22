const Event = require('../../structures/Event')
const Bot = require('../../structures/Bot')
const { createBot } = require('mineflayer')
const { NAME, VERSION, IP, LOGIN } = require('../../../config')
const AutoAuth = require('mineflayer-auto-auth')
const { killPortProcess } = require('kill-port-process')

module.exports = class extends Event.mEvent {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'end'
        })
    }
    
    run = async (reason) => {
        console.log('Reconectando ' + reason)

       await killPortProcess(80)

         function relog(client) {

console.log('Reconnecting...')
client.chat.send('Reconectando <a:load:1044704168159498340>')

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