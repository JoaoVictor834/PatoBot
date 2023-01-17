const Event = require('../../structures/Event')
const wait = require('node:timers/promises').setTimeout

module.exports = class extends Event.mEvent {
    constructor(bot, client, ebot) {
        super(bot, client, ebot, {
            name: 'spawn'
        })
    }

    run = async () => {

        await wait(1000)
        await this.bot.chat('/queue anarkcraft')

        await this.bot.tabComplete('/').then(complete => {
                      
            complete.forEach(cmd => {

                this.ebot.choices = []
            
                 this.ebot.choices.push(
                     cmd.match
                 )
            })
            })

        this.client.cmd.send('> Spawnado')
        
       

    }
}
