const Event = require('../../structures/Event')

module.exports = class extends Event.dEvent {
    constructor(client, bot) {
        super(client, bot, {
            name: 'messageCreate'
        })
    }
    
    run = (message) => {
      if(message.author.id === this.client.user.id) return
      if (/Você]/.test(message)) return
      if(message.content.startsWith('&') && message.author.id !== '990061390029012992') return message.reply('Se quiser usar cor compre apoiador boboca https://loja.anarkcraft.xyz')

      
     this.bot.chat(`${message.author.username}: ${message.content}`)
    }
}