const Command = require('../../structures/Command')
const wait = require('node:timers/promises').setTimeout


module.exports = class extends Command.dCommand {
    constructor(client) {
        super(client, {
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
    run = async (bot, interaction) => {

        const command = interaction.options.getString('comando')

        if(command.startsWith('prefix') && interaction.user.id !== '990061390029012992') return interaction.reply({content: 'Prefix é coisa de gay!', ephemeral: true})

        console.log(command)
        await bot.chat('/' + command)
        await bot.once('message', message => {
const msg = message.toString()


        if(msg === '') return
        if(msg === ' ') return
        interaction.reply(msg)
        
})
        await wait(1000)
        await interaction.deleteReply()

    }
}


