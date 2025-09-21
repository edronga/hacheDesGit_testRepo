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
    const solution = greedySolve(gameData.chemoSlotsDescription.completeList)
    gameData.canvasDescription.schedule = solution.copy()
    gameData.canvasDescription.setRectanglesData = gameData.canvasDescription.convertScheduleToRectanglesDataset(solution.value, gameData.canvasDescription.width, gameData.canvasDescription.height)
    gameData.canvasDescription.floatingRectangleData = {}
    gameData.canvasDescription.targetRectangleData = {}
    gameData.chemoSlotsDescription.placedSlots = gameData.chemoSlotsDescription.completeList
    gameData.chemoSlotsDescription.unplacedSlots = []
}

