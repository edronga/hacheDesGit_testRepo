'use strict'

function playRecordedDataScreen(dataSourceGeneratorFunction = gameData.playRecordedDataScreen.data.dataSourceGeneratorFunction, goToNextScreenFunction = gameData.playRecordedDataScreen.data.next , canvasDescription =  gameData.playRecordedDataScreen.data.canvasDescription){
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

    const buttonsDivContent = getRecordedDataScreenButtonsDivContent(buttonsDiv.style.height, buttonsDiv.style.width, canvasDescription)
    buttonsDiv.appendChild(buttonsDivContent)

    // event listeners

    const event = dataSourceGeneratorFunction.next().value
    const handleSimulatedEvents = function(){
        if (event.type === 'pointerdown'){
            const x = event.x
            const y = event.y
            canvasDescription.tryAndGrabARectangle (x, y)
            return event;
        }
        else if (event.type === 'pointermove'){
            const x = event.x
            const y = event.y
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
        }
        else if (event.type === 'pointerup'){
            canvasDescription.ungrabFloatingRectangle()
        }
        else if (event.type === 'over'){
            r.addEventListener('pointerdown', goToNextScreenFunction)
        }
    }()

    return r;
}

function getRecordedDataScreenButtonsDivContent(HEIGHT, WIDTH, canvasDescription){
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

    const divList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
    divList.forEach((value, index) =>{
        const color = getHSLColorFromDuration(index + 1)
        r.querySelector(`#buttonDiv${value}`).innerHTML = `<span style = 'color:${color}'>\u25A0 (x0)</span>`
        
    })

    const currentScore = checkMajorConstraints(gameData.playRecordedDataScreen.data.canvasDescription.schedule.value)
    const bestScore = gameData.playRecordedDataScreen.data.bestFoundScore
    const worstScore = gameData.playRecordedDataScreen.data.worstFoundScore
    r.querySelector(`#buttonDivScore`).innerHTML = `${currentScore}`
    r.querySelector(`#buttonDivScore`).style.backgroundColor = function(){
        if (currentScore > 100){
            return 'paleTurquoise'
        }
        if (currentScore <  bestScore ){
            return 'yellow'
        }
        if (currentScore - bestScore <= 3){
            return `hsl(130, 100%, ${50 + (currentScore - bestScore)* 10}%)`
        }
        return `hsl(130, 75%, ${80 + ((currentScore - 3 - bestScore)/(worstScore - 3 - bestScore) )* 20}%)`
    }()

    r.querySelector(`#buttonDivok`).innerHTML = `\u{1F44D}`

    return r
}

let dataSourceGeneratorFunction = function(){}
function* gen_dataSourceGeneratorFunction(dataSource){
    /*
        dataSource format = [{event{type : string, x: number, y: number, numberOfEvents: number}]
        type is either 'pointerdown', 'pointerup', 'pointermove', 'null', 'over'
    */

    let r = {
        event: '',
        x: 0,
        y: 0
    }

    const data = function uncompress (){
        let r = []
        dataSource.forEach((value) =>{
            for (let i = 0; i< value.numberOfEvents; i++){
                r.push({
                    type: value.type,
                    x: value.x,
                    y: value.y
                })
            }
        })
        return r;
    }()

    let i = 0
    
    while (true){
        r = data[i]
        yield r;

        if (r.type !== 'over'){
            i++
        }
    }

}

const recordData = {
    recordedData: [],
    recordingInProgress: false,
    Event: class {
        constructor(eventType, x, y){
            this.type = eventType
            this.x = x
            this.y = y
            this.numberOfEvents = 1
        }
    },
    loopTracker: function() {
        if (this.recordingInProgress === false){
            return;
        }
        const l = this.recordedData.length
        if (l === 0){
            return;
        }

        if (this.recordedData[l - 1].type === null){
            this.recordedData[l - 1].numberOfEvents++
            return;
        }
        else{
            this.recordedData.push(new this.Event(null, undefined, undefined))
        }      
    },
    startRecordingEvents: function(){
    
        this.recordingInProgress = true
        /*
        dataSource format = [{event{type : string, x: number, y: number, numberOfEvents: number}]
        type is either 'pointerdown', 'pointerup', 'pointermove', 'null', 'over'
        */
        document.addEventListener('pointerdown', (e) =>{
            const event = new this.Event('pointerdown', e.clientX, e.clientY)
            this.recordedData.push(event)
        })
        document.addEventListener('pointermove', (e) =>{
            const event = new this.Event('pointermove', e.clientX, e.clientY)
            this.recordedData.push(event)
        })
        document.addEventListener('pointerup', (e) =>{
            const event = new this.Event('pointerup', e.clientX, e.clientY)
            this.recordedData.push(event)
        })
        },
    stopRecordingEvents: function(){
        this.recordingInProgress = false
        this.recordedData.push(new this.Event('over', undefined, undefined))
        document.removeEventListener('pointerdown', (e) =>{
            const event = new this.Event('pointerdown', e.clientX, e.clientY)
            this.recordedData.push(event)
        })
        document.removeEventListener('pointermove', (e) =>{
            const event = new this.Event('pointermove', e.clientX, e.clientY)
            this.recordedData.push(event)
        })
        document.removeEventListener('pointerup', (e) =>{
            const event = new this.Event('pointerup', e.clientX, e.clientY)
            this.recordedData.push(event)
        })
    }
}
