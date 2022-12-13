const Command = require('../../structures/Command')

module.exports = class extends Command.mCommand {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'sleep',
        })
    }
    run = () => {

       if(this.bot.time.isDay && this.bot.thunderState === 0) return this.bot.chat('Este comando so fuciona de noite ou em tempestades!')

       if(Object.keys(this.bot.players).length > 1) return this.bot.chat('Este comando so fuciona quando somente 1 pessoa esta online!')

       this.bot.chat('Ta bom vou deixar voce dormir :(')
       this.bot.quit('Alguem ta querendo dormir...')

    }














    
}
