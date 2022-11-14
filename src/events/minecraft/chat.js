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

            
            
            
                this.ebot.commands.forEach(c => {
if(c.aliases === undefined) return false

c.aliases.forEach(a => console.log(a))
} )
            
            
            const cmd =  message.startsWith(prefix) ?
            
            this.ebot.commands.forEach(c => {
if(c.aliases === undefined) return false
c.aliases.find(a => a.test(message))
} ) || 
            this.ebot.commands.find(c => c.name.test(message)) :
            
            this.ebot.commands.find(c => c.name === command) ||
            
            this.ebot.commands.forEach(c => {
            if(c.aliases === undefind) return false
c.aliases.find(a => a === command)
})
            

            if(cmd) return cmd.run(username, message, args)
        



        this.client.chat.send(`${username}: ${this.ebot.filter.clean(message)}`)

}

}
