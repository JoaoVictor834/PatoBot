const Command = require('../../structures/Command')
const { EmbedBuilder } = require('discord.js')

module.exports = class extends Command.dCommand {
    constructor(client) {
        super(client, {
            name: 'status',
            description: 'Status atuais do bot.'
        })
    }
    run = async (bot, interaction) => {
        const m =  await interaction.reply({ content: 'Carregando...', fetchReply: true })
        const latency = Math.abs(m.createdTimestamp - interaction.createdTimestamp)

        const statusEmbed = new EmbedBuilder()
        .setTitle('Status do Bot')
        .setDescription(`O Bot está com:\n🍖 ${Math.round(bot.food / 2)} pernis de comida;\n♥️ ${Math.round(bot.health / 2)} corações de vida;\n✳️ ${Math.round(bot.experience.level)} leveis de XP;\n⚙️ ${bot.players[bot.username].ping}ms` + `\n:skull_crossbones: ${bot.tablist.footer.text.replace(/\§(.)/gmi, '').match(/Mortes: [0-9]*/) ? bot.tablist.footer.text.replace(/\§(.)/gmi, '').match(/Mortes: [0-9]*/)[0] : ''}` || ``)
        .addFields({
            name:'Cordenadas do Bot',
            value:`X: ${Math.round(bot.entity.position.x)};\nY: ${Math.round(bot.entity.position.y)};\nZ: ${Math.round(bot.entity.position.z)}.`
        })
        .addFields({
            name:'Status do Discord',
            value: `⌛ Latência: ${latency}ms;\n⏳ Latência da API: ${Math.round(this.client.ws.ping)}ms.`
        })
        .setColor('Blue')
        .setTimestamp()
       await interaction.editReply({ content: '', embeds: [statusEmbed]})

    }
}


