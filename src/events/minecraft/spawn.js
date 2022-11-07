const Event = require('../../structures/Event')
const wait = require('node:timers/promises').setTimeout

module.exports = class extends Event.mEvent {
    constructor(bot, client) {
        super(bot, client, {
            name: 'spawn'
        })
    }

    run = async () => {

        function antiafk(bot) {
            bot.setControlState('jump', true)

            bot.setControlState('left', false)
            bot.setControlState('forward', true)
            setTimeout(() => {
                bot.setControlState('forward', false)
                bot.setControlState('right', true)
                setTimeout(() => {
                    bot.setControlState('right', false)
                    bot.setControlState('back', true)
                    setTimeout(() => {
                        bot.setControlState('back', false)
                        bot.setControlState('left', true)

                    }, 1000)
                }, 1000)
            }, 1000)
        }

        await this.bot.chat('/login oigostosarsssnaovaiverasenhanao')
        await wait(1000)
        await this.bot.chat('/queue anarkcraft')
        
        this.client.chat.send('Spawnado')
        console.log('Spawnado')
        antiafk(this.bot)

    }
}