const Event = require('../../structures/Event')


module.exports = class extends Event.mEvent {
    constructor(bot, client, ebot) {
        super(bot, client, ebot, {
            name: 'message'
        })
    } 
    
    run = (message) => {
       
      const msg = message.toString()


        if(msg === '') return
        if(msg === ' ') return
        if(message.hasOwnProperty('extra')) {

          if (message.extra[0].bold === true) {
           return this.client.cmd.send(`> ${msg}`)
          }
        }

        if(msg.startsWith('(!)')) return
        if(msg.endsWith(']')) return



    }
}