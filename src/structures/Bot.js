const { readdirSync } = require('fs')
const { join } = require('path')
const mineflayer = require('mineflayer')
var tpsPlugin = require('mineflayer-tps')(mineflayer)
const filterlist = require('../../filter.json')
const Filter = require('badwords-filter')


const filterconfig = {
    list: filterlist.words,
    cleanWith: "#",
    useRegex: true,
  }

  
  
  // Exporta a classe do bot  
  module.exports = class {
      constructor(bot, client) {
        this.bot = bot
        this.client = client
        this.commands = []
        this.loadCommands()
        this.loadEvents() 
        this.updateChatPatern()
        
        bot.loadPlugin(tpsPlugin)
        
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

        })
        })
         })
    }

    updateChatPatern() {
        this.bot.addChatPattern('tell', / \[(.+) -> Você\] (.+)/, { parse: true, repeat: true })
        this.bot.addChatPattern('tell2', / \[Você -> (.+)\] (.+)/, { parse: true, repeat: true })
        this.bot.addChatPattern('death', /^\[☠] (\w*) (.*)/, { parse: true, repeat: true })
        this.bot.addChatPattern('advancement', /(.+) has made the advancement \[(.+)\]/, { parse: true, repeat: true })
       // this.bot.addChatPattern('joined', /(.+) Entrou no servidor/, { parse: true, repeat: true })
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

    