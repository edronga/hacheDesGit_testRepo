'use strict'

function puzzleModeDifficultySelectionScreen(){
    let r = document.createElement('div')
    r.style.margin = 0
    r.style.height = '100dvh'
    r.style.width = '100dvw'

    const easyDiv = document.createElement('div')
    r.appendChild(easyDiv)
    easyDiv.innerHTML = '<p>facile</p>'

    const mediumDiv = document.createElement('div')
    r.appendChild(mediumDiv)
    mediumDiv.innerHTML = '<p>moyen</p>'

    const hardDiv = document.createElement('div')
    r.appendChild(hardDiv)
    hardDiv.innerHTML = '<p>difficile</p>'

    const customDiv = document.createElement('div')
    r.appendChild(customDiv)
    customDiv.innerHTML = '<p>personnalisé</p>'

    easyDiv.addEventListener('pointerdown', goToPuzzleModeGameEasy)
    mediumDiv.addEventListener('pointerdown', goToPuzzleModeGameMedium)
    hardDiv.addEventListener('pointerdown', goToPuzzleModeGameHard)
    customDiv.addEventListener('pointerdown', goToPuzzleModeGameCustomDifficulty)

    return r;
}