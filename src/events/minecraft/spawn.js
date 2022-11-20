const Event = require('../../structures/Event')
const wait = require('node:timers/promises').setTimeout

module.exports = class extends Event.mEvent {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'spawn'
        })
    }

    run = async () => {

        await wait(1000)
        await this.bot.chat('/queue anarkcraft')

        this.client.cmd.send('> Spawnado')
        console.log('Spawnado')
       

    }
}
