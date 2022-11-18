const Event = require('../../structures/Event')
const { EmbedBuilder } = require('discord.js')

module.exports = class extends Event.mEvent {
    constructor(bot, client, ebot) {
        super(bot, client, ebot, {
            name: 'chat:death'
        })
        
    } 
    
    run = (matches) => {

        const reason = matches[0][1]
        const user = matches[0][0]

if(user === this.bot.username) return this.client.cmd.send(`> ${this.bot.username} ${this.ebot.filter.clean(reason.trim())} :( `)

        const DeathEmbed = new EmbedBuilder()
          .setDescription(`*${user}* ${this.ebot.filter.clean(reason.trim())}!`)
          .setColor('FF0000')

          this.client.chat.send({ embeds: [DeathEmbed] })

    }
}
