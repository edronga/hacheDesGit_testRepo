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
        }
    },
    storyModeData:{
        currentLevel: 1,
        score : {
            'level1': undefined,
            'level2': undefined,
            'level3': undefined
        },
        plot: {
            chapter1Plot: chapter1Plot,
            chapter2Plot: chapter2Plot[0],
            chapter3Plot: chapter3Plot
        },
        initialize: function(){
            this.currentLevel = 1,
            this.score = {
                'level1': undefined,
                'level2': undefined,
                'level3': undefined
            } 
            this.plot.chapter2Plot = function() {
                const l = chapter2Plot.length
                let rand = Math.floor(Math.random() * l)
                return chapter2Plot[rand]
            }()
        },
        updateScore: function(score, currentLevel = gameData.storyModeData.currentLevel){
            this.score[`level${currentLevel}`] = score
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
