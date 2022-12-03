const { readdirSync } = require('fs')
const { join } = require('path')
const mineflayer = require('mineflayer')
const tpsPlugin = require('mineflayer-tps')(mineflayer)
const { ChatPatterns } = require('../../config')
const filterlist = require('../../filter.json')
const Filter = require('badwords-filter')
const simplDb = require('simpl.db')

const database = new simplDb({
    dataFile: 'pfp/database.json',
    collectionsFolder: 'pfp'
})

const db = database.getCollection('users') || database.createCollection('users')

const filterconfig = {
    list: filterlist.words,
    cleanWith: ['#', '@', '*', '!', '?', '$', '&', '%'],
    useRegex: true,
  }
  
  const quantity = {
	"1": 1,
	"2": 1,
	"3": 1,
	"4": 1,
	"5": 1,
	"6": 1,
	"7": 1,
	"8": 1,
	"9": 1,
	"10": 1
	}
	
 
let val = 0
let dcmsgs = []

const quantityD = {
	"1": 1,
	"2": 1,
	"3": 1,
	"4": 1,
	"5": 1,
	"6": 1,
	"7": 1,
	"8": 1,
	"9": 1,
	"10": 1
	}
	
 
let vald = 0
let dcmsgsD = []
  
  
  // Exporta a classe do bot  
  module.exports = class {
      constructor(bot, client) {
        this.bot = bot
        this.client = client
        this.commands = []
        this.db = db
this.val = val
this.quantity = quantity
this.dcmsgs = dcmsgs
this.vald = vald
this.quantityD = quantityD
this.dcmsgsD = dcmsgsD

        this.loadCommands()
        this.loadEvents() 

        if(ChatPatterns) this.updateChatPatern()

        
        bot.loadPlugin(tpsPlugin)
        //radarPlugin(this.bot)
        
         this.filter = new Filter(filterconfig)

         // Anti afk
         bot.once('spawn', () => {
            bot.once('spawn' , () => {
                bot.once('spawn' , () => {
                    function antiafk() {
                 
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

                            setTimeout(antiafk, 1000)
    
                        }, 1000)
                    }, 1000)
                }, 1000)
                    }

                    setTimeout(antiafk, 5000)
client.chat.send(`Bot conectado com sucesso <:check:1044704138203770900>`)

        })
        })
         })
    }
    
    getValue(type) {
    	if(type === "chat") {
    	return this.val
    
    } else {
    	return this.vald
    }
    }
    
    
    

    updateChatPatern() {
        
        ChatPatterns.forEach(Pattern => {
           if(!Pattern || !Pattern.name || !Pattern.regex) return

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

    
