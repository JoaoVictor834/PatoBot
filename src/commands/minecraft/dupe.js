const Command = require('../../structures/Command')

module.exports = class extends Command.mCommand {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'dupe',
            aliases: ['rqual dupe','rtem dupe', 'rcomo dupa', 'rqual o dupe', 'rtem algum dupe', 'rqual e o dupe', 'como que dupa']
        })
    }
    run = (username, message) => {

        if(message.startsWith('-dupe')) {
            return this.bot.chat(`Parabéns ${username} voce dupou ` + Math.round(Math.random() * 1000) + ' itens. Relogue e os terá!')
        }
        
        this.bot.chat(`${username}, para dupar utilize o comando -dupe, /duplicar ou /suicide dupe.`)

    }
}
