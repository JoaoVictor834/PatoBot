# PatoBot3
 
***Welcome to the patobot!***

*Patobot is a bot created for the anarkcraft.xyz server
with the intention of transpiling the game chat to discord!
The bot is currently in 3-DEV version, being completely rewritten*

- If you want to use this project, feel free!
Just copy it to your PC and create the .env file containing:

```env
IP="server ip"
NAME="bot name"
VERSION="bot version"

BOT_TOKEN="discord bot set token"

#Password is useful in few cases and will change soon
LOGIN="if the server has a system that uses /login"
```

## Example of how to create events

**1. Create a discord event**

- Create a [discord event file](src/events/discord/)

**Example:**

```js

//Imports
const Event = require('../../structures/Event') // This is the base of event

// Exports the event extends the base of dEvent (discordEvent)
module.exports = class extends Event.dEvent {
    constructor(client, bot) {
        super(client, bot, {
            name: 'name of the event (EXACT NAME)'
        })
    }
    
    // Run function
    run = () => {

        // To use client is
        this.client
        
        // To use bot is
        this.bot

        // Here is the code of the event
        console.log('Hello Word!')

        this.bot.send('Hello Word 2!') 

        this.client.chat.send('Hello Word 3!')

    }
}
```

**2. Create a minecraft event**

Create a [minecraft event file](src/events/minecraft/)

**Example:**

```js
//Imports
const Event = require('../../structures/Event') // This is the base of event

// Exports the event extends the base of mEvent (minecraftEvent)
module.exports = class extends Event.mEvent {
    constructor(bot, client) {
        super(bot, client, {
            name: 'name of the event (EXACT NAME)'
        })
    }
    
    // Run function
    run = () => {

        // To use client is
        this.client
        
        // To use bot is
        this.bot

        // Here is the code of the event
        console.log('Hello Word!')

        this.bot.send('Hello Word 2!') 

        this.client.chat.send('Hello Word 3!')

    }
}

```
## Example of how to create commands

**1. Make a discord command**

Create a [discord command file](/src//commands/discord/)

**Example:**

```js
// Imports
const Command = require('../../structures/Command') // Import base of commands

// Exports the command extends the base of dCommand (discordCommand)
module.exports = class extends Command.dCommand { 
    constructor(client, bot) {
        super(client, bot {
            name: 'name of the command',
            description: 'description of the command'
        })
    }

    // Run function
    run = (interaction) => {

        // To use client is
        this.client
        
        // To use bot is
        this.bot

        // Here is the code of the event
        console.log('Hello Word!')

        this.bot.send('Hello Word 2!') 

        this.client.chat.send('Hello Word 3!')

    }
}
```

2. *MINECRAFT COMMANDS IS NOT AVALIABLE FOR NOW*


***IT WILL CHANGE A LOT YET, LIKE I SAID THIS IN BETA DEV***

***ELE VAI MUDAR MUITO AINDA, COMO EU DISSE ESTA EM BETA DEV***