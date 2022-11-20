const Event = require('../../structures/Event')
const { PREFIX } = require('../../../config')

module.exports = class extends Event.mEvent {
    constructor(bot, client, ebot) {
        super(bot, client, ebot, {
            name: 'chat'
        })
        
    } 
    
    run = (username, message) => {


        if(username === this.client.bot.username) return this.client.cmd.send(`> ${message}`)
        if(/\@/.test(message)) return
        this.client.chat.send(`${username}: ${message}`)
       
            const args = message.slice(PREFIX.lenght).trim().split(/ +/g);
            const command = args.shift().toLowerCase();

           


           const cmd = message.startsWith(PREFIX) ?

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
