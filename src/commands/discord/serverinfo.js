const Command = require('../../structures/Command')
const { EmbedBuilder } = require('discord.js')
require('dotenv').config()

module.exports = class extends Command.dCommand {
    constructor(client, bot) {
        super(client, bot, {
            name: 'serverinfo',
            description: 'Saiba quantos players tem online no servidor'
        })
    }
    run = (interaction) => {

        const infoEmebed = new EmbedBuilder()
        .setTitle('Informações do Servidor')
        .setDescription(`Tps: *${this.bot.getTps()}*;\nNick: *${process.env['NAME']}*;\nIp: *${process.env['IP']}*;\nVersão: *${process.env['VERSION']}*;\nSeed: *4030416628395652580*.`) 
        .addFields({
            name:'Players',
            value: `Players online: \`${Object.keys(this.bot.players).join(', ')}\`\nPossui ${Object.keys(this.bot.players).join(', ').split(',').length} Players online.`
        })
        .setColor('Orange')
        .setTimestamp()
        
        interaction.reply({ content: '', embeds: [infoEmebed]})

    }
}


