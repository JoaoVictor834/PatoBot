const Command = require('../../structures/Command')
const { EmbedBuilder } = require('discord.js')
const { IP } = require('../../../config')

module.exports = class extends Command.dCommand {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            description: 'Exibe as informações do servidor'
        })
    }
    run = (bot, interaction) => {
        const playerlist = bot.tablist.footer.text.replace(/\§(.)/gmi, '').match(/Players Online: [0-9]+/)
        const queuelist = bot.tablist.footer.text.replace(/\§(.)/gmi, '').match(/Na Fila: [0-9]+/)

        const infoEmebed = new EmbedBuilder()
        .setTitle('Informações do Servidor')
        .setDescription(`Tps: *${bot.getTps()}*;\nNick: *${bot.username}*;\nIp: *${IP}*;\nVersão: *${bot.version}*;\nSeed: *4030416628395652580*.`) 
        .addFields({
            name:'Players',
            value: `\`${Object.keys(bot.players).join(', ')}\`\n${playerlist ? playerlist[0] : ''}\n${queuelist ? queuelist[0] : ''}`  || `\`${Object.keys(bot.players).join(', ')}\``

        })
        .setColor('Orange')
        .setTimestamp()
        
        interaction.reply({ content: '', embeds: [infoEmebed]})

    }
}


