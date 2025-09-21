'use strict'

function puzzleModeGameOverScreen(){
    let r = document.createElement('div')
    r.style.margin = 0
    r.style.height = '100dvh'
    r.style.width = '100dvw'

    const divText = document.createElement('div')
    r.appendChild(divText)
    const playerScore = gameData.playerScore
    const bestFoundScore = gameData.bestFoundScore
    divText.innerHTML = `
    <p>Score : ${playerScore}</p>
    <p>Meilleur score trouvé : ${bestFoundScore}</p>
    `
    

    r.addEventListener('pointerdown', goToMenu)

    return r;
}