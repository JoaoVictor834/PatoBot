const Command = require('../../structures/Command')

module.exports = class extends Command.mCommand {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'help',
            aliases: ['ajuda']
        })
    }
    run = () => {

        this.bot.chat(`Comandos disponíveis: -coords, -status, -coordleak e -dupe. Dê oi ao PatoBot!`)

    }
}