'use strict'

function checkMajorConstraints(scheduleValue){
    /* 
    3 to 4 major constraints :
    - a 3 to 1 nurse ratio at all times
    score : +1 every time the nurse ratio is higher than 3 (ie === 4)
    - no two treatments starting at the same time
    score : +1 every time two treatments start at the the same time, +2 every time three treatments start at the the same time, +3 every time three treatments start at the the same time
    - no two treatments ending at the same time
    score : +1 every time two treatments end at the the same time, +2 every time three treatments end at the the same time, +3 every time three treatments end at the the same time
    - no treatement starting 30min before the end of another treatment
    score : +1 every time one treatement starts 30min before the end of ANOTHER treatment
    */

    const schedule = scheduleValue

    const nurseRatioForEachStartingTime = calculateNurseRatio(schedule)
    function calculateNurseRatio(schedule){
        const times = [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5]
        let startingTimeNurseRatio = function(){
            let r = {}
            times.forEach((value) =>{
                r[value] = 0
            })
            return r;
        }() 
        Object.keys(schedule).forEach((name) =>{
            for (let i = schedule[name].startingTime; i < schedule[name].endingTime; i = i + 0.5){
                startingTimeNurseRatio[i]++
            }
        })
        return startingTimeNurseRatio
    }
    const firstConstraintScore = calculateFirstConstraintScore(nurseRatioForEachStartingTime)
    function calculateFirstConstraintScore(nurseRatioForEachStartingTime){
        let r = 0
        Object.keys(nurseRatioForEachStartingTime).forEach((startingTime) =>{
            if (nurseRatioForEachStartingTime[startingTime] > 3){
                r++
            }
        })
        return r;
    }

    const secondConstraintScore = calculateSecondConstraintScore(schedule)
    function calculateSecondConstraintScore(schedule){
        let r = 0
        let startingTimes = {}
        Object.keys(schedule).forEach((name) =>{
            const key = schedule[name].startingTime
            startingTimes[key] = (startingTimes[key] === undefined) ? 1 : startingTimes[key] + 1 ;
        })
        Object.keys(startingTimes).forEach((time) =>{
            r = r + startingTimes[time] - 1
        })
        return r;
    }

    const thirdConstraintScore = calculateThirdConstraintScore(schedule)
    function calculateThirdConstraintScore(schedule){
        let r = 0
        let endingTimes = {}
        Object.keys(schedule).forEach((name) =>{
            const key = schedule[name].endingTime
            endingTimes[key] = (endingTimes[key] === undefined) ? 1 : endingTimes[key] + 1 ;
        })
        Object.keys(endingTimes).forEach((time) =>{
            r = r + endingTimes[time] - 1
        })
        return r;
    }

    const fourthConstraintScore = calculateFourthConstraintScore(schedule)
    function calculateFourthConstraintScore(schedule){
        let r = 0
        Object.keys(schedule).forEach((name) =>{
            const startingTime = schedule[name].startingTime
            Object.keys(schedule).forEach((name2) =>{
                if (name === name2){
                    return;
                }
                const anotherEndingTime = schedule[name2].endingTime
                if (startingTime === anotherEndingTime - 0.5){
                    r++
                }
            })
        })
        return r;
    }

    let r = firstConstraintScore + secondConstraintScore + thirdConstraintScore + fourthConstraintScore
    return r;
}