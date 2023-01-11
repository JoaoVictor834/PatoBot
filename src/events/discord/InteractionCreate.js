const Event = require('../../structures/Event')
const { InteractionType } = require('discord.js')

module.exports = class extends Event.dEvent {
    constructor(client) {
        super(client, {
            name: 'interactionCreate'
        })
    }
    run = async (interaction) => {

        if (interaction.type === InteractionType.ApplicationCommand) {
            const cmd = this.client.commands.find(c => c.name === interaction.commandName)
            if (cmd) cmd.run(interaction.client.bot, interaction)
        } else if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
            const cmd = this.client.commands.find(c => c.name === interaction.commandName)
            if (!cmd) return
            try {
                await cmd.autocomplete(interaction, interaction.client.ebot)
            } catch (error) {
                console.error(error)
            }

        }
    }
}
