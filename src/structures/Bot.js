const { readdirSync } = require('fs')
const { join } = require('path')
const mineflayer = require('mineflayer')
const tpsPlugin = require('mineflayer-tps')(mineflayer)
const { ChatPatterns } = require('../../config')
const filterlist = require('../../filter.json').words
const Filter = require('badwords-filter')
const simplDb = require('simpl.db')
const pathfinder = require("mineflayer-pathfinder").pathfinder
const autoeat = require('mineflayer-auto-eat').plugin
const app = require('../../website/app')

// Create database
const database = new simplDb({
    dataFile: 'pfp/database.json',
    collectionsFolder: 'pfp'
})

// Load database
const db = database.getCollection('users') || database.createCollection('users')

// Configure the filter
const filterconfig = {
    list: filterlist,
    cleanWith: ['#', '@', '*', '!', '?', '$', '&'],
    useRegex: true,
}



// Export the bot class
module.exports = class {
    constructor(bot, client) {

        // Load plugins
        bot.loadPlugin(tpsPlugin)
        bot.loadPlugin(pathfinder)
        bot.loadPlugin(autoeat)
        // Set bot, client and commands
        this.bot = bot
        this.client = client
        this.commands = []


        // Variables to antispam
        this.db = db
        this.val = 0
        this.dcmsgs = []
        this.vald = 0
        this.dcmsgsD = []
        this.quantity = []
        this.quantityD = []
        this.isActive = true

        //autocomplete
        this.choices = []

        this.debounce = false


        // Load functions
        this.onLoad(client, bot, this, this.isActive)
        this.loadCommands()
        this.loadEvents()
        if (ChatPatterns) this.updateChatPatern()

        // Create the filter
        this.filter = new Filter(filterconfig)


    }

   async debounceFunction(ms) {
    setTimeout(() => {
        this.debounce = false
    }, ms)
    }


    // Value of message (antispam)
    getValue(type) {
        if (type === "chat") {
            return this.val

        } else {
            return this.vald
        }
    }

    // Anti Afk of bot
    onLoad(client, bot, ebot, isActive) {

        bot.once('spawn', () => {
            bot.once('spawn', async () => {
               
                
               app(bot, client)
                bot.once('spawn', async () => {
                    
                    function antiafk(isActive) {

                        if (!isActive) {
                            bot.setControlState('jump', false)
                            bot.setControlState('forward', false)
                            bot.setControlState('right', false)
                            bot.setControlState('back', false)
                            bot.setControlState('left', false)

                            return
                        } else {

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

                                    setTimeout(() => { antiafk(isActive) }, 1000)

                                }, 1000)
                            }, 1000)
                        }, 1000)
                    }


                }
                    setTimeout(() => { antiafk(isActive) }, 5000)
                })
         
                client.chat.send(`Bot conectado com sucesso <:check:1044704138203770900>`)
                
            })
        })

    }



    // Update the chat pattern of bot if exist
    updateChatPatern() {

        // Get all chat patterns
        ChatPatterns.forEach(Pattern => {

            // Verifiers
            if (!Pattern || !Pattern.name || !Pattern.regex) return

            // Verify if have options and load the pattern
            Pattern.options ? this.bot.addChatPattern(Pattern.name, new RegExp(Pattern.regex), Pattern.options)
                : this.bot.addChatPattern(Pattern.name, new RegExp(Pattern.regex))

        })

    }

    // Load the commands
    loadCommands(path = 'src/commands/minecraft') {

        const commands = readdirSync(path)

        for (const command of commands) {
            const commandClass = require(join(process.cwd(), `${path}/${command}`))
            const cmd = new (commandClass)(this.bot, this.client, this)

            this.commands.push(cmd)
            console.log(`Comando minecraft-${cmd.name} carregado!`)
        }

    }

    // Load the events
    loadEvents(path = 'src/events/minecraft') {

        // Get path of events
        const events = readdirSync(path)

        // Read a class of every event
        for (const event of events) {
            const eventClass = require(join(process.cwd(), `${path}/${event}`))
            const evt = new (eventClass)(this.bot, this.client, this)

            // Load the event
            this.bot.on(evt.name, evt.run)
            console.log(`Evento minecraft-${evt.name} carregado!`)

        }

    }
}


