const Command = require('../../structures/Command')

module.exports = class extends Command.mCommand {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'help',
            aliases: ['ajuda', 'rcomo usa o patobot']
        })
    }
    run = () => {

        this.bot.chat(`Oi! eu sou o bot mais chad do mundo. Comandos disponíveis: -coords, -status, -coordleak e -dupe. Dê oi ao PatoBot!`)

    }
}