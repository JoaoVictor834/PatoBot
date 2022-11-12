const Command = require('../../structures/Command')
const { EmbedBuilder } = require('discord.js')

module.exports = class extends Command.dCommand {
    constructor(client, bot) {
        super(client, bot, {
            name: 'status',
            description: 'Status atuais do bot.'
        })
    }
    run = async (interaction) => {
        const m =  await interaction.reply({ content: 'Carregando...', fetchReply: true })
        const latency = Math.abs(m.createdTimestamp - interaction.createdTimestamp)

        const statusEmbed = new EmbedBuilder()
        .setTitle('Status do Bot')
        .setDescription(`O Bot está com:\n🍖 ${Math.round(this.bot.food / 2)}  pernis de comida;\n♥️ ${Math.round(this.bot.health / 2)} corações de vida;\n✳️ ${Math.round(this.bot.experience.level)} leveis de XP;\n⚙️ ${this.bot.players.PatoBot.ping}ms`)
        .addFields({
            name:'Status do Discord',
            value: `⌛ Latência: ${latency}ms;\n⏳ Latência da API: ${Math.round(this.client.ws.ping)}ms.`
        })
        .setColor('Blue')
        .setTimestamp()
       await interaction.editReply({ content: '', embeds: [statusEmbed]})

    }
}


