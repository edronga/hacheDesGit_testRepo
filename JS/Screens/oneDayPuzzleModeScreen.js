'use strict'


function oneDayPuzzleModeScreen(canvasDescription = gameData.canvasDescription){
    let r = document.createElement('div')
    r.style.margin = 0
    r.style.height = '95dvh'
    r.style.width = '100dvw'

    const canvas = document.createElement('canvas')
    r.appendChild(canvas)
    const CANVAS_HEIGHT = 0.8
    const CANVAS_WIDTH = 1
    canvas.height = window.innerHeight * CANVAS_HEIGHT
    canvas.width = window.innerWidth * CANVAS_WIDTH
    const ctx = canvas.getContext('2d')

    canvasDescription.drawAll(canvas.width, canvas.height, ctx)

    const buttonsDiv = document.createElement('div')
    buttonsDiv.style.margin = 0
    buttonsDiv.style.height = `${95 - 95 * CANVAS_HEIGHT}dvh`
    buttonsDiv.style.width = '100dvw'
    r.appendChild(buttonsDiv)

    const buttonsDivContent = getButtonsDivContent(buttonsDiv.style.height, buttonsDiv.style.width)
    buttonsDiv.appendChild(buttonsDivContent)

    // event listeners

    canvas.addEventListener('pointerdown', (e) =>{
        const x = e.clientX
        const y = e.clientY
        canvasDescription.tryAndGrabARectangle (x, y)
    })

    // require that document has css property touch-action : none (by default, panning and scrolling are handled exclusively by the browser, so continuous 'pointermove events' stop firing very quickly if option is not disabled)
    r.addEventListener('pointermove', (e) =>{
        const x = e.clientX
        const y = e.clientY
        const outOfBoundCondition = function (){
            if (canvasDescription.isThereAFloatingRectangle() === false){
                return false;
            }
            if (canvasDescription.isFloatingRectangleGrabbed === false){
                return false;
            }
            const PIXEL_MARGIN = 3
            if (x < 0 + PIXEL_MARGIN){
                return true;
            }
            if (x > canvas.width - PIXEL_MARGIN){
                return true;
            }
            if (y < 0 + PIXEL_MARGIN){
                return true;
            }
            if (y > canvas.height - PIXEL_MARGIN){
                return true;
            }
            return false
        }()
        if (outOfBoundCondition){
            const floatingRectangleData = canvasDescription.removeFloatingRectangle()
            gameData.chemoSlotsDescription.unplacedSlots.push(floatingRectangleData.durationInHours)
            return
        }
        else {
            canvasDescription.updateFloatingRectanglePosition(x, y)
        }
    })

    canvas.addEventListener('pointerup', (e) =>{
        canvasDescription.ungrabFloatingRectangle()
    })

    return r;
}

