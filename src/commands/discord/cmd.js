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

        if(command.startsWith('prefix') || command.startsWith('queue') || command.startsWith('ignore') && interaction.user.id !== '990061390029012992') return interaction.reply({content: 'Comando bloqueado :rage:', ephemeral: true})

        

        if(command.startsWith('tell')) {
           let message = `${command} (Enviado por ${interaction.user.username})`
            await bot.chat('/' + message)
            await bot.once('message', message => {
                const msg = message.toString()
             
        
                if(msg === '') return
                if(msg === ' ') return
                if(/Você]/.test(msg)) return 
                interaction.reply(msg)
                
        })
                await wait(20000)
                await interaction.deleteReply()

                return
        }

        await bot.chat('/' + command)
        await bot.once('message', message => {
        const msg = message.toString()
     

        if(msg === '') return
        if(msg === ' ') return
        if(/Você]/.test(msg)) return 
        interaction.reply(msg)
        
})
        await wait(20000)
        await interaction.deleteReply()

    }
}


