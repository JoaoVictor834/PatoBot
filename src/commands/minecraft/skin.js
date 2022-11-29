const Command = require('../../structures/Command')
const simplDb = require('simpl.db')
const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));

const database = new simplDb({
    dataFile: 'pfp/database.json',
    collectionsFolder: 'pfp'
})

const db = database.getCollection('users') || database.createCollection('users')

module.exports = class extends Command.mCommand {
    constructor(bot, client, _) {
        super(bot, client, _, {
            name: 'skin',
        })
    }
    
    run = async (username, message, args) => {

       async function verifySkin() {
            const response = await fetch(`https://playerdb.co/api/player/minecraft/${skin}`)
            const data = await response.json()

            if(data.code !== 'player.found') return this.client.bot.send('Um erro ocorreu. O usuario deve ter a conta original!')

        }

        const skin = args[0]

        if(!skin) return this.client.bot.send('Digite o nome de alguem para mim pegar a skin!')
        await verifySkin()

        
        try {

            if(db.has(u => u.name === username)) {


                let user = await db.get(u => u.name === username)

               user.avatar = skin
               await user.save()

               this.client.bot.send(`Skin atualizada com sucesso para: ${skin}`)
                

            } else {
              
                db.create({
                    name: username,
                    avatar: skin
                })

            }


        } catch (error) {
            console.log(error)
            this.client.bot.send('Um erro ocorreu.')
        }

    }
}