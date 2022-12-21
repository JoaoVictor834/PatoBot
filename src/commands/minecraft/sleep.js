const Command = require('../../structures/Command')

module.exports = class extends Command.mCommand {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'sleep',
            aliases: ['quit']
        })
    }
    run = () => {

       if(this.bot.time.isDay && this.bot.thunderState === 0) return this.bot.chat('Este comando so fuciona de noite ou em tempestades!')

       if(Object.keys(this.bot.players).length > 4) return this.bot.chat('Este comando so fuciona quando menos de 4 pessoas estão online!')

       this.bot.chat('Ta bom vou deixar voce dormir :(')
       this.bot.quit('Alguem ta querendo dormir...')

    }














    
}
