const { readdirSync } = require('fs')
const { join } = require('path')

module.exports = class {
    constructor(bot, client) {
        this.bot = bot
        this.client = client
        this.commands = []
        //this.loadCommands()
        this.loadEvents()
    }


/*loadCommands(path = 'src/commands/minecraft') {

            const commands = readdirSync(path)

                for (const command of commands) {
                    const commandClass = require(join(process.cwd(), `${path}/${command}`))
                    const cmd = new (commandClass)(this.bot)

                    this.bot.commands.push(cmd)
                    console.log(`Comando ${cmd.name} carregado!`)
                }
        
    } */

    loadEvents(path = 'src/events/minecraft') {

            const events = readdirSync(path)

                for (const event of events) {
                    const eventClass = require(join(process.cwd(), `${path}/${event}`))
                    const evt = new (eventClass)(this.bot, this.client)
                    
                    
                    this.bot.on(evt.name, evt.run)
                    console.log(`Evento minecraft-${evt.name} carregado!`)

            }

        }
    }

    