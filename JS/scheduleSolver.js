'use strict'

function greedySolve(slotlist){
    let r = new Schedule()
    
    const FIRST_START_TIME = 9
    const LAST_END_TIME = 19
    
    function main(slotlist){
        let solution = new Schedule()

        const sortedSlotList = slotlist.toSorted((a,b) => a - b)

        let cachedList = [...sortedSlotList]
        while(cachedList.length > 0){
            const durationCandidate = cachedList[cachedList.length - 1]
            cachedList.pop()

            const scheduleOptions = function(){
                let scheduleOptions = []
                const rooms = [1, 2, 3, 4]
                const startingTimeOptions = [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5]
                rooms.forEach((room) =>{
                    startingTimeOptions.forEach((startingTime) =>{
                        if (startingTime + durationCandidate <= LAST_END_TIME){
                            if (solution.checkIfDoubleBooking(startingTime, durationCandidate, room)){
                                return;
                            }
                            const scheduleOption = function(){
                                let r = solution.copy()
                                r.addChemoSlot(startingTime, durationCandidate, room)
                                return r;
                            }()
                            scheduleOptions.push(scheduleOption)
                        }
                    })
                })
                return scheduleOptions
            }()
            
            if (scheduleOptions.length === 0){
                console.log('recursive call')
                return main(slotlist)
            }
            
            const ratedScheduleOptions = scheduleOptions.map((scheduleOption) =>{
                return {
                    value: scheduleOption, 
                    score: checkMajorConstraints(scheduleOption.value)
                }
            })

            const bestOfRatedScheduleOptions = function(){
                let r = []
                let lowestScore = 999999999
                ratedScheduleOptions.forEach((ratedScheduleOption) =>{
                    const score = ratedScheduleOption.score
                    if (score < lowestScore){
                        lowestScore = score
                    }
                })
                r = ratedScheduleOptions.filter((ratedScheduleOption) =>{
                    return ratedScheduleOption.score === lowestScore
                })
                return r;
            }()

            const randomChoice = Math.floor(Math.random() * bestOfRatedScheduleOptions.length)
            const bestScheduleOption = bestOfRatedScheduleOptions[randomChoice]
            solution = bestScheduleOption.value.copy()
            
           
        }

        return solution;
    }
    
    let currentBest = 999999999
    const ITERATIONS = 100
    for (let i = 0; i< ITERATIONS; i++){
        const currentTry = main(slotlist)
        const score = checkMajorConstraints(currentTry.value)
        if (score < currentBest){
            r = currentTry.copy()
            currentBest = score
        }
    }

    console.log('solutionScore:', checkMajorConstraints(r.value))
    return r;
}


function reverseGreedySolve(slotlist){
    let r = new Schedule()
    
    const FIRST_START_TIME = 9
    const LAST_END_TIME = 19
    
    function main(slotlist){
        let solution = new Schedule()

        const sortedSlotList = slotlist.toSorted((a,b) => a - b)

        let cachedList = [...sortedSlotList]
        while(cachedList.length > 0){
            const durationCandidate = cachedList[cachedList.length - 1]
            cachedList.pop()

            const scheduleOptions = function(){
                let scheduleOptions = []
                const rooms = [1, 2, 3, 4]
                const startingTimeOptions = [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5]
                rooms.forEach((room) =>{
                    startingTimeOptions.forEach((startingTime) =>{
                        if (startingTime + durationCandidate <= LAST_END_TIME){
                            if (solution.checkIfDoubleBooking(startingTime, durationCandidate, room)){
                                return;
                            }
                            const scheduleOption = function(){
                                let r = solution.copy()
                                r.addChemoSlot(startingTime, durationCandidate, room)
                                return r;
                            }()
                            scheduleOptions.push(scheduleOption)
                        }
                    })
                })
                return scheduleOptions
            }()
            
            if (scheduleOptions.length === 0){
                console.log('recursive call')
                return main(slotlist)
            }
           
            const ratedScheduleOptions = scheduleOptions.map((scheduleOption) =>{
                return {
                    value: scheduleOption, 
                    score: checkMajorConstraints(scheduleOption.value)
                }
            })

            const worstOfRatedScheduleOptions = function(){
                let r = []
                let highestScore = 0
                ratedScheduleOptions.forEach((ratedScheduleOption) =>{
                    const score = ratedScheduleOption.score
                    if (score > highestScore){
                        highestScore = score
                    }
                })
                r = ratedScheduleOptions.filter((ratedScheduleOption) =>{
                    return ratedScheduleOption.score === highestScore
                })
                return r;
            }()

            const randomChoice = Math.floor(Math.random() * worstOfRatedScheduleOptions.length)
            const worstScheduleOption = worstOfRatedScheduleOptions[randomChoice]
            solution = worstScheduleOption.value.copy()
           
        }

        return solution;
    }
    
    let currentWorst = 0
    const ITERATIONS = 10
    for (let i = 0; i< ITERATIONS; i++){
        const currentTry = main(slotlist)
        const score = checkMajorConstraints(currentTry.value)
        if (score > currentWorst){
            r = currentTry.copy()
            currentWorst = score
        }
    }

    console.log('solutionScore for worst found solution:', checkMajorConstraints(r.value))
    return r;
}