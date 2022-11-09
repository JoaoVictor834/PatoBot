const Command = require('../../structures/Command')
const wait = require('node:timers/promises').setTimeout
const { EmbedBuilder } = require('discord.js')

module.exports = class extends Command.dCommand {
    constructor(client, bot) {
        super(client, bot, {
            name: 'ping',
            description: 'Comando para saber o ping do bot.'
        })
    }
    run = async (interaction) => {
        const latency = Math.abs(Date.now() - interaction.createdTimestamp)

        const PingEmbed = new EmbedBuilder()
        .setTitle('Pong! :ping_pong:')
        .setDescription(`
        O meu ping é: ${Math.round(this.client.ws.ping)}ms. \n
        Latencia da API: ${latency}ms.
        `)
        .setColor('Random')
        await interaction.reply('Ping?')
        await wait(1000)
        await interaction.editReply({ content: ' ', embeds: [PingEmbed]})

    }
}