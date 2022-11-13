const Event = require('../../structures/Event')

module.exports = class extends Event.dEvent {
    constructor(client, bot) {
        super(client, bot, {
            name: 'messageCreate'
        })
    }
    
    run = (message) => {
      if(message.author.id === this.client.user.id) return
      if(message.content.startsWith('&') && (message.author.id !== '990061390029012992' || message.author.id !== '367751573067137034')) return message.reply('Se quiser usar cor compre apoiador boboca https://loja.anarkcraft.xyz')
     this.bot.chat(`&o${message.author.username}: &r${message.content}`)
    }
}