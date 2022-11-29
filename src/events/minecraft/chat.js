const Event = require('../../structures/Event')
const { PREFIX, HOOK } = require('../../../config')
const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));
const simplDb = require('simpl.db')
const names = require('../../../pfp/names.json').names

const database = new simplDb({
    dataFile: 'pfp/database.json',
    collectionsFolder: 'pfp'
})

const db = database.getCollection('users') || database.createCollection('users')

module.exports = class extends Event.mEvent {
    constructor(bot, client, ebot) {
        super(bot, client, ebot, {
            name: 'chat'
        })

    }

    run = async (username, message) => {

// Verifys
        if (username === this.client.bot.username) return this.client.cmd.send(`> ${message}`)
        if (/\@/.test(message) || /Você]/.test(message) || /\[Você/.test(message)) return


// set command and args
        const args = message.slice(PREFIX.lenght).trim().split(/ +/g);
        const command = args.shift().toLowerCase();


        // start of message send
        try {

            const getUUID = async (path = `https://playerdb.co/api/player/minecraft/${username}`) => {
                const response = await fetch(path)
                const data = await response.json()

                if (data.code !== 'player.found') return

                return await data.data.player.raw_id

            }

            async function RandomAvatar() {

                if (db.has(a => a.name === username)) {
                    let user = await db.get(a => a.name === username).avatar

                    const response = await fetch(`https://playerdb.co/api/player/minecraft/${user}`)
                    const data = await response.json()

                    if (data.code !== 'player.found') return

                    return `https://crafatar.com/avatars/${await data.data.player.raw_id}?size=32&overlay`

                } else {

                    let avatar = names[Math.floor(Math.random() * names.length)]

                    await db.create({
                        name: username,
                        avatar: avatar
                    })

                    let user = await db.get(a => a.name === username).avatar

                    const response = await fetch(`https://playerdb.co/api/player/minecraft/${user}`)
                    const data = await response.json()

                    if (data.code !== 'player.found') return

                    return `https://crafatar.com/avatars/${await data.data.player.raw_id}?size=32&overlay`

                }
            }

            getUUID().then(uuid => {
                this.client.fetchWebhook(HOOK.ID, HOOK.TOKEN)
                    .then(async hk => {
  
                        hk.send(
                            {
                                content: this.ebot.filter.clean(message) || '\`Mensagem inválida\`',
                                username: username || 'Nome invalido',
                                avatarURL: uuid ? `https://crafatar.com/avatars/${uuid}?size=32&overlay` : await RandomAvatar()

                            }).catch(e => {
                       console.log(e)
                       
})
                    })

            })

        }
        catch (err) {
            console.log(err)
        }

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

        if (cmd) return cmd.run(username, message, args)





    }
}
