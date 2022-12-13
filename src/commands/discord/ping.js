const Command = require('../../structures/Command')
const wait = require('node:timers/promises').setTimeout
const { EmbedBuilder } = require('discord.js')

module.exports = class extends Command.dCommand {
    constructor(client, ) {
        super(client, {
            name: 'ping',
            description: 'Comando para saber o ping do bot.'
        })
    }
    run = async (bot, interaction) => {

        const m =  await interaction.reply({ content: 'Ping?', fetchReply: true })
        const latency = Math.abs(m.createdTimestamp - interaction.createdTimestamp)

        const PingEmbed = new EmbedBuilder()
        .setTitle('Pong! :ping_pong:')
        .setDescription(`
        O meu ping é: ${Math.round(this.client.ws.ping)}ms.\nLatencia da API: ${latency}ms.
        `)
        .setColor('Random')



        await wait(500)
        await interaction.editReply({ content: ' ', embeds: [PingEmbed]})

    }
}
