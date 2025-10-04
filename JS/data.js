'use strict'

let gameData = {
    getCurrentPage: function(){},
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
    initialize: function(difficulty){
        
        let fixedSchedule, slotlist
        
        switch (difficulty){
            case 'easy':
                fixedSchedule = generateRandomSchedule(3)
                slotlist = function(){
                    let r = []
                    const TOTAL_TIME = 40
                    const remainingTime = TOTAL_TIME - Object.keys(fixedSchedule.value).reduce((previousValue, name) =>{
                        return previousValue + fixedSchedule.value[name].durationInHours
                    }, 0)
                    const options = function(){
                        let r = []
                        const table1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
                        const table2 = [9, 8, 7, 6, 5, 4, 3, 2, 1]
                        table1.forEach((value, index)=>{
                            for (let i = 0; i< table2[index]; i++){
                                r.push(value)
                            }
                        })
                        return r;
                    }()
                    function helper(array, max){
                        const random = Math.floor(Math.random() * options.length)
                        let r = [...array]
                        r.push(options[random])
                        if (r.reduce((previousValue, currentValue) => {return previousValue + currentValue}, 0) < max){
                            return helper(r, max)
                        } 
                        else {
                            return array
                        }
                    }
                    return helper([], remainingTime * 0.5)
                }()
                break;
            
            case 'medium':
                fixedSchedule = generateRandomSchedule(3)
                slotlist = function(){
                    let r = []
                    const TOTAL_TIME = 40
                    const remainingTime = TOTAL_TIME - Object.keys(fixedSchedule.value).reduce((previousValue, name) =>{
                        return previousValue + fixedSchedule.value[name].durationInHours
                    }, 0)
                    const options = function(){
                        let r = []
                        const table1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
                        const table2 = [9, 8, 7, 6, 5, 4, 3, 2, 1]
                        table1.forEach((value, index)=>{
                            for (let i = 0; i< table2[index]; i++){
                                r.push(value)
                            }
                        })
                        return r;
                    }()
                    function helper(array, max){
                        const random = Math.floor(Math.random() * options.length)
                        let r = [...array]
                        r.push(options[random])
                        if (r.reduce((previousValue, currentValue) => {return previousValue + currentValue}, 0) < max){
                            return helper(r, max)
                        } 
                        else {
                            return array
                        }
                    }
                    return helper([], remainingTime * 0.7)
                }()
                break;

            case 'hard':
                fixedSchedule = generateRandomSchedule(3)
                slotlist = function(){
                    let r = []
                    const TOTAL_TIME = 40
                    const remainingTime = TOTAL_TIME - Object.keys(fixedSchedule.value).reduce((previousValue, name) =>{
                        return previousValue + fixedSchedule.value[name].durationInHours
                    }, 0)
                    const options = function(){
                        let r = []
                        const table1 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
                        const table2 = [9, 8, 7, 6, 5, 4, 3, 2, 1]
                        table1.forEach((value, index)=>{
                            for (let i = 0; i< table2[index]; i++){
                                r.push(value)
                            }
                        })
                        return r;
                    }()
                    function helper(array, max){
                        const random = Math.floor(Math.random() * options.length)
                        let r = [...array]
                        r.push(options[random])
                        if (r.reduce((previousValue, currentValue) => {return previousValue + currentValue}, 0) < max){
                            return helper(r, max)
                        } 
                        else {
                            return array
                        }
                    }
                    return helper([], remainingTime * 0.9)
                }()
                break;

            default: // case 'custom'
                r = [1, 1, 1, 2, 2, 3, 4, 5, 6]
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
        
    }
}
