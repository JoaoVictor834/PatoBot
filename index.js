//Imports
const { GatewayIntentBits } = require('discord.js'
)
const { createBot } = require('mineflayer')
const Bot = require('./src/structures/Bot')
const Client = require('./src/structures/Client')
let bot

//Enviroments Variables Configuration
require('dotenv').config()



//Client create

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ]
}, bot)


//Bot create

const options = {
    username: 'PatoBot',
    version: '1.16.5',
    host: 'Patobot.aternos.me'
}
bot = new Bot(createBot(options), client)




client.login(process.env['BOT_TOKEN'])