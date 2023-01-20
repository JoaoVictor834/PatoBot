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

return client.ebot.prismarine

// Login in the discord bot
client.login(BOT_TOKEN)
