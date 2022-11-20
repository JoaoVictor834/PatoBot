const { Client } = require('discord.js')
const { readdirSync } = require('fs')
const { join } = require('path')
const Bot = require('./Bot')
const { createBot } = require('mineflayer')
const { NAME, IP, VERSION, CHATBOT, CMDBOT, GUILD_ID, LOGIN } = require('../../config')
const AutoAuth = require('mineflayer-auto-auth')

//Export a class of client
module.exports = class extends Client {
    constructor(options) {
        super(options)
        this.chat
        this.cmd
        this.commands = []

           this.bot
           this.loadEvents()
           this.loadCommands()
           this.botCreate()

    
    }

   botCreate() {
const options = {
         plugins: [AutoAuth],
         AutoAuth: LOGIN,
         username: NAME,
         version: VERSION,
         host: IP
}

        const CreatedBot = new Bot(createBot(options), this)
        return this.bot = CreatedBot.bot

}

    // Update/set chat
    updateChat(type) {
        if(type === 'chatbot') {
        return this.channels.cache.get(CHATBOT)
        } else if(type === 'chatcmd') {
            return this.channels.cache.get(CMDBOT)
        }
    }

    // Register commands (temporary)
    async registryCommands() {
        console.log('Carregando comandos de barra (/)')

        this.guilds.cache.get(GUILD_ID).commands.set([])

        await this.application.commands.set(this.commands)
            .catch(error => console.log(error))

        console.log('Comandos de barra (/) carregados com sucesso!')
    }


    // Load commands
    loadCommands(path = 'src/commands/discord') {

        // Get path of commands
            const commands = readdirSync(path)

            // Get a event of every command
                for (const command of commands) {
                    const commandClass = require(join(process.cwd(), `${path}/${command}`))
                    const cmd = new (commandClass)(this)

                    // Load the command
                    this.commands.push(cmd)
                    console.log(`Comando discord-${cmd.name} carregado!`)
                }
        
    }

    // Load events
    loadEvents(path = 'src/events/discord') {

        // Get path of events
            const events = readdirSync(path)

            // Get a event of every event
                for (const event of events) {
                    const eventClass = require(join(process.cwd(), `${path}/${event}`))
                    const evt = new (eventClass)(this)
    
                    // Load the event
                    this.on(evt.name, evt.run)
                    console.log(`Evento discord-${evt.name} carregado!`)

            }

        }
    }
