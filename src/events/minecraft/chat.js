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
        
        

        let cmd

        if(message.startsWith(prefix)) {
            const args = message.slice(1).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            
            try {
             cmd = 
            this.ebot.commands.find(c => c.name === command) || 
            this.ebot.commands.find(c => c.aliases.find(a => a === command))

            } catch (err) {
                console.log(err)
            }
 
        }
            else {
                try {
                cmd = 
                this.ebot.commands.find(c => c.aliases.map(a => a.find(r => r.test(message)))) ||
                this.ebot.commands.find(c => c.name.map(n => n.find(r => r.test(message))))
                } catch (err) {
                    console.log(err)
                }
                
            }
        
        
        if(cmd) return cmd.run(username, message, args).catch(error => console.log(error))


        this.client.chat.send(`${username}: ${this.ebot.filter.clean(message)}`)

    }
}