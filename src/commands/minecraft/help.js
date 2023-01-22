const Command = require('../../structures/Command')
const { PREFIX } = require('../../../config')
const { readdirSync } = require('fs')
const { join } = require('path')

module.exports = class extends Command.mCommand {
    constructor(bot, client, ebot) {
        super(bot, client, ebot, {
            name: 'help',
            aliases: ['ajuda', 'rcomo usa o patobot']
        })
    }
    run = () => {

        const commandlist = []

       function getCommands(path, client, bot, ebot) {

            const commands = readdirSync(path)

                for (const command of commands) {
                    const commandClass = require(join(process.cwd(), `${path}/${command}`))
                    const cmd = new (commandClass)(client, bot, ebot)

                    if(!cmd.name.startsWith('r')) commandlist.push(`${PREFIX}${cmd.name}`)
                }
                 
            }

            getCommands('src/commands/minecraft', this.client, this.bot, this.ebot)

      

        this.bot.chat(`Oi! eu sou o bot mais chad do mundo. Comandos disponíveis: ${commandlist.join(', ')}`)

    }
}
