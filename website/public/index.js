let commandlist

function Load() {
    commandlist = document.getElementById('commandList')
    botInfoList = document.getElementById('botInfoList')
    serverInfoList = document.getElementById('serverInfoList')
    playerList = document.getElementById('playerList')

    if(commandlist) updateCommands()
    if(botInfoList) updateBotInfo()
    if(serverInfoList) updateServerInfo()
}



async function updateBotInfo() {

    const response = await fetch('/api/getBotInfo')
    if(response.status !== 200) return
    const data = await response.json()

    botInfoList.innerHTML = 
    `<li>Vida: ${data.vida}</li>
    <li>Ping: ${data.ping}</li>
    <li>Pernis: ${data.comida}</li>
    <li>${data.mortes}</li>
    <li>Cordenadas: X: ${Math.round(data.cordenadas.x)} Y: ${Math.round(data.cordenadas.y)} Z: ${Math.round(data.cordenadas.z)}</li>
    <li>Experiencia: ${data.xp}</li>`
}

async function updateServerInfo() {

    const response = await fetch('/api/getServerInfo')
    if(response.status !== 200) return
    const data = await response.json()

    playerList.innerHTML = `
    <li>Jogadores: ${data.players}</li>
    <li>Online: ${data.online}</li>
    <li>Na fila: ${data.fila}</li>
    `

    serverInfoList.innerHTML = 
    `<li>Ip: Anarkcraft.xyz</li>
    <li>Nick: PatoBot</li>
    <li>Tps: ${data.tps}</li>
    `
}


async function updateCommands() {

 
   const response = await fetch('/api/getCommands')
   if(response.status !== 200) return
   const data = await response.json()

   data.forEach(command => {
       commandlist.innerHTML += `<li>${command}</li>`
    });
    
    console.log(commandlist.innerHTML)


}

