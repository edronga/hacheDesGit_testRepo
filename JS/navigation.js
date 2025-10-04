'use strict'

function goToMenu (){
    gameData.getCurrentPage = menuScreen
}

function goToTutorialScreen(text, canvasDescription){
    gameData.getCurrentPage = tutorialScreen(text, canvasDescription)
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
    gameData.initialize('medium')
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
    gameData.playerScore = checkMajorConstraints(gameData.canvasDescription.schedule.value) + 100* gameData.chemoSlotsDescription.unplacedSlots.length + 100* (gameData.canvasDescription.isThereAFloatingRectangle() ? 1 : 0)
}

