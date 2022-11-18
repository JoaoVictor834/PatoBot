const Command = require('../../structures/Command')

module.exports = class extends Command.mCommand {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'coord',
            aliases: ['cordenadas']
        })
    }
    run = () => {
       const position = this.bot.entity.position

        this.bot.chat(`Oiiii eu tô aqui: ${Math.round(position.x)}, ${Math.round(position.y)}, ${Math.round(position.z)}`)

    }
}
