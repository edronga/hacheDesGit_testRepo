'use strict'

function goToMenu (){
    gameData.newColorTheme()
    gameData.getCurrentPage = menuScreen
}

function goToTutorialScreen(text, canvasDescription){
    gameData.getCurrentPage = tutorialScreen(text, canvasDescription)
}

function goToBestScoresScreen(){
    trophyAnimation = gen_trophyAnimation()
    gameData.getCurrentPage = bestScoresScreen
}

function goToPuzzleModeDifficultySelection (){
    gameData.getCurrentPage = puzzleModeDifficultySelectionScreen
}

function goToPuzzleModeGameEasy () {
    gameData.gameMode = 'puzzle'
    gameData.getCurrentPage = oneDayPuzzleModeScreen
    gameData.initialize('easy')
}

function goToPuzzleModeGameMedium (){
    gameData.gameMode = 'puzzle'
    gameData.getCurrentPage = oneDayPuzzleModeScreen
    gameData.initialize('medium')
}

function goToPuzzleModeGameHard (){
    gameData.gameMode = 'puzzle'
    gameData.getCurrentPage = oneDayPuzzleModeScreen
    gameData.initialize('hard')
}

function goToPuzzleModeGameCustomDifficulty (){
    gameData.gameMode = 'puzzle'
    gameData.getCurrentPage = oneDayPuzzleModeScreen
    gameData.initialize('custom')
}

function goToPuzzleModeGameOverScreen () {
    gameData.getCurrentPage = puzzleModeGameOverScreen
    gameData.playerScore = checkMajorConstraints(gameData.canvasDescription.schedule.value) + 100* gameData.chemoSlotsDescription.unplacedSlots.length + 100* (gameData.canvasDescription.isThereAFloatingRectangle() ? 1 : 0)
}

function goToStoryModeScreen(){
    gameData.gameMode = 'story'
    gameData.storyModeData.initialize()
    storyNavigation.storyScreenCursor = 0
    gameData.getCurrentPage = storyNavigation.goToNextStoryScreen()
}


