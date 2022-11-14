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
        if(username === this.bot.username) return
        
        
       
            const args = message.slice(1).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            
            const cmd = message.startsWith(prefix) ?
            
            this.ebot.commands.find(c => c.name === command) ||
            this.ebot.commands.find(c => c.aliases.find(a => a === command)) :
            this.ebot.commands.forEach(c => c.aliases.find(a => a.test(message))) || 
            this.ebot.commands.forEach(c => c.name.find(n => n.test(message)))

            if(cmd) return cmd.run(username, message, args)
        



        this.client.chat.send(`${username}: ${this.ebot.filter.clean(message)}`)

    }
}