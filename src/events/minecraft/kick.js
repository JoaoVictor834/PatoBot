const Event = require('../../structures/Event')

module.exports = class extends Event.mEvent {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'kicked'
        })
    }

    run = (reason) => {

        this.client.chat.send(`O bot foi kickado do servidor por \`${JSON.parse(reason).text || JSON.parse(reason).translate}\` :(`)
       

    }
}
