const Command = require('../../structures/Command')

module.exports = class extends Command.mCommand {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'coordleak',
            aliases: ['leak']
        })
    }
    run = (_, i, args) => {

if(!args[0]) return this.bot.chat(`Me fale de quem você quer as cordenadas!`)


        this.bot.chat(`Cordenadas de ${args[0]}: ${Math.round(Math.random() * 130308)}, ${Math.round(Math.random() * 40380)}`)

    }
}
