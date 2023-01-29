const { HOOK } = require('../config')
const fetch = (url) => import('node-fetch').then(({ default: fetch }) => fetch(url));
const names = require('../pfp/names').names
const { EmbedBuilder } = require('discord.js')

module.exports = {
    chat: async function (usrmsg, db, username, client, ebot, message, banfrase) {

        let vezes = ebot.quantity
        let val = ebot.getValue("chat")
        let dcmsgs = ebot.dcmsgs

        if(message.startsWith('(!)')) return
        
        if(new RegExp('https://|Você]|[Você').test(message)) return

        async function getUUID(path = `https://api.mojang.com/users/profiles/minecraft/${username}`) {
            const response = await fetch(path)
            if (response.status !== 200) return
            const data = await response.json()

            if (!data.id) return

            return await data.id

        }

        async function RandomAvatar() {

            if (db.has(a => a.name === username)) {
                let user = await db.get(a => a.name === username).avatar

                const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${user}`)
                if (response.status !== 200) return
                const data = await response.json()

                if (!data.id) return

                return `https://crafatar.com/avatars/${await data.id}?size=32&overlay`

            } else {

                let avatar = names[Math.floor(Math.random() * names.length)]

                await db.create({
                    name: username,
                    avatar: avatar,
                    useCustomSkin: true
                })

                let user = await db.get(a => a.name === username).avatar

                const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${user}`)
                if (response.status !== 200) return
                const data = await response.json()

                if (!data.id) return

                return `https://crafatar.com/avatars/${await data.id}?size=32&overlay`

            }
        }

        async function getAvatar() {
            if (username === 'Anarkcraft' || username === 'Broadcast') return 'https://cdn.discordapp.com/avatars/877796682560061460/c01f752b93b9cbd607819f878df90dd1.jpg'


            if (!db.has(a => a.name === username)) return false

            let user = db.get(a => a.name === username)

            if (!user.useCustomSkin) return false

            const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${user}`)
            if (response.status !== 200) return
            const data = await response.json()

            if (!data.id) return

            return `https://crafatar.com/avatars/${await data.id}?size=32&overlay`

        }





        if (dcmsgs.some(usm => usm.usrmsg === usrmsg)) {

            let DelId = dcmsgs.find(usm => usm.usrmsg === usrmsg).ID

            client.chat.messages.fetch(DelId).then(async msg => {
                await msg.delete()

                dcmsgs.splice(dcmsgs.findIndex(usm => usm.usrmsg.startsWith(usrmsg)), 1)

            }).catch(e => console.log(e))


            ebot.val = dcmsgs.find(usm => usm.usrmsg === usrmsg).val

            val = ebot.getValue("chat")

            let x = 0



            vezes.forEach(vez => {
                if (vez.id === val) {
                    vez.qty = vez.qty + 1
                    x = vez.qty
                }
            })


            getUUID().then(uuid => {
                client.fetchWebhook(HOOK.ID, HOOK.TOKEN)
                    .then(async hk => {

                        hk.send(
                            {
                                content: `${banfrase(message, ebot)}(x${x})` || `\`Mensagem inválida (x${x})\``,
                                username: username || 'Nome invalido',
                                avatarURL: await getAvatar() ? await getAvatar() : uuid ? `https://crafatar.com/avatars/${uuid}?size=32&overlay` : await RandomAvatar()

                            }).then(msg => {



                                dcmsgs.push({
                                    "ID": msg.id,
                                    "usrmsg": usrmsg,
                                    "val": val
                                })

                                if (dcmsgs.lenght >= 10) dcmsgs = []




                            }).catch(e => {
                                console.log(e)

                            })
                    })

            })



        } else {

            ebot.val = Math.round(Math.random() * 1000000000000)
            val = ebot.getValue("chat")
            vezes.push({
                "id": val,
                "qty": 1
            })

            getUUID().then(uuid => {
                client.fetchWebhook(HOOK.ID, HOOK.TOKEN)
                    .then(async hk => {

                        hk.send(
                            {
                                content: `${banfrase(message, ebot)}` || `\`Mensagem inválida\``,
                                username: username || 'Nome invalido',
                                avatarURL: await getAvatar() ? await getAvatar() : uuid ? `https://crafatar.com/avatars/${uuid}?size=32&overlay` : await RandomAvatar()

                            }).then(msg => {



                                dcmsgs.push({
                                    "ID": msg.id,
                                    "usrmsg": usrmsg,
                                    "val": val

                                })

                                if (dcmsgs.lenght >= 10) dcmsgs = []





                            }).catch(e => {
                                console.log(e)

                            })
                    })

            })

        }



    },

    death: async function (reason, username, ebot, client) {
        const usrreason = `${username} ${reason}`

        let vezes = ebot.quantityD
        let dval = ebot.getValue("kill")
        let deathmsgs = ebot.dcmsgsD



        if (deathmsgs.some(usm => usm.usrreason === usrreason)) {

            let DelId = deathmsgs.find(usm => usm.usrreason === usrreason).ID

            client.chat.messages.fetch(DelId).then(async msg => {
                await msg.delete()

                deathmsgs.splice(deathmsgs.findIndex(usm => usm.usrreason.startsWith(usrreason)), 1)

            }).catch(e => console.log(e))




            ebot.vald = deathmsgs.find(usm => usm.usrreason === usrreason).dval

            dval = ebot.getValue("kill")

            let x = 0

            vezes.forEach(vez => {
                if (vez.id === dval) {
                    vez.qty = vez.qty + 1
                    x = vez.qty
                }
            })




            const DeathEmbedX = new EmbedBuilder()
                .setDescription(`*${username}* ${ebot.filter.clean(reason.trim())}(x${x})!`)
                .setColor('FF0000')

            client.chat.send({ embeds: [DeathEmbedX] }).then(msg => {


                deathmsgs.push({
                    "ID": msg.id,
                    "usrreason": usrreason,
                    "dval": dval
                })

                if (deathmsgs.lenght >= 10) deathmsgs = []




            }).catch(e => {
                console.log(e)
            })




        } else {


            ebot.vald = Math.round(Math.random() * 100000000000)
            dval = ebot.getValue("kill")

            vezes.push({
                "id": dval,
                "qty": 1
            })



            const DeathEmbed = new EmbedBuilder()
                .setDescription(`*${username}* ${ebot.filter.clean(reason.trim())}!`)
                .setColor('FF0000')

            client.chat.send({ embeds: [DeathEmbed] }).then(msg => {



                deathmsgs.push({
                    "ID": msg.id,
                    "usrreason": usrreason,
                    "dval": dval

                })

                if (deathmsgs.lenght >= 10) deathmsgs = []



            }).catch(e => {
                console.log(e)

            })


        }


    }

}
