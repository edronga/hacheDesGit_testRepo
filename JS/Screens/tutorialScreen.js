'use strict'

function tutorialScreen(text, canvasDescription){
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
    textArea.innerHTML = `<p>${text}</p>`
    const imgArea = document.createElement('div')
    textDiv.appendChild(imgArea)
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
    'a b' ${(95 - 95 * CANVAS_HEIGHT) * 0.66}dvh
    'a c'${(95 - 95 * CANVAS_HEIGHT) * 0.34}dvh / 70dvw 30dvw
    `

    textArea.style.height = '100%'
    textArea.style.width = '100%'
    textArea.style.gridArea = 'a'
    textArea.style.display = 'flex'
    textArea.style.justifyItems = 'center'
    textArea.style.alignItems = 'center'
    textArea.style.justifyContent = 'center'
    textArea.style.alignContent = 'center'

    imgArea.style.height = '100%'
    imgArea.style.width = '100%'
    imgArea.style.gridArea = 'b'
    imgArea.style.backgroundImage = 'url(Images/imgNerdEmoji.png)'
    imgArea.style.backgroundPosition = 'center'
    imgArea.style.backgroundRepeat = 'no-repeat'
    imgArea.style.backgroundSize = 'contain'

    nextButton.style.height = '100%'
    nextButton.style.width = '100%'
    nextButton.style.gridArea = 'c'
    nextButton.style.display = 'flex'
    nextButton.style.justifyItems  = 'center'
    nextButton.style.alignItems = 'center'
    nextButton.style.justifyContent  = 'center'
    nextButton.style.alignContent = 'center'


    // event listeners

    nextButton.addEventListener('pointerdown', () =>{
        const data = getNextTutorialData.next().value
        const isOver = data.isOver
        if (isOver){
            goToMenu()
            return
        }

        const text = data.text
        const canvasDescription = data.canvasDescription
        goToTutorialScreen(text, canvasDescription)
    })
   
  

    return function (){return r;};
}

let getNextTutorialData = gen_getNextTutorialData()
function* gen_getNextTutorialData(){
    let r = {
        isOver: false,
        text: '',
        canvasDescription: new CanvasDescription(new Schedule(), new Schedule(), window.innerWidth, window.innerHeight*0.8)
    }

    const plot = [
        {
            isOver: false,
            text: '',
            canvasDescription: new CanvasDescription(new Schedule(), new Schedule(), window.innerWidth, window.innerHeight*0.8)
        },
        {
            isOver: false,
            text: '',
            canvasDescription: new CanvasDescription(new Schedule(), new Schedule(), window.innerWidth, window.innerHeight*0.8)
        },
        {
            isOver: false,
            text: '',
            canvasDescription: new CanvasDescription(new Schedule(), new Schedule(), window.innerWidth, window.innerHeight*0.8)
        },
        {
            isOver: false,
            text: '',
            canvasDescription: new CanvasDescription(new Schedule(), new Schedule(), window.innerWidth, window.innerHeight*0.8)
        },
        {
            isOver: true,
            text: '',
            canvasDescription: new CanvasDescription(new Schedule(), new Schedule(), window.innerWidth, window.innerHeight*0.8)
        }
    ]

    let i = 0
    while (true){
        if(plot[i].isOver === false){
            i++
        }
        yield r = plot[i]
    }

}