function getButtonsDivContent(HEIGHT, WIDTH, unplacedSlots = gameData.chemoSlotsDescription.unplacedSlots, canvasDescription = gameData.canvasDescription){
    let r = document.createElement('div')
    r.style.margin = 0
    r.style.height = HEIGHT
    r.style.width = WIDTH

    r.style.display = 'grid'
    r.style.gridTemplate = `
    'a d g s' 6dvh
    'b e h s' 6dvh
    'c f i ok' 6dvh / 25dvw 25dvw 25dvw 25dvw 
    `
    r.style.gap = '0px'
    r.style.alignContent = 'center'
    r.style.justifyContent = 'center'
    r.style.alignItems = 'center'
    r.style.justifyItems = 'center'

    const order = [[1,1], [1,2], [1,3], [2,1], [2,2], [2,3], [3,1], [3,2], [3,3],[4,3]]
    const gridAreaOrder = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'ok']
    order.forEach((columnXrow, index) =>{
        const div = document.createElement('div')
        r.appendChild(div)
        div.id = `buttonDiv${gridAreaOrder[index]}`
        div.style.gridArea = gridAreaOrder[index]
        div.style.display = 'grid'
        div.style.alignContent = 'center'
        div.style.justifyContent = 'center'
        div.style.width = '23dvw'
        div.style.height = '5dvh'
        div.style.border = `solid black 1px`
        div.style.borderRadius = '5%'
        const p = document.createElement('p')
        div.appendChild(p)
        p.style.margin = 0
    })

    const scoreDiv = document.createElement('div')
    r.appendChild(scoreDiv)
    scoreDiv.style.gridArea = 's'
    scoreDiv.id = 'buttonDivScore'
    scoreDiv.style.display = 'grid'
    scoreDiv.style.alignContent = 'center'
    scoreDiv.style.justifyContent = 'center'
    scoreDiv.style.alignItems = 'center'
    scoreDiv.style.justifyItems = 'center'
    scoreDiv.style.width = '23dvw'
    scoreDiv.style.height = '11dvh'
    scoreDiv.style.border = `solid black 1px`
    scoreDiv.style.borderRadius = '5%'
    scoreDiv.style.fontSize = '6dvh'

    const unplacedSlotsList = function(){
        let r = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        unplacedSlots.forEach((timeSlot) =>{
            r[timeSlot - 1]++
        })
        return r;
    }()
    const divList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    divList.forEach((value, index) =>{
        const color = getHSLColorFromDuration(index + 1)
        r.querySelector(`#buttonDiv${value}`).innerHTML = `<span style = 'color:${color}'>\u25A0 (x${unplacedSlotsList[index]})</span>`
        if (unplacedSlotsList[index] > 0){
            r.querySelector(`#buttonDiv${value}`).style.backgroundColor = `${getHSLColorFromDuration(index+1, 75, 95)}`
        }
        
    })
    divList.forEach((value, index) =>{
        r.querySelector(`#buttonDiv${value}`).addEventListener('pointerdown', (e)=>{
            if (canvasDescription.isThereAFloatingRectangle()){
                return;
            }
            if (unplacedSlotsList[index] === 0){
                return;
            }
            const name = generateUniqueName.next().value
            const width = 0.18 * canvasDescription.width
            const height = (index + 1) * 0.09 * canvasDescription.height
            const xPosition = canvasDescription.width * 0.18 * 4 * 0.5 + 0.1* canvasDescription.width
            const yPosition = (canvasDescription.height - height) * 0.5
            const color = getHSLColorFromDuration(index + 1)
            const scheduleData = {durationInHours: index + 1}
            gameData.canvasDescription.floatingRectangleData = gameData.canvasDescription.addRectangleToDataset(gameData.canvasDescription.floatingRectangleData, name, xPosition, yPosition, width, height, 'black', color, scheduleData)
            gameData.chemoSlotsDescription.unplacedSlots = function(){ // to refactor, put a method in gameData
                let r = []
                for (let i = 0; i< unplacedSlots.length ; i++){
                    if(unplacedSlots[i] === index + 1){
                        if (i === unplacedSlots.length-1){
                            return r = unplacedSlots.slice(0, i)
                        }
                        return r = r.concat(unplacedSlots.slice(0, i), unplacedSlots.slice(i+1))
                    }
                }
            }()
        })
    })

    const currentScore = checkMajorConstraints(gameData.canvasDescription.schedule.value) + 100* gameData.chemoSlotsDescription.unplacedSlots.length + 100*(gameData.canvasDescription.isThereAFloatingRectangle() ? 1 : 0)
    r.querySelector(`#buttonDivScore`).innerHTML = `${currentScore}`
    r.querySelector(`#buttonDivScore`).style.backgroundColor = function(){
        if (currentScore > 100){
            return 'paleTurquoise'
        }
        if (currentScore <  gameData.bestFoundScore ){
            return 'yellow'
        }
        if (currentScore - gameData.bestFoundScore <= 2){
            return `hsl(130, ${100 - (currentScore - gameData.bestFoundScore)* (25/2)}%, 50%)`
        }
        return `hsl(130, 75%, ${50 + ((currentScore - 2 - gameData.bestFoundScore)/(gameData.worstFoundScore - 2 - gameData.bestFoundScore) )* 45}%)`
    }()

    r.querySelector(`#buttonDivok`).innerHTML = `\u{1F44D}`
    r.querySelector(`#buttonDivok`).addEventListener('pointerdown', () =>{
        if (gameData.gameMode === 'puzzle'){
            goToPuzzleModeGameOverScreen()
            return;
        }
        if (gameData.gameMode === 'story'){
            const scoreCode = function(){
                if (currentScore === gameData.bestFoundScore){
                    return 'hasEqualized'
                }
                if (currentScore < gameData.bestFoundScore){
                    return 'hasBeaten'
                }
                return 'hasTried'
            }()
            gameData.storyModeData.updateScore(scoreCode)
            gameData.storyModeData.currentLevel++
            gameData.getCurrentPage = storyNavigation.goToNextStoryScreen()
            return;
        }
        if (gameData.gameMode === 'tutorial'){
            const data = getNextTutorialData.next().value
            const text = data.getText()
            const canvasDescription = data.getCanvasDescription()
            goToTutorialScreen(text, canvasDescription)
                return;
        }
    }
    )

    return r
}
