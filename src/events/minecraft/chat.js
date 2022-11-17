const Event = require('../../structures/Event')
require('dotenv').config()
const prefix = process.env['PREFIX']

module.exports = class extends Event.mEvent {
    constructor(bot, client, ebot) {
        super(bot, client, ebot, {
            name: 'chat'
        })
        
    } 
    
    run = (username, message) => {
        if(username === this.bot.username) return
        
        
       
            const args = message.slice(1).trim().split(/ +/g);
            const command = args.shift().toLowerCase();

            
            
           
           
                this.ebot.commands.find(c =>  {
                    if(c.aliases === undefined) return

                 return c.aliases.find(a => a === command)
                    
                })
            


           const cmd = message.startsWith(prefix) ?

            this.ebot.commands.find(c => c.name === command) ||
            this.ebot.commands.find(c => { 
if(c.aliases === undefined) return false

return c.aliases.find(a => a === command)
}) :

            this.ebot.commands.find(c => {
if(c.aliases === undefined) return false

return c.aliases.find(a => {
    if(!a.startsWith('r')) return false

    return new RegExp(a.slice(1), 'i').test(message)
})
}) ||
            this.ebot.commands.find(c => {
                if(!c.name.startsWith('r')) return false
                return new RegExp(c.name.slice(1), 'i').test(message)
            })

            if(cmd) return cmd.run(username, message, args)
          

            let Value = this.ebot.Value
            let dcMsgIDs = this.client.dcMsgIDs
            let Vezes = this.ebot.Vezes
            let x = this.ebot.x
        

            if (Value >= 10) { Value = 0 }
            const usrmsg = username + ' ' + message.toString()
    
            if (dcMsgIDs.some(element => element.usrmsg === usrmsg)) {
    
              let delID = dcMsgIDs[dcMsgIDs.findIndex(element => element.usrmsg === usrmsg)].ID
    
              this.client.chat.messages.fetch(delID).then(async msg => {
    
    
                await msg.delete();
                //deleta o elemento da array
                 dcMsgIDs.splice(dcMsgIDs.findIndex(element => element.usrmsg.startsWith(usrmsg)), 1)
    
              }).catch(error => console.log(error))
              
              Value = dcMsgIDs.find(element => element.usrmsg === usrmsg).value

              console.log(dcMsgIDs, Value)

              let i = 0
              for (let vez in Vezes) {
                i++
                if (Value === i) {
                  Vezes[vez] = Vezes[vez] + 1
                  x = Vezes[vez]
                }
              }
    
              
              this.client.chat.send(`${username}: ${this.ebot.filter.clean(message)} (x${x})`).then(msg => {
                //Value = Value + 1
                if (Value >= 10) { Value = 0 }
                
                dcMsgIDs.push({ "ID": msg.id, "usrmsg": usrmsg.toString(), "value": Value })
    
                if (dcMsgIDs.length >= 10) {
    
                  dcMsgIDs.shift()
                }
              })
    
            }
    
            if (dcMsgIDs.some(element => element.usrmsg === usrmsg)) {
              Value = dcMsgIDs.find(element => element.usrmsg === usrmsg).value
            }
            else {
              Value = Value + 1
              if (Value >= 10) { Value = 0 }

              this.client.chat.send(`${username}: ${this.ebot.filter.clean(message)}`).then((msg) => {
console.log('1o value e '+Value)
               Value = Value + 1
console.log('2o value e '+Value)
                dcMsgIDs.push({ "ID": msg.id, "usrmsg": usrmsg.toString(), "value": Value })
console.log('3o value e '+Value)
                if (dcMsgIDs.length >= 10) {
                  dcMsgIDs.shift()
                }

              }).catch(error => console.log(error)) 

            }



    }
}
