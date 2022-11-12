// Exports the base of every event class

module.exports = {
    dEvent: class {
    constructor(client, bot, options) {
        this.client = client
        this.bot = bot
        this.name = options.name
    }
},

mEvent: class {
    constructor(bot, client, ebot, options) {
        this.bot = bot
        this.client = client
        this.ebot = ebot
        this.name = options.name
    }
}

}