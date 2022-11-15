const Command = require('../../structures/Command')

module.exports = class extends Command.mCommand {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'roi patobot',
        })
    }
    run = (username) => {

        this.bot.chat(`Oi ${username}, casada???`)

    }
}