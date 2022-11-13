const Command = require('../../structures/Command')

module.exports = class extends Command.mCommand {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'status',
            aliases: ['info']
        })
    }
    run = (username) => {

        this.bot.chat(`${username}, o PatoBot esta com: ${this.bot.food / 2} pernis de comida, ${this.bot.health / 2} corações de vida, ${this.bot.experience.level} leveis de xp e esta com um ping de ${this.bot.players.PatoBot.ping}ms.`)
  

    }
}