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
                return false
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
    r.style.gridTemplateColumns = 'repeat(4, 1fr)'
    r.style.gridTemplateRows = 'repeat(3, 1fr)'
    r.style.gap = '0px'
    r.style.alignContent = 'center'
    r.style.justifyContent = 'center'

    const order = [[1,1], [1,2], [1,3], [2,1], [2,2], [2,3], [3,1], [3,2], [3,3], [4,1], [4,2], [4,3]]
    order.forEach((columnXrow, index) =>{
        const div = document.createElement('div')
        r.appendChild(div)
        div.id = `buttonDiv${index +1}`
        div.style.gridColumnStart = columnXrow[0]
        div.style.gridRowStart = columnXrow[1]
        div.style.display = 'grid'
        div.style.alignContent = 'center'
        div.style.justifyContent = 'center'
        div.style.border = 'solid black 1px'
        const p = document.createElement('p')
        div.appendChild(p)
        p.style.margin = 0
        p.innerHTML = `${index + 1}`
    })

    const unplacedSlotsList = function(){
        let r = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        unplacedSlots.forEach((timeSlot) =>{
            r[timeSlot - 1]++
        })
        return r;
    }()
    const divList = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    divList.forEach((value) =>{
        r.querySelector(`#buttonDiv${value}`).innerHTML = `${value}h (x${unplacedSlotsList[value - 1]})`
    })
    divList.forEach((value) =>{
        r.querySelector(`#buttonDiv${value}`).addEventListener('pointerdown', (e)=>{
            if (canvasDescription.isThereAFloatingRectangle()){
                return;
            }
            if (unplacedSlotsList[value - 1] === 0){
                return;
            }
            const name = generateUniqueName.next().value
            const width = 0.18 * canvasDescription.width
            const height = value * 0.09 * canvasDescription.height
            const xPosition = (canvasDescription.width - width) * 0.5
            const yPosition = (canvasDescription.height - height) * 0.5
            const color = getBrightColor(value)
            const scheduleData = {durationInHours: value}
            gameData.canvasDescription.floatingRectangleData = gameData.canvasDescription.addRectangleToDataset(gameData.canvasDescription.floatingRectangleData, name, xPosition, yPosition, width, height, 'black', color, scheduleData)
            gameData.chemoSlotsDescription.unplacedSlots = function(){ // to refactor, put a method in gameData
                let r = []
                for (let i = 0; i< unplacedSlots.length ; i++){
                    if(unplacedSlots[i] === value){
                        if (i === unplacedSlots.length-1){
                            return r = unplacedSlots.slice(0, i)
                        }
                        return r = r.concat(unplacedSlots.slice(0, i), unplacedSlots.slice(i+1))
                    }
                }
            }()
        })
    })

    const currentScore = checkMajorConstraints(gameData.canvasDescription.schedule.value) + 100* gameData.chemoSlotsDescription.unplacedSlots.length
    r.querySelector(`#buttonDiv10`).innerHTML = `${currentScore}`
    r.querySelector(`#buttonDiv10`).addEventListener('pointerdown', (e) =>{
    })

    r.querySelector(`#buttonDiv11`).innerHTML = `??`
    r.querySelector(`#buttonDiv11`).addEventListener('pointerdown', (e) =>{
        
    })

    r.querySelector(`#buttonDiv12`).innerHTML = `OK`
    r.querySelector(`#buttonDiv12`).addEventListener('pointerdown', goToPuzzleModeGameOverScreen)

    return r
}
