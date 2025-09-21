'use strict'

function goToMenu (){
    gameData.getCurrentPage = menuScreen
}

function goToPuzzleModeDifficultySelection (){
    gameData.getCurrentPage = puzzleModeDifficultySelectionScreen
}

function goToPuzzleModeGameEasy () {
    gameData.getCurrentPage = oneDayPuzzleModeScreen
    gameData.initialize('easy')
}

function goToPuzzleModeGameMedium (){
    gameData.getCurrentPage = oneDayPuzzleModeScreen
    gameData.initialize('medimu')
}

function goToPuzzleModeGameHard (){
    gameData.getCurrentPage = oneDayPuzzleModeScreen
    gameData.initialize('hard')
}

function goToPuzzleModeGameCustomDifficulty (){
    gameData.getCurrentPage = oneDayPuzzleModeScreen
    gameData.initialize('custom')
}

function goToPuzzleModeGameOverScreen () {
    gameData.getCurrentPage = puzzleModeGameOverScreen
    gameData.playerScore = checkMajorConstraints(gameData.canvasDescription.schedule.value) + 100* gameData.chemoSlotsDescription.unplacedSlots.length
}

