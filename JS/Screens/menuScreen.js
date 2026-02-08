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
    const colorAngle = menuColorAnimation.next().value
    const complimentaryColorAngle = (colorAngle <= 180) ? colorAngle + 180 : colorAngle - 180 ;
    r.style.backgroundColor = `hsl(${colorAngle} 75% 95%)`

    const divTuto = document.createElement('div')
    r.appendChild(divTuto)
    divTuto.innerHTML = '<p>Tutoriel</p>'

    const storyMode = document.createElement('div')
    r.appendChild(storyMode)
    storyMode.innerHTML = '<p>Histoire</p>'

    const divPuzzle = document.createElement('div')
    r.appendChild(divPuzzle)
    divPuzzle.innerHTML = '<p>Puzzle</p>'

    const highScores = document.createElement('div')
    r.appendChild(highScores)
    highScores.innerHTML = '<p>Médailles</p>'

    const group = [divTuto, storyMode, divPuzzle, highScores]
    group.forEach((element, index) =>{
        element.style.width = '80dvw'
        element.style.height = '20dvh'
        element.style.border = `5px solid black`
        element.style.fontSize = '6dvh'
        element.style.display = 'flex'
        element.style.justifyContent = 'center'
        element.style.alignItems = 'center'
        element.style.backgroundColor = `hsl(${complimentaryColorAngle + index*20} 100% 75%)`
    })
    Array.from(r.getElementsByTagName('p')).forEach((element) =>{
        element.style.margin = 0
    })

    divTuto.addEventListener('pointerdown', () =>{
        const text = `C'est un jeu d'optimisation de planning.<br/>L'objectif est d'obtenir un score aussi bon voire meilleur que notre "logiciel d'optimisation linéaire en oncologie".<br>(Il s'appelle lolo\u00AE)`
        const canvasDescription = new CanvasDescription(new Schedule(), new Schedule(), window.innerWidth, window.innerHeight*0.8)
        goToTutorialScreen(text, canvasDescription)
    })

    divPuzzle.addEventListener('pointerdown', goToPuzzleModeDifficultySelection)

    highScores.addEventListener('pointerdown', goToBestScoresScreen)

    storyMode.addEventListener('pointerdown', goToStoryModeScreen)



    return r;
}

let menuColorAnimation = gen_menuColorAnimation(10000)
function* gen_menuColorAnimation(animationTime){
    let referenceTime = Date.now()
    const frameDuration = animationTime/360
    let colorAngle = 180

    while(true){
        if (Date.now() - referenceTime >= frameDuration){
            colorAngle = (colorAngle === 360) ? 0 : colorAngle + 1;
            referenceTime = Date.now()
        }
        yield colorAngle
    }
}
