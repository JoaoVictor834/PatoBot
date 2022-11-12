const { Client } = require('discord.js')
const { readdirSync } = require('fs')
const { join } = require('path')
const Bot = require('./Bot')
const { createBot } = require('mineflayer')
require('dotenv').config()

//Export a class of client
module.exports = class extends Client {
    constructor(options) {
        super(options)
        this.chat
        this.cmd
        this.bot
        this.commands = []
        this.CreateBot().then(() => {
        this.loadEvents()
        this.loadCommands()
        })

    }

    updateChatPatern() {
        this.bot.addChatPattern('tell', / \[(.+) -> Você\] (.+)/, { parse: true, repeat: true })
        this.bot.addChatPattern('tell2', / \[Você -> (.+)\] (.+)/, { parse: true, repeat: true })
        this.bot.addChatPattern('death', /^\[☠] (\w*) (.*)/, { parse: true, repeat: true })
        this.bot.addChatPattern('advancement', /(.+) has made the advancement \[(.+)\]/, { parse: true, repeat: true })
     // this.bot.addChatPattern('joined', /(.+) Entrou no servidor/, { parse: true, repeat: true })
    }

     // Create the Minecraft bot
    async CreateBot() {
        const options = {
            username: process.env['NAME'],
            version: process.env['VERSION'],
            host: process.env['IP']
        }

        const CreatedBot = new Bot(createBot(options), this)
        this.bot = CreatedBot.bot
    
    }

    // Update/set chat
    updateChat(type) {
        if(type === 'chatbot') {
        return this.channels.cache.get('987517050274586649')
        } else if(type === 'chatcmd') {
            return this.channels.cache.get('1001581191578796042')
        }
    }

    // Register commands (temporary)
    async registryCommands() {
        console.log('Carregando comandos de barra (/)')

        await this.guilds.cache.get(process.env['GUILD_ID']).commands.set(this.commands)
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
                    const cmd = new (commandClass)(this, this.bot)

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
                    const evt = new (eventClass)(this, this.bot)
    
                    // Load the event
                    this.on(evt.name, evt.run)
                    console.log(`Evento discord-${evt.name} carregado!`)

            }

        }
    }
