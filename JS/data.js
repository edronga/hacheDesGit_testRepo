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

            // to do : replace with premade problems
            case 'level1':
                data = generateEasyToSolveProblemsByGreedyApproach('easy', 0, 1)[0]
                fixedSchedule = new Schedule()
                fixedSchedule.value = data.fixedSchedule.value
                slotlist = data.slotlist
                break;

            case 'level2':
                data = generateEasyToSolveProblemsByGreedyApproach('easy', 2, 1)[0]
                fixedSchedule = new Schedule()
                fixedSchedule.value = data.fixedSchedule.value
                slotlist = data.slotlist
                break;
                
            case 'level3':
                data = generateEasyToSolveProblemsByGreedyApproach('easy', 4, 1)[0]
                fixedSchedule = new Schedule()
                fixedSchedule.value = data.fixedSchedule.value
                slotlist = data.slotlist
                break;

            case 'level4':
                data = generateEasyToSolveProblemsByGreedyApproach('medium', 2, 1)[0]
                fixedSchedule = new Schedule()
                fixedSchedule.value = data.fixedSchedule.value
                slotlist = data.slotlist
                break;

            case 'level5':
                data = generateEasyToSolveProblemsByGreedyApproach('medium', 4, 1)[0]
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
        }
    },
    playRecordedDataScreen: {
        data : {
            dataSourceGeneratorFunction: function(){},
            canvasDescription: {},
            next: function(){},
            bestFoundScore: 0,
            worstFoundScore: 0
        }}
}
