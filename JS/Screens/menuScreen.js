'use strict'

function menuScreen() {
    let r = document.createElement('div')
    r.style.margin = 0
    r.style.height = '100dvh'
    r.style.width = '100dvw'
    r.style.display = 'flex'
    r.style.flexDirection = 'column'
    r.style.justifyContent = 'center'
    r.style.alignItems = 'center'
    r.style.gap = '2dvh'

    const divTuto = document.createElement('div')
    r.appendChild(divTuto)
    divTuto.innerHTML = '<p>Tutoriel</p>'

    const divPuzzle = document.createElement('div')
    r.appendChild(divPuzzle)
    divPuzzle.innerHTML = '<p>Puzzle</p>'

    const storyMode = document.createElement('div')
    r.appendChild(storyMode)
    storyMode.innerHTML = '<p>Histoire</p>'

    const highScores = document.createElement('div')
    r.appendChild(highScores)
    highScores.innerHTML = '<p>Médailles</p>'

    const group = [divTuto, divPuzzle, storyMode, highScores]
    group.forEach((element) =>{
        element.style.width = '80dvw'
        element.style.height = '20dvh'
        element.style.border = `5px solid black`
        element.style.fontSize = '6dvh'
        element.style.display = 'flex'
        element.style.justifyContent = 'center'
        element.style.alignItems = 'center'
        element.style.backgroundColor = 'white'
    })
    Array.from(r.getElementsByTagName('p')).forEach((element) =>{
        element.style.margin = 0
    })

    divTuto.addEventListener('pointerdown', () =>{
        const text = `C'est un jeu d'optimisation de planning.<br/>L'objectif est d'obtenir un score aussi bon voire meilleur que notre logiciel d'optimisation Intelligente en oncologie.<br>(Il s'appelle loIo)`
        const fullSchedule = generateRandomSchedule(16)
        const canvasDescription = new CanvasDescription(fullSchedule, new Schedule(), window.innerWidth, window.innerHeight*0.8)
        goToTutorialScreen(text, canvasDescription)
    })

    divPuzzle.addEventListener('pointerdown', goToPuzzleModeDifficultySelection)

    highScores.addEventListener('pointerdown', goToBestScoresScreen)

    storyMode.addEventListener('pointerdown', goToStoryModeScreen)



    return r;
}