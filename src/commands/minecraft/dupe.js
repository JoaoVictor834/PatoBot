const Command = require('../../structures/Command')

module.exports = class extends Command.mCommand {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'rcomo dupa',
            aliases: ['rqual dupe','rtem dupe', 'dupe']
        })
    }
    run = (username, message) => {

        if(message === '-dupe') {
            return this.bot.chat(`Parabéns ${username} voce dupou` + Math.round(Math.random() * 1000) + ' itens! Relogue e os terá!')
        }
        
        this.bot.chat(`${username}, para dupar utilize o comando -dupe, /dupe ou /suicide dupe.`)

    }
}