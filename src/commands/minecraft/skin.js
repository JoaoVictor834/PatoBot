const Command = require('../../structures/Command')
const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url)); 

module.exports = class extends Command.mCommand {
    constructor(bot, client, ebot) {
        super(bot, client, ebot, {
            name: 'skin',
        })
    }
    
    run = async (username, message, args) => {

        const db = this.ebot.db

       async function verifySkin(client) {
            const response = await fetch(`https://playerdb.co/api/player/minecraft/${skin}`)
            const data = await response.json()

            return data.code

            
        }

        const skin = args[0]

        if(!skin) return this.client.bot.chat('Digite o nome de alguem para mim pegar a skin!')
         if(await verifySkin(this.client) !== 'player.found') return this.client.bot.chat('Um erro ocorreu. O usuario deve ter a conta original!')

        

        
        try {

            if(db.has(u => u.name === username)) {


                let user = await db.get(u => u.name === username)

               user.avatar = skin
               await user.save()

               this.client.bot.chat(`Skin atualizada com sucesso para: ${skin}`)
                

            } else {
              
                db.create({
                    name: username,
                    avatar: skin,
                    useCustomSkin: true
                })

            }


        } catch (error) {
            console.log(error)
            this.client.bot.chat('Um erro ocorreu.')
        }

    }
}
