'use strict'

function puzzleModeGameOverScreen(canvasDescription = gameData.canvasDescription){
    let r = document.createElement('div')

    const canvas = document.createElement('canvas')
    r.appendChild(canvas)
    const CANVAS_HEIGHT = 0.8
    const CANVAS_WIDTH = 1
    canvas.height = window.innerHeight * CANVAS_HEIGHT
    canvas.width = window.innerWidth * CANVAS_WIDTH
    const ctx = canvas.getContext('2d')

    canvasDescription.drawAll(canvas.width, canvas.height, ctx)

    const textDiv = document.createElement('div')
    r.appendChild(textDiv)
    const textArea = document.createElement('div')
    textDiv.appendChild(textArea)
    const playerScore = gameData.playerScore
    const bestFoundScore = gameData.bestFoundScore
    textArea.innerHTML = `
    <p>Score : ${playerScore}<br>
    Meilleur score trouvé : ${bestFoundScore}</p>
    `
    const nextButton = document.createElement('div')
    textDiv.appendChild(nextButton)
    nextButton.innerHTML = `<p>OK</p>`

    r.style.margin = 0
    r.style.height = '95dvh'
    r.style.width = '100dvw'

    textDiv.style.margin = 0
    textDiv.style.height = `${95 - 95 * CANVAS_HEIGHT}dvh`
    textDiv.style.width = '100dvw'
    textDiv.style.display = 'grid'
    textDiv.style.alignContent = 'center'
    textDiv.style.alignItems = 'center'
    textDiv.style.gridTemplate = `
    'a c'${(95 - 95 * CANVAS_HEIGHT)}dvh / 70dvw 30dvw
    `

    textArea.style.height = '100%'
    textArea.style.width = '100%'
    textArea.style.gridArea = 'a'
    textArea.style.display = 'flex'
    textArea.style.justifyItems = 'center'
    textArea.style.alignItems = 'center'
    textArea.style.justifyContent = 'center'
    textArea.style.alignContent = 'center'

    nextButton.style.height = '100%'
    nextButton.style.width = '100%'
    nextButton.style.gridArea = 'c'
    nextButton.style.display = 'flex'
    nextButton.style.justifyItems  = 'center'
    nextButton.style.alignItems = 'center'
    nextButton.style.justifyContent  = 'center'
    nextButton.style.alignContent = 'center'

    textArea.addEventListener('pointerdown', solve)
    canvas.addEventListener('pointerdown', solve)
    function solve(){
        const solution = greedySolve(gameData.chemoSlotsDescription.completeList, gameData.chemoSlotsDescription.fixedSchedule)
        gameData.canvasDescription.schedule = solution.copy()
        gameData.canvasDescription = new CanvasDescription(solution, gameData.chemoSlotsDescription.fixedSchedule, window.innerWidth, window.innerHeight*0.8)
        gameData.chemoSlotsDescription.placedSlots = gameData.chemoSlotsDescription.completeList
        gameData.chemoSlotsDescription.unplacedSlots = []
    }

    nextButton.addEventListener('pointerdown', goToMenu)

    return r;
}