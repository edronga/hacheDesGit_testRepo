'use strict'

function menuScreen() {
    let r = document.createElement('div')
    r.style.margin = 0
    r.style.height = '100dvh'
    r.style.width = '100dvw'

    const divTuto = document.createElement('div')
    r.appendChild(divTuto)
    divTuto.height = '20dvh'
    divTuto.innerHTML = '<p>Tutorial</p>'

    const divPuzzle = document.createElement('div')
    r.appendChild(divPuzzle)
    divPuzzle.height = '20dvh'
    divPuzzle.innerHTML = '<p>Puzzle</p>'

    const storyMode = document.createElement('div')
    r.appendChild(storyMode)
    storyMode.height = '20dvh'
    storyMode.innerHTML = '<p>Story Mode</p>'

    const highScores = document.createElement('div')
    r.appendChild(highScores)
    highScores.height = '20dvh'
    highScores.innerHTML = '<p>High Scores</p>'

    divPuzzle.addEventListener('pointerdown', goToPuzzleModeDifficultySelection)

    return r;
}