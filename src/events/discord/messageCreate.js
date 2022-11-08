const Event = require('../../structures/Event')

module.exports = class extends Event.dEvent {
    constructor(client, bot) {
        super(client, bot, {
            name: 'messageCreate'
        })
    }
    
    run = (message) => {
      if(message.author.id === this.client.user.id) return

     this.bot.chat(`${message.author.username}: ${message.content}`)
    }
}