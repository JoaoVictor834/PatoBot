const Command = require('../../structures/Command')
const { EmbedBuilder } = require('discord.js')
require('dotenv').config()

module.exports = class extends Command.dCommand {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            description: 'Saiba quantos players tem online no servidor'
        })
    }
    run = (bot, interaction) => {

        const infoEmebed = new EmbedBuilder()
        .setTitle('Informações do Servidor')
        .setDescription(`Tps: *${bot.getTps()}*;\nNick: *${process.env['NAME']}*;\nIp: *${process.env['IP']}*;\nVersão: *${process.env['VERSION']}*;\nSeed: *4030416628395652580*.`) 
        .addFields({
            name:'Players',
            value: `Players online: \`${Object.keys(bot.players).join(', ')}\`\nPossui ${Object.keys(bot.players).join(', ').split(',').length} Players online.`
        })
        .setColor('Orange')
        .setTimestamp()
        
        interaction.reply({ content: '', embeds: [infoEmebed]})

    }
}


