const Event = require('../../structures/Event')
const {  chat  } = require('../../antispam')
const { PREFIX } = require('../../../config')
const filterlist = require('../../../filter.json').frases

module.exports = class extends Event.mEvent {
    constructor(bot, client, ebot) {
        super(bot, client, ebot, {
            name: 'chat'
        })


    }
    

    run = async (username, message) => {
        const usrmsg = `${username} ${message}`
        const db = this.ebot.db

// Verifys

        if (username === this.client.bot.username) return this.client.cmd.send(`> ${message}`)

        function banFrases(m, ebot) {
        if(filterlist.find(banfrase => {
            return new RegExp(banfrase, 'i').test(m)
        })) {
            return 'bobba bobba (EU AMO PINTO)'
        } else {
            return ebot.filter.clean(m)
        }
    }


        // Intialize chat function
         chat(usrmsg, db, username, this.client, this.ebot, message, banFrases)

            

         // Verify if is a command
                    const args = message.slice(PREFIX.length).trim().split(/ +/g);
                    const command = args.shift().toLowerCase();

        const cmd = message.startsWith(PREFIX) ?

            this.ebot.commands.find(c => c.name === command) ||

            this.ebot.commands.find(c => {
                if (c.aliases === undefined) return false
                return c.aliases.find(a => a === command)
            }) :

            this.ebot.commands.find(c => {
                if (c.aliases === undefined) return false
                return c.aliases.find(a => {
                    if (!a.startsWith('r')) return false
                    return new RegExp(a.slice(1), 'i').test(message)
                })

            }) ||
            this.ebot.commands.find(c => {
                if (!c.name.startsWith('r')) return false
                return new RegExp(c.name.slice(1), 'i').test(message)
            })

        if (cmd) cmd.run(username, message, args)





    }
}
