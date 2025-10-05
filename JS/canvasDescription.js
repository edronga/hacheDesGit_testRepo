'use strict'

class CanvasDescription {
    constructor(schedule, fixedSchedule, canvasWidth, canvasHeight){
        this.setRectanglesData = {}
        this.floatingRectangleData = {}
        this.targetRectangleData = {}
        this.schedule = schedule
        this.fixedSchedule = fixedSchedule
        this.width = canvasWidth
        this.height = canvasHeight  
        this.isFloatingRectangleGrabbed = false  
        this.setRectanglesData = this.convertScheduleToRectanglesDataset(this.schedule.value, canvasWidth, canvasHeight)
    }
    COLOR_FOR_FIXED_SLOTS = 'silver'
    addRectangleToDataset(rectanglesDataset, name, xPosition, yPosition, width, height, strokeStyle, fillStyle, scheduleData){
        if (rectanglesDataset[name] !== undefined){
            console.log(`A rectangle with the name ${name} already exists`)
            console.trace()
            return rectanglesDataset
        }
        let r = {...rectanglesDataset}
        const isFixed = checkIfFixed (scheduleData, this.fixedSchedule.value)
        function checkIfFixed (scheduleData, fixedScheduleValue){
            if (Object.keys(fixedScheduleValue) === 0){
                return false;
            }
            let r = false
            Object.keys(fixedScheduleValue).forEach((name2) =>{
                const durationInHours = fixedScheduleValue[name2].durationInHours
                const startingTime = fixedScheduleValue[name2].startingTime
                const room = fixedScheduleValue[name2].room
                if (scheduleData.durationInHours === durationInHours && scheduleData.startingTime === startingTime && scheduleData.room === room){
                    r = true
                }
            })
            return r;
        }
        r[name] = {
            xPosition: xPosition,
            yPosition: yPosition,
            width: width,
            height: height,
            fillStyle: fillStyle,
            strokeStyle: strokeStyle,
            relativePointerPosition: {
                x: 0,
                y: 0
            },
            scheduleData: scheduleData,
            isFixed: isFixed
        }
        return r;
    }
    removeRectangleFromDataset(rectanglesDataset, name){
        let r = function(){
            let r = {}
            Object.keys(rectanglesDataset).forEach((rectangleName) =>{
                if (rectangleName === name){
                    return
                }
                r[rectangleName] = {... rectanglesDataset[rectangleName]}
            })
            return r
        }()
        return r;
    }
    getFloatingRectangleName(){
        return Object.keys(this.floatingRectangleData)[0]
    }
    getTargetRectangleName(){
        return Object.keys(this.targetRectangleData)[0]
    }
    isThereAFloatingRectangle(){
        return Object.keys(this.floatingRectangleData)[0] !== undefined
    }
    isThereATargetRectangle(){
        return Object.keys(this.targetRectangleData)[0] !== undefined
    }
    updateFloatingRectanglePosition(newXPosition, newYPosition){
        if (this.isFloatingRectangleGrabbed === false){
            return;
        }
        const name = this.getFloatingRectangleName()
        this.floatingRectangleData[name].xPosition = newXPosition - this.floatingRectangleData[name].relativePointerPosition.x
        this.floatingRectangleData[name].yPosition = newYPosition - this.floatingRectangleData[name].relativePointerPosition.y    
        this.targetRectangleData = this.findTargetRectangle(name)   
    }
    removeFloatingRectangle(){
        const name = this.getFloatingRectangleName()
        const data = this.floatingRectangleData[name].scheduleData
        this.floatingRectangleData = {}
        this.isFloatingRectangleGrabbed = false
        this.targetRectangleData = {}
        this.schedule.removeChemoSlot(name)
        return data
    }
    grabSetRectangle(name, xPointerPosition, yPointerPosition){
        const rectangle = {... this.setRectanglesData[name]}
        if (rectangle.isFixed){
            return;
        }
        this.setRectanglesData = this.removeRectangleFromDataset(this.setRectanglesData, name)
        this.schedule = this.schedule.copyScheduleWithoutSlotName(this.schedule, name)
        this.floatingRectangleData = this.addRectangleToDataset({}, name, rectangle.xPosition, rectangle.yPosition, rectangle.width, rectangle.height, rectangle.strokeStyle, rectangle.fillStyle, rectangle.scheduleData)
        this.floatingRectangleData[name].relativePointerPosition = {
            x: xPointerPosition - this.floatingRectangleData[name].xPosition,
            y: yPointerPosition - this.floatingRectangleData[name].yPosition
        }
        this.targetRectangleData = this.findTargetRectangle(name)
        this.isFloatingRectangleGrabbed = true
    }
    tryAndGrabARectangle(xPointerPosition, yPointerPosition){
        if (Object.keys(this.floatingRectangleData)[0] !== undefined){
            const name = this.getFloatingRectangleName()
            const x = xPointerPosition
            const y = yPointerPosition
            const rectX = this.floatingRectangleData[name].xPosition
            const rectY = this.floatingRectangleData[name].yPosition
            const w = this.floatingRectangleData[name].width
            const h = this.floatingRectangleData[name].height
            let isThePointerInTheRectangle = function (){
                if (x > rectX && x < rectX + w && y > rectY && y < rectY + h){
                    return true
                }
                else{
                    return false
                }
            }()
            if (isThePointerInTheRectangle){
                this.isFloatingRectangleGrabbed = true
                this.floatingRectangleData[name].relativePointerPosition = {
                    x: xPointerPosition - this.floatingRectangleData[name].xPosition,
                    y: yPointerPosition - this.floatingRectangleData[name].yPosition
                }
                this.updateFloatingRectanglePosition(xPointerPosition, yPointerPosition)
            }
            return;
        }
        const x = xPointerPosition
        const y = yPointerPosition
        Object.keys(this.setRectanglesData).forEach((rectangleName) =>{
            const rectX = this.setRectanglesData[rectangleName].xPosition
            const rectY = this.setRectanglesData[rectangleName].yPosition
            const w = this.setRectanglesData[rectangleName].width
            const h = this.setRectanglesData[rectangleName].height
            let isThePointerInTheRectangle = function (){
                if (x > rectX && x < rectX + w && y > rectY && y < rectY + h){
                    return true
                }
                else{
                    return false
                }
            }()
            if (isThePointerInTheRectangle){
                this.grabSetRectangle(rectangleName, x, y)
                return;
            }
        })
    }
    ungrabFloatingRectangle(){  
        if (this.isThereATargetRectangle() === false){
            this.isFloatingRectangleGrabbed = false
            return;
        }
        else {
            const name = this.getTargetRectangleName()
            const x = this.targetRectangleData[name].xPosition
            const y = this.targetRectangleData[name].yPosition
            const w = this.targetRectangleData[name].width
            const h = this.targetRectangleData[name].height
            const strokeStyle = this.floatingRectangleData[name].strokeStyle
            const fillStyle = this.floatingRectangleData[name].fillStyle
            const scheduleData = this.floatingRectangleData[name].scheduleData
            this.setRectanglesData = this.addRectangleToDataset(this.setRectanglesData, name, x, y, w, h, strokeStyle, fillStyle, scheduleData)

            const startingTime = this.targetRectangleData[name].scheduleData.startingTime
            const durationInHours = this.targetRectangleData[name].scheduleData.durationInHours
            const room = this.targetRectangleData[name].scheduleData.room
            
            this.schedule.removeChemoSlot(name)
            this.schedule.addChemoSlot(startingTime, durationInHours, room, name)

            this.floatingRectangleData = {}
            this.targetRectangleData = {}

            this.isFloatingRectangleGrabbed = false
        }
    }
    drawBackground(canvasWidth, canvasHeight, ctx){
        let firstX = 0.20
        let interval = 0.18
        for (let i = 0 ; i<= 4; i++){
            drawLine(firstX + i* interval, 0.05, firstX + i* interval, 0.05 + 0.045 * 20, ctx, canvasWidth, canvasHeight)
        }
        let firstY = 0.05
        interval = 0.045
        for (let i = 0; i<= 20; i++){
            drawLine(firstX - 0.02, firstY + i * interval, 0.20 + 0.18*4, firstY + i * interval, ctx,canvasWidth, canvasHeight)
        }
        
        const timeText = ['09h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h', '18h', '19h']
        for (let i = 0; i<= 10; i++){
            drawText(timeText[i], 0.10, 0.05+ i*0.09, ctx, canvasWidth, canvasHeight)
        }
    }
    drawSetRectangles (ctx, setRectanglesData = this.setRectanglesData){
        Object.keys(setRectanglesData).forEach((name) =>{
            const x = setRectanglesData[name].xPosition
            const y = setRectanglesData[name].yPosition
            const w = setRectanglesData[name].width
            const h = setRectanglesData[name].height
            const fillStyle = setRectanglesData[name].fillStyle
            const durationInHours = setRectanglesData[name].scheduleData.durationInHours
            const strokeStyle = setRectanglesData[name].strokeStyle
            ctx.fillStyle = setRectanglesData[name].isFixed ? this.COLOR_FOR_FIXED_SLOTS : fillStyle;
            ctx.strokeStyle = strokeStyle
            ctx.fillRect(x, y, w, h)
            ctx.strokeRect(x, y, w, h)
        })
    }
    drawFloatingRectangle(ctx, floatingRectangleData = this.floatingRectangleData){
         Object.keys(floatingRectangleData).forEach((name) =>{
            const x = floatingRectangleData[name].xPosition
            const y = floatingRectangleData[name].yPosition
            const w = floatingRectangleData[name].width
            const h = floatingRectangleData[name].height
            const fillStyle = floatingRectangleData[name].fillStyle
            const strokeStyle = floatingRectangleData[name].strokeStyle
            const durationInHours = floatingRectangleData[name].scheduleData.durationInHours
            ctx.fillStyle = getHSLColorFromDuration(durationInHours, 100, 75)
            ctx.strokeStyle = strokeStyle
            ctx.fillRect(x, y, w, h)
            ctx.strokeRect(x, y, w, h)
        })
    }
    drawAll(canvasWidth, canvasHeight, ctx){
        this.drawBackground (canvasWidth, canvasHeight, ctx)
        this.drawSetRectangles (ctx)
        this.drawTargetRectangle(ctx)
        this.drawFloatingRectangle (ctx)
    }
    findAllOptionsForSlot(slotName){
        let scheduleWithoutName = this.schedule.copyScheduleWithoutSlotName(this.schedule, slotName)
        const startingTimeOptions = [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5]
        const roomOptions = [1, 2, 3, 4]
        let options = []
        roomOptions.forEach((room) =>{
            startingTimeOptions.forEach((startingTime) =>{
                const durationInHours = this.floatingRectangleData[slotName].scheduleData.durationInHours
                if (startingTime + durationInHours > 19){
                    return;
                }
                if (scheduleWithoutName.checkIfDoubleBooking(startingTime,durationInHours, room)){
                    return;
                }
                const op = {
                    durationInHours: durationInHours,
                    startingTime: startingTime,
                    endingTime: startingTime + durationInHours,
                    room: room 
                }
                options.push(op)
            })
        })
       return options;
    }
    findAllTargetRectanglesOptions (name, canvasWidth = this.width, canvasHeight = this.height){
        const slotOptions = this.findAllOptionsForSlot(name)
        let r = []
        slotOptions.forEach((slotData) =>{
            const scheduleData = {...slotData}
            const xPosition = function(){
                return (0.20 + (slotData['room'] - 1) * 0.18) * canvasWidth
            }()
            const yPosition = function(){
                return (0.05 + (slotData['startingTime'] - 9) * 0.09) * canvasHeight

            }()
            const width = 0.18 * canvasWidth
            const height = slotData['durationInHours'] * 0.09 * canvasHeight
            const fillStyle = 'black'
            const rectangleData = {
                xPosition: xPosition,
                yPosition: yPosition,
                width: width,
                height: height,
                fillStyle: fillStyle,
                scheduleData : scheduleData
            }
            r.push(rectangleData)
        })
        return r;

    }
    findTargetRectangle (name){
        const rectangleOptions = this.findAllTargetRectanglesOptions(name)
        function collisionArea(r1XPos, r1YPos, r1Width, r1Height, r2XPos, r2YPos, r2Width, r2Height){
            const a_x1 = r1XPos
            const a_x2 = r1XPos + r1Width
            const a_y1 = r1YPos
            const a_y2 = r1YPos + r1Height
            const b_x1 = r2XPos
            const b_x2 = r2XPos + r2Width
            const b_y1 = r2YPos
            const b_y2 = r2YPos + r2Height

            const noCollision = function(){
                if (a_x2 < b_x1){
                    return true
                }
                if (a_x1 > b_x2){
                    return true
                }
                if (a_y2 < b_y1){
                    return true
                }
                if (a_y1 > b_y2){
                    return true
                }
                return false
            }()
            if (noCollision){
                return 0
            }
            
            const collisionWidth = b_x2 - a_x1 <= a_x2 - b_x1 ? b_x2 - a_x1  : a_x2 - b_x1 ;
            const collisionHeight = b_y2 - a_y1 <= a_y2 - b_y1 ? b_y2 - a_y1  : a_y2 - b_y1 ;
            return collisionWidth * collisionHeight;
        }
        let highestCollisionArea = 0
        let bestRectangleCandidate = {}

        rectangleOptions.forEach((rectangleData) =>{
            const colArea = collisionArea(rectangleData.xPosition, rectangleData.yPosition, rectangleData.width, rectangleData.height, this.floatingRectangleData[name].xPosition, this.floatingRectangleData[name].yPosition, this.floatingRectangleData[name].width, this.floatingRectangleData[name].height)
            if (colArea > highestCollisionArea){
                highestCollisionArea = colArea
                const o = {}
                o[name] = {...rectangleData}
                bestRectangleCandidate = o
            }
        })
        return bestRectangleCandidate;

    }
    drawTargetRectangle (ctx, targetRectangleData = this.targetRectangleData){
         Object.keys(targetRectangleData).forEach((name) =>{
            const x = targetRectangleData[name].xPosition
            const y = targetRectangleData[name].yPosition
            const w = targetRectangleData[name].width
            const h = targetRectangleData[name].height
            const fillStyle = 'black'
            const strokeStyle = 'black'
            ctx.fillStyle = fillStyle
            ctx.strokeStyle = strokeStyle
            ctx.fillRect(x, y, w, h)
            ctx.strokeRect(x, y, w, h)
        })
    }
    convertScheduleToRectanglesDataset(scheduleValue, canvasWidth, canvasHeight){
        let r = {}
        Object.keys(scheduleValue).forEach((name) =>{
            const xPosition = function(){
                return (0.20 + (scheduleValue[name]['room'] - 1) * 0.18) * canvasWidth
            }()
            const yPosition = function(){
                return (0.05 + (scheduleValue[name]['startingTime'] - 9) * 0.09) * canvasHeight

            }()
            const width = 0.18 * canvasWidth
            const height = scheduleValue[name]['durationInHours'] * 0.09 * canvasHeight
            const fillStyle = function(){
                const durationInHours = scheduleValue[name]['durationInHours']
                const color = getHSLColorFromDuration(durationInHours)
                return color
            }()
            const scheduleData = {...scheduleValue[name]}
            r = this.addRectangleToDataset(r, name, xPosition, yPosition, width, height,'black', fillStyle, scheduleData)
        })
        return r;
    }
}

