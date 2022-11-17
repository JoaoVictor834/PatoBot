const Event = require('../../structures/Event')
const { EmbedBuilder } = require('discord.js')

module.exports = class extends Event.mEvent {
    constructor(bot, client, ebot) {
        super(bot, client, ebot, {
            name: 'chat:tell'
        })
        
    } 
    
    run = (matches) => {

        const msg = matches[0][1]
        const user = matches[0][0]

        const args = msg.slice(1).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        
        
        if (user === 'Vakinha_MuMu' || user === 'PatinhoQuack_' && command === 'chat') return this.bot.chat(args.join(' '))
        
        this.client.chat.send(`**(Tell) De -->** *${user}: ${msg.trim()}*`)
    }
}
