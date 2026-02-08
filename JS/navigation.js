'use strict'

function goToIntroScreen2(){
    gameData.newColorTheme()
    gameData.getCurrentPage = getIntroScreen2
}

function goToTitleScreen(){
    gameData.getCurrentPage = titleScreen
    music.changeMusic(myMusic.titleScreen)
}

function goToMenu (){
    gameData.newColorTheme()
    gameData.getCurrentPage = menuScreen
    music.changeMusic(myMusic.menuScreen)
    music.playSound(myMusic.click)
}

function goToTutorialScreen(text, canvasDescription){
    gameData.getCurrentPage = tutorialScreen(text, canvasDescription)
    music.stopMusic()
    music.playSound(myMusic.click)
}

function goToBestScoresScreen(){
    trophyAnimation = gen_trophyAnimation()
    gameData.getCurrentPage = bestScoresScreen
    const bestScoreMusic = function(){
        const medalCount = gameData.medalsCounter.countMedals()
        console.log(medalCount)
        if (medalCount <= 3){
            music.changeMusic(myMusic.medalsLow)
            return;
        }
        if (medalCount === 12){
            music.changeMusic(myMusic.medalsHigh)
            return;
        }
        music.changeMusic(myMusic.medalsMedium)
    }()
    music.playSound(myMusic.click)
}

function goToPuzzleModeDifficultySelection (){
    gameData.getCurrentPage = puzzleModeDifficultySelectionScreen
    music.playSound(myMusic.click)
}

function goToPuzzleModeGameEasy () {
    gameData.gameMode = 'puzzle'
    gameData.getCurrentPage = oneDayPuzzleModeScreen
    gameData.initialize('easy')
    music.playSound(myMusic.click)
    music.stopMusic()
}

function goToPuzzleModeGameMedium (){
    gameData.gameMode = 'puzzle'
    gameData.getCurrentPage = oneDayPuzzleModeScreen
    gameData.initialize('medium')
    music.playSound(myMusic.click)
    music.stopMusic()
}

function goToPuzzleModeGameHard (){
    gameData.gameMode = 'puzzle'
    gameData.getCurrentPage = oneDayPuzzleModeScreen
    gameData.initialize('hard')
    music.playSound(myMusic.click)
    music.stopMusic()
}

function goToPuzzleModeGameCustomDifficulty (){
    gameData.gameMode = 'puzzle'
    gameData.getCurrentPage = oneDayPuzzleModeScreen
    gameData.initialize('custom')
    music.playSound(myMusic.click)
    music.stopMusic()
}

function goToPuzzleModeGameOverScreen () {
    gameData.getCurrentPage = puzzleModeGameOverScreen
    gameData.playerScore = checkMajorConstraints(gameData.canvasDescription.schedule.value) + 100* gameData.chemoSlotsDescription.unplacedSlots.length + 100* (gameData.canvasDescription.isThereAFloatingRectangle() ? 1 : 0)
    music.playSound(myMusic.click)
    music.stopMusic()
}

function goToStoryModeScreen(){
    gameData.gameMode = 'story'
    gameData.storyModeData.initialize()
    storyNavigation.storyScreenCursor = 0
    gameData.getCurrentPage = storyNavigation.goToNextStoryScreen()
    music.playSound(myMusic.click)
    music.stopMusic()
}


