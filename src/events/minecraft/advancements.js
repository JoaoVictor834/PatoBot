const Event = require('../../structures/Event')
const { EmbedBuilder } = require('discord.js')

module.exports = class extends Event.mEvent {
    constructor(bot, client, ebot) {
        super(bot, client, ebot, {
            name: 'chat:advancement'
        })
        
    } 
    
    run = (matches) => {

        const user = matches[0][0]
        const adv = matches[0][1]

        const AdvEmbed = new EmbedBuilder()
          .setDescription(`O jogador *${user}* adquiriu a conquista **${adv.trim()}**!`)
          .setColor('5005ff')
        this.client.chat.send({ embeds: [AdvEmbed] })

    }
}