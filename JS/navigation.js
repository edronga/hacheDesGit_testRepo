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
    storyNavigation.storyScreenCursor = 0
    gameData.getCurrentPage = storyNavigation.goToNextStoryScreen()
    gameData.initialize('easy')
}


const storyNavigation = {
    currentScreen: function(){},
    goToNextStoryScreen: function(){
        const currentChapter = this.storyScreenCursor
        this.storyScreenCursor++
        return this.storyScreenSuccession[currentChapter]
    },
    storyScreenSuccession:[
        function() {return storyModeIntroTemplate('lundi')},
        function() {return storyModeScreenTemplate(storyText['lundi'])},
        function() {return oneDayPuzzleModeScreen()},
        function() {return storyModeGameOverScreen()},
        function() {return storyModeIntroTemplate('mardi')},
        function() {return storyModeScreenTemplate(storyText['mardi'])},
        function() {return oneDayPuzzleModeScreen()},
        function() {return storyModeGameOverScreen()},
        function() {return storyModeIntroTemplate('mercredi')},
        function() {return storyModeScreenTemplate(storyText['mercredi'])},
        function() {return oneDayPuzzleModeScreen()},
        function() {return storyModeGameOverScreen()},
        function() {return storyModeIntroTemplate('jeudi')},
        function() {return storyModeScreenTemplate(storyText['jeudi'])},
        function() {return oneDayPuzzleModeScreen()},
        function() {return storyModeGameOverScreen()},
        function() {return storyModeIntroTemplate('vendredi')},
        function() {return storyModeScreenTemplate(storyText['vendredi'])},
        function() {return oneDayPuzzleModeScreen()},
        function() {return storyModeGameOverScreen()},
        function() {return titleScreen()}
    ],
    storyScreenCursor: 0
}

