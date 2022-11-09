//Imports
const { GatewayIntentBits } = require('discord.js'
)
const Client = require('./src/structures/Client')

//Enviroments Variables Configuration
require('dotenv').config()

// Create the client
const client = new Client({
    intents: [                  
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
})

// Login in the discord bot
client.login(process.env['BOT_TOKEN'])