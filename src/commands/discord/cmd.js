const Command = require('../../structures/Command')
const wait = require('node:timers/promises').setTimeout


module.exports = class extends Command.dCommand {
    constructor(client, bot) {
        super(client, bot, {
            name: 'cmd',
            description: 'Envie um comando para o servidor.',
            options: [
                {
                type: 3,
                name: 'comando',
                description: 'Comando que sera enviado.',
                required: true
                }
            ]
        })
    }
    run = async (interaction) => {

        const command = interaction.options.getString('comando')

        if(command.startsWith('prefix')) return interaction.reply({content: 'Prefix é coisa de gay!', ephemeral: true})

        console.log(command)
        await this.bot.chat('/' + command)
        await interaction.reply('Comando enviado.')
        await wait(1000)
        await interaction.deleteReply()

    }
}


