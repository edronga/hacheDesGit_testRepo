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

