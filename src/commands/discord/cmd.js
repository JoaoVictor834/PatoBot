const Command = require('../../structures/Command')
const wait = require('node:timers/promises').setTimeout
const { PermissionsBitField } = require('discord.js')


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
                    required: true,
                    autocomplete: true
                }
            ]
        })
    }

    async autocomplete(interaction, ebot) {
        const focusedOption = interaction.options.getFocused(true)
        if (focusedOption.name !== 'comando') return

        

        let choices = [...ebot.choices]



        
        let filtered = choices.filter(choices => choices.startsWith(focusedOption.value))
        if(!filtered) return 
        if (filtered.length >= 25) filtered = filtered.slice(0, 24)
            await interaction.respond(
                filtered.map(choice => ({ name: choice, value: choice }))
            )

    }

    run = async (bot, interaction) => {

        const command = interaction.options.getString('comando')

        const bancmds = [
            "ignore", "party", "queue", "prefix"
        ]

        if (bancmds.find(msg => { msg.startsWith(command) }) && !interaction.user.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({ content: 'Comando bloqueado :rage:', ephemeral: true })

        if (command.startsWith('tell')) {
            let message = `${command} (Enviado por ${interaction.user.username})`
            await bot.chat('/' + message)
            await bot.once('message', message => {
                const msg = message.toString()


                if (msg === '') return
                if (msg === ' ') return
                if (/Você]/.test(msg)) return
                interaction.reply(msg)

            })
            await wait(20000)
            await interaction.deleteReply()

            return
        }

        await bot.chat('/' + command)
        await bot.once('message', message => {
            const msg = message.toString()

            if (msg === '') return
            if (msg === ' ') return
            if (/Você]/.test(msg)) return
            interaction.reply(msg)

        })
        await wait(20000)
        await interaction.deleteReply()

    }
}


