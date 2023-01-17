const Event = require('../../structures/Event')
const Movements = require("mineflayer-pathfinder").Movements
const { GoalFollow } = require("mineflayer-pathfinder").goals

module.exports = class extends Event.mEvent {
    constructor(bot, client, ebot) {
        super(bot, client, ebot, {
            name: 'entitySpawn'
        })
    } 
    
    run = (entity) => {
        if(entity.type !== "player") return
        const banName = [
            this.bot.username,
            "§e§lFazendeiro"
        
        ]
        if(banName.includes(entity.username)) return
        
        console.log(`[DEBUG] ${entity.username} entrou no campo`)

        try {

                    this.ebot.isActive = false
                    const Move = new Movements(this.bot)
                    let target = entity //this.bot.nearestEntity(entity => entity.type === "player") 
                    this.bot.pathfinder.setMovements(Move)

                    if(this.ebot.interval) {
                        clearInterval(this.ebot.interval)
                        this.bot.pathfinder.setGoal(null)
                        console.log("[DEBUG] Intervalo limpo")
                    }
                
                    function setPath(goal, bot) {
                        bot.pathfinder.setGoal(goal)
                       if(bot.players[target]) bot.lookAt(bot.players[target.username].entity.position.offset(0, 1.6, 0))
                    }
                    
                    const interval = setInterval(() => { setPath(new GoalFollow(target, 2), this.bot) }, 900)
                    this.ebot.interval = interval
                    
                    if(this.client.cmd) this.client.cmd.send("> [DEBUG] Chamando pathfinder")


                this.bot.once("entityGone", () => {
                    console.log(`[DEBUG] ${entity.username} saiu do campo`)

                    if(this.ebot.interval) {
                        clearInterval(this.ebot.interval)
                        this.bot.pathfinder.setGoal(null)
                        console.log("[DEBUG] Intervalo limpo")
                    }

                    target = this.bot.nearestEntity(entity => entity.type === "player") 
                    if(!target) return console.log(`[DEBUG] Nenhum alvo enontrado`)
                    const intervalNearest = setInterval(() => { setPath(new GoalFollow(target, 2), this.bot) }, 900)
                    this.ebot.interval = intervalNearest

                })

        } catch (error) {
            console.error(error)
        }        
              
    }
}