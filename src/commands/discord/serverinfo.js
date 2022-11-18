const Command = require('../../structures/Command')
const { EmbedBuilder } = require('discord.js')
require('dotenv').config()

module.exports = class extends Command.dCommand {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            description: 'Exibe as informações do servidor'
        })
    }
    run = (bot, interaction) => {

        const Players = Object.keys(bot.players)
        const infoEmebed = new EmbedBuilder()
        .setTitle('Informações do Servidor')
        .setDescription(`Tps: *${bot.getTps()}*;\nNick: *${bot.username}*;\nIp: *${process.env['IP']}*;\nVersão: *${bot.version}*;\nSeed: *4030416628395652580*.`) 
        .addFields({
            name:'Players',
            value: Players.join(', ').split(',').length === 0 ? `O servidor está offline.` : `Players online: \`${Players.join(', ')}\` \nPossui ${Players.join(', ').split(',').lenght} online.` 

        })
        .setColor('Orange')
        .setTimestamp()
        
        interaction.reply({ content: '', embeds: [infoEmebed]})

    }
}


