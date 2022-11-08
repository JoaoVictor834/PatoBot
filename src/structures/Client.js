const { Client } = require('discord.js')
const { readdirSync } = require('fs')
const { join } = require('path')

//Export
module.exports = class extends Client {
    constructor(options) {
        super(options)
        this.chat
        this.commands = []
        this.loadCommands()
        this.loadEvents()
    }




    //Update/set chat
    updateChat() {
        return this.channels.cache.get('987517050274586649')
    }

    //Register commands
    async registryCommands() {
        console.log('Carregando comandos de barra (/)')

        await this.guilds.cache.get('987517049448325222').commands.set(this.commands)
            .catch(error => console.log(error))

        console.log('Comandos de barra (/) carregados com sucesso!')
    }

    //Load commands
    loadCommands(path = 'src/commands/discord') {

            const commands = readdirSync(path)

                for (const command of commands) {
                    const commandClass = require(join(process.cwd(), `${path}/${command}`))
                    const cmd = new (commandClass)(this)

                    this.commands.push(cmd)
                    console.log(`Comando discord-${cmd.name} carregado!`)
                }
        
    }

    //Load events
    loadEvents(path = 'src/events/discord') {
console.log(this.bot)
            const events = readdirSync(path)

                for (const event of events) {
                    const eventClass = require(join(process.cwd(), `${path}/${event}`))
                    const evt = new (eventClass)(this, this.bot)
    
                    this.on(evt.name, evt.run)
                    console.log(`Evento discord-${evt.name} carregado!`)

            }

        }
    }
