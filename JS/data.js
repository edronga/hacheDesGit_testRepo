'use strict'

let gameData = {
    getCurrentPage: function(){},
    canvasDescription: {},
    chemoSlotsDescription: {
        completeList: [],
        placedSlots: [],
        unplacedSlots: [],
        floatingSlot: []
    },
    playerScore: 0,
    bestFoundScore: 0,
    initialize: function(difficulty){
        const slotlist = function(){
            let r = []
            let schedule = new Schedule()
            switch (difficulty){
                case 'easy':
                    schedule = generateRandomSchedule(8)
                    r = Object.keys(schedule.value).map((name) =>{
                        return schedule.value[name].durationInHours
                    })
                    break;
                
                case 'medium':
                    schedule = generateRandomSchedule(12)
                    r = Object.keys(schedule.value).map((name) =>{
                        return schedule.value[name].durationInHours
                    })
                    break;

                case 'hard':
                    schedule = generateRandomSchedule(16)
                    r = Object.keys(schedule.value).map((name) =>{
                        return schedule.value[name].durationInHours
                    })
                    break;

                default: // case 'custom'
                    schedule = generateRandomSchedule(16)
                    r = Object.keys(schedule.value).map((name) =>{
                        return schedule.value[name].durationInHours
                    })
                    break;
            }
            return r;
        }()

        const boardSchedule = reverseGreedySolve(slotlist)
        this.canvasDescription = new CanvasDescription(boardSchedule, window.innerWidth, window.innerHeight*0.8)
        this.chemoSlotsDescription = {
            completeList: slotlist,
            placedSlots: slotlist,
            unplacedSlots: [],
            floatingSlot: []
        }
        this.playerScore = checkMajorConstraints(boardSchedule.value)
        this.bestFoundScore = checkMajorConstraints(greedySolve(slotlist).value)
        
    }
}
