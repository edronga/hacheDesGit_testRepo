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
    storyMode.innerHTML = '<p>Mode histoire ??</p>'

    const highScores = document.createElement('div')
    r.appendChild(highScores)
    highScores.innerHTML = '<p>Meileurs Scores</p>'

    const group = [divTuto, divPuzzle, storyMode, highScores]
    group.forEach((element) =>{
        element.style.width = '80dvw'
        element.style.height = '20dvh'
        element.style.border = '2px solid black'
        element.style.fontSize = '6dvh'
        element.style.display = 'flex'
        element.style.justifyContent = 'center'
        element.style.alignItems = 'center'
    })
    Array.from(r.getElementsByTagName('p')).forEach((element) =>{
        element.style.margin = 0
    })

    divPuzzle.addEventListener('pointerdown', goToPuzzleModeDifficultySelection)

    return r;
}