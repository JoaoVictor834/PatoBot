const Event = require('../../structures/Event')

module.exports = class extends Event.dEvent {
    constructor(client, bot) {
        super(client, bot, {
            name: 'messageCreate'
        })
    }
    
    run = (message) => {
       console.log(this.bot)
        console.log('oi limda')
      //  this.bot.chat(`${message.author.username}: ${message.content}`)
    }
}