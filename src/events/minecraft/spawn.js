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
            this.ebot.choices = []
                      
            complete.forEach(cmd => {

            
                 this.ebot.choices.push(
                     cmd.match
                 )
            })
            })

            if(this.client.cmd)

        this.client.cmd.send('> Spawnado')
        
       

    }
}
