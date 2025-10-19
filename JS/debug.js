'use strict'

// debugging utilities

let debug = {}

debug["showPointerData"] = function(){
    document.addEventListener('pointerdown', () =>{
        pointer.debug()
    })
    document.addEventListener('pointerup', () =>{
        pointer.debug()
    })
    document.addEventListener('pointermove', () =>{
        pointer.debug()
    })
    
}
debug["stopShowingPointerData"] = function(){
    document.removeEventListener('pointerdown', () =>{
        pointer.debug()
    })
    document.removeEventListener('pointerup', () =>{
        pointer.debug()
    })
    document.removeEventListener('pointermove', () =>{
        pointer.debug()
    })
}

debug['debugBreak'] = false
debug['stopLoop'] = function (){
    debugBreak = true
}
debug['breakLoop'] = function (){
    debug.debugBreak = true
}

debug['solve'] = function(){
    const solution = greedySolve(gameData.chemoSlotsDescription.completeList, gameData.chemoSlotsDescription.fixedSchedule)
    gameData.canvasDescription.schedule = solution.copy()
    gameData.canvasDescription = new CanvasDescription(solution, gameData.chemoSlotsDescription.fixedSchedule, window.innerWidth, window.innerHeight*0.8)
    gameData.chemoSlotsDescription.placedSlots = gameData.chemoSlotsDescription.completeList
    gameData.chemoSlotsDescription.unplacedSlots = []
}

debug['complexEasySchedulesGenerator'] = function (numberOfSchedules, maxIterations = 10000){
    const startingTime = Date.now()
    let r = []
    let i = 0
    while(r.length < numberOfSchedules && i < maxIterations){
        i++
        const fixedSchedule = generateRandomSchedule(3)
        const slotlist = generateSlotlist('easy', fixedSchedule)

        if (checkMajorConstraints(greedySolve(slotlist, fixedSchedule).value) > checkMajorConstraints(exactSolver(slotlist, fixedSchedule).value)){
            r.push({
                slotlist: slotlist,
                fixedSchedule: fixedSchedule.copy()
            })
        }
    }
    console.log('elapsed time was ', Date.now() - startingTime, ' ms')
    console.log('number of loops was ', i)
    return r;
}

debug['goodMediumSchedulesGenerator'] = function (numberOfSchedules, maxTime = 10000){
    const startingTime = Date.now()
    let r = []
    let i = 0
    while(r.length < numberOfSchedules && i < 10){
        i++
        const fixedSchedule = generateRandomSchedule(3)
        const slotlist = function(){
                let r = []
                const TOTAL_TIME = 40
                const remainingTime = TOTAL_TIME - Object.keys(fixedSchedule.value).reduce((previousValue, name) =>{
                    return previousValue + fixedSchedule.value[name].durationInHours
                }, 0)
                const options = function(){
                    let r = []
                    const table1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
                    const table2 = [9, 8, 7, 6, 5, 4, 3, 2, 1]
                    table1.forEach((value, index)=>{
                        for (let i = 0; i< table2[index]; i++){
                            r.push(value)
                        }
                    })
                    return r;
                }()
                function helper(array, max){
                    const random = Math.floor(Math.random() * options.length)
                    let r = [...array]
                    r.push(options[random])
                    if (r.reduce((previousValue, currentValue) => {return previousValue + currentValue}, 0) < max){
                        return helper(r, max)
                    } 
                    else {
                        return array
                    }
                }
                return helper([], remainingTime * 0.7)
            }()

        console.log(slotlist, fixedSchedule)
        if (checkMajorConstraints(greedySolve(slotlist, fixedSchedule).value) > checkMajorConstraints(exactSolver(slotlist, fixedSchedule).value)){
            r.push({
                slotlist: slotlist,
                fixedSchedule: fixedSchedule.copy()
            })
        }


    }
    console.log('elapsed time was ', Date.now() - startingTime, ' ms')
    console.log('number of loops was ', i)
    return r;
}

debug['goodHardSchedulesGenerator'] = function (numberOfSchedules, maxTime = 10000){
    const startingTime = Date.now()
    let r = []
    let i = 0
    while(r.length < numberOfSchedules && i < 10){
        i++
        const fixedSchedule = generateRandomSchedule(3)
        const slotlist = function(){
                let r = []
                const TOTAL_TIME = 40
                const remainingTime = TOTAL_TIME - Object.keys(fixedSchedule.value).reduce((previousValue, name) =>{
                    return previousValue + fixedSchedule.value[name].durationInHours
                }, 0)
                const options = function(){
                    let r = []
                    const table1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
                    const table2 = [9, 8, 7, 6, 5, 4, 3, 2, 1]
                    table1.forEach((value, index)=>{
                        for (let i = 0; i< table2[index]; i++){
                            r.push(value)
                        }
                    })
                    return r;
                }()
                function helper(array, max){
                    const random = Math.floor(Math.random() * options.length)
                    let r = [...array]
                    r.push(options[random])
                    if (r.reduce((previousValue, currentValue) => {return previousValue + currentValue}, 0) < max){
                        return helper(r, max)
                    } 
                    else {
                        return array
                    }
                }
                return helper([], remainingTime * 0.9)
            }()

        console.log(slotlist, fixedSchedule)
        if (checkMajorConstraints(greedySolve(slotlist, fixedSchedule).value) > checkMajorConstraints(exactSolver(slotlist, fixedSchedule).value)){
            r.push({
                slotlist: slotlist,
                fixedSchedule: fixedSchedule.copy()
            })
        }


    }
    console.log('elapsed time was ', Date.now() - startingTime, ' ms')
    console.log('number of loops was ', i)
    return r;

}

debug['bestScores'] = function(){
    Object.keys(gameData.medalsCounter).forEach((difficulty) =>{
        Object.keys(gameData.medalsCounter[difficulty]).forEach((result) =>{
            gameData.medalsCounter[difficulty][result] = 1
        })
    })
}

debug['maxScores'] = debug['bestScores']

debug['getMaxScores'] = debug['bestScores']

debug['resetScores'] = function(){
    Object.keys(gameData.medalsCounter).forEach((difficulty) =>{
        Object.keys(gameData.medalsCounter[difficulty]).forEach((result) =>{
            gameData.medalsCounter[difficulty][result] = 0
        })
    })
}



