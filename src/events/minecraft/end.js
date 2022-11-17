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

           new Bot(createBot({
                username: process.env['NAME'],
                version: process.env['VERSION'],
                host: process.env['IP']
            }), client)

            client.CreateBot(BOT.bot)
        }


        setTimeout(() => {
relog(this.client).then(() => {
this.client.chat.send('Reconectado com sucesso!')
})

    }, 35000)
}
