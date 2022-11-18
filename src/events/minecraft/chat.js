const Event = require('../../structures/Event')
require('dotenv').config()
const prefix = process.env['PREFIX']

module.exports = class extends Event.mEvent {
    constructor(bot, client, ebot) {
        super(bot, client, ebot, {
            name: 'chat'
        })
        
    } 
    
    run = (username, message) => {


        if(username === this.bot.username) return this.client.cmd.send(`> ${message}`)
        
        this.client.chat.send(`${username}: ${message}`)
       
            const args = message.slice(1).trim().split(/ +/g);
            const command = args.shift().toLowerCase();

           


           const cmd = message.startsWith(prefix) ?

            this.ebot.commands.find(c => c.name === command) ||
            this.ebot.commands.find(c => { 
if(c.aliases === undefined) return false

return c.aliases.find(a => a === command)
}) :

            this.ebot.commands.find(c => {
if(c.aliases === undefined) return false

return c.aliases.find(a => {
    if(!a.startsWith('r')) return false

    return new RegExp(a.slice(1), 'i').test(message)
})
}) ||
            this.ebot.commands.find(c => {
                if(!c.name.startsWith('r')) return false
                return new RegExp(c.name.slice(1), 'i').test(message)
            })

            if(cmd) cmd.run(username, message, args)





    }
}
