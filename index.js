//Imports
const { GatewayIntentBits } = require('discord.js'
)
const Client = require('./src/structures/Client')

//Enviroments Variables Configuration
require('dotenv').config()

//Client create

const client = new Client({
    intents: [                  
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})


client.login(process.env['BOT_TOKEN'])