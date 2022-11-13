const Command = require('../../structures/Command')

module.exports = class extends Command.mCommand {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'coordleak',
            aliases: ['leak']
        })
    }
    run = (_, i, args) => {

        this.bot.chat(`Cordenadas de ${args[0]}: ${Math.round(Math.random() * 130308)}, ${Math.round(Math.random() * 40380)}`)

    }
}