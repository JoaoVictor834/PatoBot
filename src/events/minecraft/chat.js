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
        
        let reg = /oi patobot/i

        if(reg.test(message)) return this.bot.chat(`Oi ${username} voce é casada??`)

        if(message.startsWith(prefix)) {
            const cmd = this.ebot.commands.find(c => c.name === message.slice(1)) || this.ebot.commands.find(c => c.aliases === message.slice(1))
            if(cmd) return cmd.run(message, username)
        }



        this.client.chat.send(`${username}: ${message}`)

    }
}