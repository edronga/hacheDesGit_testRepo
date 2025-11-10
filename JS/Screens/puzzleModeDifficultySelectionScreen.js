'use strict'

function puzzleModeDifficultySelectionScreen(){
    let r = document.createElement('div')
    r.style.margin = 0
    r.style.height = '100dvh'
    r.style.width = '100dvw'
    r.style.display = 'flex'
    r.style.flexDirection = 'column'
    r.style.justifyContent = 'center'
    r.style.alignItems = 'center'
    r.style.gap = '2dvh'
    const colorAngle = menuColorAnimation.next().value
    r.style.background = `hsl(${(colorAngle <= 180) ? colorAngle + 190 : colorAngle - 170} 100% 50%)`

    const easyDiv = document.createElement('div')
    r.appendChild(easyDiv)
    easyDiv.innerHTML = '<p>\u2B50</p>'

    const mediumDiv = document.createElement('div')
    r.appendChild(mediumDiv)
    mediumDiv.innerHTML = '<p>\u2B50\u2B50</p>'

    const hardDiv = document.createElement('div')
    r.appendChild(hardDiv)
    hardDiv.innerHTML = '<p>\u2B50\u2B50\u2B50</p>'

    const customDiv = document.createElement('div')
    r.appendChild(customDiv)
    customDiv.innerHTML = '<p>\u2615</p>'

    const group = [easyDiv, mediumDiv, hardDiv, customDiv]
    group.forEach((element) =>{
        element.style.width = '80dvw'
        element.style.height = '20dvh'
        element.style.border = '5px solid black'
        element.style.fontSize = '8dvh'
        element.style.display = 'flex'
        element.style.justifyContent = 'center'
        element.style.alignItems = 'center'
        element.style.backgroundColor = 'white'
    })
    Array.from(r.getElementsByTagName('p')).forEach((element) =>{
        element.style.margin = 0
    })

    easyDiv.addEventListener('pointerdown', goToPuzzleModeGameEasy)
    mediumDiv.addEventListener('pointerdown', goToPuzzleModeGameMedium)
    hardDiv.addEventListener('pointerdown', goToPuzzleModeGameHard)
    customDiv.addEventListener('pointerdown', goToPuzzleModeGameCustomDifficulty)

    return r;
}
