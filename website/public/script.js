

function Load() {
    const commandlist = document.getElementById('commandList')
    const botInfoList = document.getElementById('botInfoList')
    const serverInfoList = document.getElementById('serverInfoList')
    const playerList = document.getElementById('playerList')


    if(commandlist) updateCommands(commandlist)
    if(botInfoList) updateBotInfo(botInfoList)
    if(serverInfoList) updateServerInfo(playerList, serverInfoList)
}



async function updateBotInfo(botInfoList) {

    const response = await fetch('/api/getBotInfo')
    if(response.status !== 200) return
    const data = await response.json()

    botInfoList.innerHTML = 
    `<li>Vida: ${Math.round(data.vida)}</li>
    <li>Ping: ${data.ping}</li>
    <li>Pernis: ${Math.round(data.comida)}</li>
    <li>${data.mortes}</li>
    <li>Cordenadas: X: ${Math.round(data.cordenadas.x)} Y: ${Math.round(data.cordenadas.y)} Z: ${Math.round(data.cordenadas.z)}</li>
    <li>Experiencia: ${data.xp}</li>`
}

async function updateServerInfo(playerList, serverInfoList) {

    const response = await fetch('/api/getServerInfo')
    if(response.status !== 200) return
    const data = await response.json()

    playerList.innerHTML = `
    <li style="font-weight: bold">${data.fila}</li>
    <li style="font-weight: bold">${data.online}</li>
    <li><p style="font-weight: bold">Jogadores:<br></p>${data.players}</li>
    `

    serverInfoList.innerHTML = 
    `<li>Ip: Anarkcraft.xyz</li>
    <li>Nick: PatoBot</li>
    <li>Tps: ${data.tps}</li>
    `
}


async function updateCommands(commandlist) {

 
   const response = await fetch('/api/getCommands')
   if(response.status !== 200) return
   const data = await response.json()

   data.forEach(command => {
       commandlist.innerHTML += `<li>${command}</li>`
    });

}

    setInterval(() => {
        location.reload()
    }, 190 * 1000);
   



    let toggle

    function toggleCrate(crate) {

        if(toggle) {
            crate.hide()
            toggle = false
        } else {
            crate.show()
            toggle = true
        }
    }