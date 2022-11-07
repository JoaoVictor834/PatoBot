const Event = require('../../structures/Event')

module.exports = class extends Event.mEvent {
    constructor(bot, client) {
        super(bot, client, {
            name: 'chat'
        })
    }
    
    run = (username, message) => {
        this.client.chat.send(`${username} -> ${message}`)
    }
}