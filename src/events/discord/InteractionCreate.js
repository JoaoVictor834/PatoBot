const Event = require('../../structures/Event')
const { InteractionType } = require('discord.js')

module.exports = class extends Event.dEvent {
    constructor(client, bot) {
        super(client, bot, {
            name: 'interactionCreate'
        })
    }
    run = (interaction) => {
        console.log(this.bot)
       if (interaction.type === InteractionType.ApplicationCommand) {
            const cmd  = this.client.commands.find(c => c.name === interaction.commandName)
            if (cmd) cmd.run(interaction)
       }
    }
}