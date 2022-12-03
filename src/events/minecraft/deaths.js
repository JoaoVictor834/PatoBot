const Event = require('../../structures/Event')
const { EmbedBuilder } = require('discord.js')
const { death } = require('../../antispam')

module.exports = class extends Event.mEvent {
    constructor(bot, client, ebot) {
        super(bot, client, ebot, {
            name: 'chat:death'
        })
        
    } 
    
    run = async (matches) => {

        const reason = matches[0][1]
        const user = matches[0][0]

if(user === this.bot.username) return this.client.cmd.send(`> ${this.bot.username} ${this.ebot.filter.clean(reason.trim())} :( `)

await death(reason.trim(), user, this.ebot, this.client)

    	
    
           
    }
}
