//Imports
const { GatewayIntentBits } = require('discord.js'
)
const Client = require('./src/structures/Client')

const { BOT_TOKEN } = require('./config')

// Create the client
const client = new Client({
    intents: [                  
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]

})


// Login in the discord bot
client.login(BOT_TOKEN)

module.exports = client.bot