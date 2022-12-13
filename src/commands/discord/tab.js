const Command = require('../../structures/Command')
const { EmbedBuilder } = require('discord.js')

module.exports = class extends Command.dCommand {
    constructor(client) {
        super(client, {
            name: 'tab',
            description: 'Veja o tab do bot!',
        
        })
    }

    run = async (bot, interaction) => {
        const tabEmbed = new EmbedBuilder()
        .setTitle('TAB')
        .setDescription(`${bot.tablist.header.text.replace(/\§(.)/gmi, '')}\n${bot.tablist.footer.text.replace(/\§(.)/gmi, '')}`.trim())

        .setColor('Blue')
        .setTimestamp()

        interaction.reply({ embeds: [tabEmbed] })


    }

}