function drawLine(xStart, yStart, xEnd, yEnd, ctx, canvasWidth, canvasHeight){
    const H = canvasHeight
    const W = canvasWidth

    ctx.beginPath()
    ctx.moveTo(xStart * W, yStart * H)
    ctx.lineTo(xEnd * W, yEnd * H)
    ctx.strokeStyle = 'black'
    ctx.stroke()

    return;
}

function drawText(text, xOfCenter, yOfCenter, ctx, canvasWidth, canvasHeight){
    const H = canvasHeight
    const W = canvasWidth

    const bestFontSize = findBestFontSize(text, W, H, ctx)
    function findBestFontSize(text, canvasWidth, canvasHeight, ctx){
        let r = 1 // pixels

        const arr = function(){
            let r = []
            for (let i = 1; i <= 30; i++){
                r.push(i)
            }
            return r
        }()

        const target = canvasWidth * 0.07
        let currentBest = 100
        arr.forEach((value) =>{
            const s = `${value}px sans-serif`
            ctx.font = s
            const length = ctx.measureText(text).width
            const diff = Math.abs(target - length)
            if (diff < currentBest){
                currentBest = diff
                r = value
            }
        })

        return r;
    }
    ctx.font = `${bestFontSize}px sans-serif`
    const textWidth = ctx.measureText(text).width

    ctx.textBaseline = 'middle'
    ctx.fillText(text, xOfCenter*W - textWidth/2, yOfCenter*H)

    return;
}