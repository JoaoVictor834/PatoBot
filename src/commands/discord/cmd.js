const Command = require('../../structures/Command')
const wait = require('node:timers/promises').setTimeout
const { PermissionsBitField } = require('discord.js');


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

    async autocomplete(interaction) {
        const focusedOption = interaction.options.getFocused(true)

        if (focusedOption.name !== 'comando') return
        if (/ +/g.test(focusedOption.value)) return await interaction.respond([{
            name: "Argumentos não aparecem aqui, utilize /serverinfo caso precise ver o nome de algum player.", value: "Argumentos não aparecem aqui, utilize /serverinfo caso precise ver o nome de algum player."
        }
        ])


        interaction.client.bot.tabComplete('/' + focusedOption.value.trim(), false, false).then(async tabComplete => {
            let choices = []

            if (!tabComplete) return

            tabComplete.forEach(complete => {
                choices.push(complete.match)
            })

            if (choices.length >= 25) choices = choices.slice(0, 24)
            const filtered = choices.filter(choices => choices.startsWith(focusedOption.value))
            if (!filtered) return
            await interaction.respond(
                filtered.map(choice => ({ name: choice, value: choice }))
            )
        }).catch(e => console.log(e))



    }

    run = async (bot, interaction) => {

        const command = interaction.options.getString('comando')

        if (command.startsWith('prefix') || command.startsWith('queue') || command.startsWith('ignore') || command.startsWith('party') && !interaction.user.member.permissions.has(PermissionsBitField.flags.Administrator) return interaction.reply({ content: 'Comando bloqueado :rage:', ephemeral: true })

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


