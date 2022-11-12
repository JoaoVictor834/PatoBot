const Command = require('../../structures/Command')

module.exports = class extends Command.mCommand {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'test',
        })
    }
    run = async (message, username) => {

        console.log(username + ': ' + message)

    }
}