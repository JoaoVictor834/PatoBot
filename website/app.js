
const mineflayerViewer = require('prismarine-viewer').mineflayer
const { readdirSync } = require('fs')
const { join } = require('path')
const { PREFIX } = require('../config.json')

module.exports = async function(bot, client) {
   

   console.log("Rodando site")
   const app = mineflayerViewer(bot, { port: 300, prefix: '/viewer' })
   
   const commandlist = []

   function getCommands(path, client, bot, ebot) {

        const commands = readdirSync(path)

            for (const command of commands) {
                const commandClass = require(join(process.cwd(), `${path}/${command}`))
                const cmd = new (commandClass)(client, bot, ebot)

                if(!cmd.name.startsWith('r')) commandlist.push(`${PREFIX}${cmd.name}`)
            }
             
        }

        getCommands('src/commands/minecraft', client, bot, client.ebot)

        app.use('/api/getCommands', function(req, res)  {
            res.json(commandlist)
        })

        const playerlist = bot.tablist.footer.text.replace(/\§(.)/gmi, '').match(/Players Online: [0-9]+/)
        const queuelist = bot.tablist.footer.text.replace(/\§(.)/gmi, '').match(/Na Fila: [0-9]+/)

        app.use('/api/getBotInfo', function(req, res)  {
            res.json({
                vida: bot.health,
                comida: bot.food,
                xp: bot.experience.level,
                ping: bot.players[bot.username].ping,
                mortes: bot.tablist.footer.text.replace(/\§(.)/gmi, '').match(/Mortes: [0-9]*/) ? bot.tablist.footer.text.replace(/\§(.)/gmi, '').match(/Mortes: [0-9]*/)[0] : '',
                cordenadas: bot.entity.position
            })
        })

        app.use('/api/getServerInfo', function(req, res)  {
            res.json({
                players: Object.keys(bot.players).join(', '),
                online: `${playerlist ? playerlist[0] : ''}`,
                fila: `${queuelist ? queuelist[0] : ''}`,
                tps: bot.getTps(),
            })
        })


        
        return app
}
