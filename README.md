# PatoBot

##### Site do bot: https://patobot.squareweb.app/

O PatoBot foi desenvolvido com intuito de criar uma comunicação entre o chat do
servidor Anarkcraft e o [servidor do Discord do patobot](https://discord.gg/Avp7N2dqVM)

O PatoBot foi feito com a api [mineflayer](https://github.com/PrismarineJS/mineflayer)

- Exemplo de config.json

```json
{
"BOT_TOKEN":"Token do bot",
"UseAuthentication": true,
"LOGIN":"senha se o useAuthentication estiver true (senha do /login não dá Microsoft)",
"IP":"IP do servidor",
"NAME":"nome do bot",
"VERSION":"versão",
"PREFIX":"prefixo do bot",
"GUILD_ID":"Id do servidor do discord",
"CHATBOT":"Chat do jogo",
"CMDBOT":"Console do bot",
"HOOK": {
    "ID": "id da hook",
    "TOKEN":"token da hook"
}

"ChatPatterns": [
{
"name": "nome da pattern",
"regex": "RegXp da pattern",
"options": { "parse": true, "repeat": true } 
}
]
}
```
