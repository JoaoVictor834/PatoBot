// Exports the base of every command class

module.exports = {
    dCommand: class {
    constructor(client, options) {
        this.client = client
        this.name = options.name
        this.description = options.description
        this.options = options.options
    }
},
 mCommand: class {
    constructor(bot, client, ebot, options) {
        this.client = client
        this.ebot = ebot
        this.bot = bot
        this.name = options.name
        this.aliases = options.aliases 
    }
 }

}
