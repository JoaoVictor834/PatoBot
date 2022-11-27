const Event = require('../../structures/Event')
const { CHATBOT } = require('../../../config')

module.exports = class extends Event.dEvent {
    constructor(client) {
        super(client, {
            name: 'messageCreate'
        })
    }
    
    run = (message) => {
      if(message.channel.id !== CHATBOT) return

      if(message.author.id === this.client.user.id) return
      if(message.webhookId) return
      if(message.content.lenght > 240) return
      if(/\n/.test(message)) return

      if(message.content.startsWith('&') && message.author.id !== '990061390029012992') return message.reply('Se quiser usar cor compre apoiador boboca https://loja.anarkcraft.xyz')
      message.client.bot.chat(`${message.author.username}: ${message}`)
    }
}
