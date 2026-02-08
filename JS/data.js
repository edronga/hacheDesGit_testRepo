'use strict'

let gameData = {
    colorTheme: 1,
    newColorTheme: function(){
        const random = Math.ceil(Math.random()* 9)
        this.colorTheme = random
    },
    getCurrentPage: function(){},
    gameMode: '',
    canvasDescription: {},
    chemoSlotsDescription: {
        completeList: [],
        placedSlots: [],
        unplacedSlots: [],
        floatingSlot: [],
        fixedSchedule: new Schedule()
    },
    playerScore: 0,
    bestFoundScore: 0,
    worstFoundScore: 0,
    currentDifficultySetting : '',
    initialize: function(difficulty){
        
        let data, fixedSchedule, slotlist
        
        switch (difficulty){
            case 'easy':
                data = getDifficultToSolveProblem('easy')
                fixedSchedule = new Schedule()
                fixedSchedule.value = data.fixedSchedule.value
                slotlist = data.slotlist
                break;
            
            case 'medium':
                data = getDifficultToSolveProblem('medium')
                fixedSchedule = new Schedule()
                fixedSchedule.value = data.fixedSchedule.value
                slotlist = data.slotlist
                break;

            case 'hard':
                data = getDifficultToSolveProblem('hard')
                fixedSchedule = new Schedule()
                fixedSchedule.value = data.fixedSchedule.value
                slotlist = data.slotlist
                break;

            case 'tutorial' :
                fixedSchedule = new Schedule()
                fixedSchedule.addChemoSlot(11, 7, 1)
                fixedSchedule.addChemoSlot(11.5, 2.5, 2)
                fixedSchedule.addChemoSlot(12, 3, 3)
                fixedSchedule.addChemoSlot(15.5, 2, 2)
                slotlist = [1, 1, 1, 1]
                break;

            case 'storyMode':
                data = getDifficultToSolveProblem('story')
                fixedSchedule = new Schedule()
                fixedSchedule.value = data.fixedSchedule.value
                slotlist = data.slotlist
                break;


            default: // case 'custom'
                fixedSchedule = generateRandomSchedule(Math.ceil(Math.random() * 5))
                slotlist = generateSlotlist(1, fixedSchedule)
                break;
        }
        
     
        const boardSchedule = reverseGreedySolve(slotlist, fixedSchedule)

        this.canvasDescription = new CanvasDescription(boardSchedule, fixedSchedule, window.innerWidth, window.innerHeight*0.8)
        this.chemoSlotsDescription = {
            completeList: slotlist,
            placedSlots: slotlist,
            unplacedSlots: [],
            floatingSlot: [],
            fixedSchedule: fixedSchedule
        }
        this.playerScore = checkMajorConstraints(boardSchedule.value)
        this.bestFoundScore = checkMajorConstraints(greedySolve(slotlist, fixedSchedule).value)
        this.worstFoundScore = this.playerScore

        this.currentDifficultySetting = difficulty
    },
    medalsCounter: {
        easy:{
            hasTried: 0,
            hasEqualized: 0,
            hasBeaten: 0
        },
        medium:{
            hasTried: 0,
            hasEqualized: 0,
            hasBeaten: 0
        },
        hard: {
            hasTried: 0,
            hasEqualized: 0,
            hasBeaten: 0
        },
        storyMode:
        {
            hasTried: 0,
            hasEqualized: 0,
            hasBeaten: 0
        },
        custom: 
        {
            hasTried: 0,
            hasEqualized: 0,
            hasBeaten: 0
        },
        update: function(difficulty, result){
            if (!['easy', 'medium', 'hard', 'storyMode'].includes(difficulty) && !['hasTried', 'hasEqualized', 'hasBeaten'].includes(result)){
                throw new Error('unanticipated variable')
            }
            if (result === 'hasTried'){
                this[difficulty]['hasTried'] = 1
                return;
            }
            if (result === 'hasEqualized'){
                this[difficulty]['hasTried'] = 1
                this[difficulty]['hasEqualized'] = 1
                return;
            }
            if (result === 'hasBeaten'){
                this[difficulty]['hasTried'] = 1
                this[difficulty]['hasEqualized'] = 1
                this[difficulty]['hasBeaten'] = 1
                return;
            }
        },
        countMedals: function() {
            let r = 0
            const difficulty = ['easy', 'medium', 'hard', 'storyMode']
            difficulty.forEach((difficulty) =>{
                Object.keys(this[difficulty]).forEach((medal) =>{
                    r = (medal === 1) ? r++ : r;
                })
            })
            return r;
        }
    },
    storyModeData:{
        currentLevel: 1,
        score : {
            'level1': undefined,
        },
        plot: {
            chapter1Plot_Part1: chapter1Plot_Part1,
            chapter1Plot_Part2: chapter1Plot_Part2,
        },
        initialize: function(){
            this.currentLevel = 1,
            this.score = {
                'level1': undefined,
            } 
        },
        updateScore: function(score, currentLevel = gameData.storyModeData.currentLevel){
            this.score[`level${currentLevel}`] = score
        }
    }
}

/*
    music from https://studio.youtube.com
*/

let myMusic = {
    musicFile: [
        'Music/Birthday Cake - Reed Mathis.mp3',
        'Music/I Wuv U - Jeremy Korpas.mp3',
        'Music/Kazoom - Quincas Moreira.mp3',
        'Music/Ponies and Balloons - The Green Orbs.mp3',
        'Music/Splashing Around - The Green Orbs.mp3'
    ],
    soundFile: [
        'Music/Pop.mp3',
        'Music/Metallic Clank.mp3',
        'Music/Swoosh.mp3'
    ],
    titleScreen: 'Music/Birthday Cake - Reed Mathis.mp3',
    menuScreen: 'Music/Ponies and Balloons - The Green Orbs.mp3',
    medalsLow: 'Music/I Wuv U - Jeremy Korpas.mp3',
    medalsMedium: 'Music/Splashing Around - The Green Orbs.mp3',
    medalsHigh: 'Music/Kazoom - Quincas Moreira.mp3',
    pop: 'Music/Pop.mp3',
    click: 'Music/Metallic Clank.mp3',
    shuffle: 'Music/Swoosh.mp3'
}