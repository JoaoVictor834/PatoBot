// Exports the base of every command class

module.exports = {
    dCommand: class {
    constructor(client, bot, options) {
        this.client = client
        this.bot = bot
        this.name = options.name
        this.description = options.description
        this.options = options.options
    }
},
 mCommand: class {
    constructor(client, options) {
        this.client = client
        this.name = options.name
        this.description = options.description
        this.options = options.options
    }
 }

}