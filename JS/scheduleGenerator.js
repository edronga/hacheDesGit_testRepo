'use strict'

function generateRandomSchedule(numberOfPatients, baseSchedule = new Schedule(), numberOfRooms = 4, firstStart = 9, lastEnd = 18.5){
    let r = baseSchedule.copy()

    const arrayOfTimes = function(){
        let r = []
        for (let i = 0; i <= lastEnd - firstStart; i = i + 0.5){
            r.push(firstStart + i )
        }
        return r;
    }()

    const MAX_ITERATIONS = 1000
    for (let i = 0; i < MAX_ITERATIONS ; i++){

        const startingTime = function(){
            const range = arrayOfTimes.length - 1
            const randomNumber = Math.floor(Math.random() * range)
            return arrayOfTimes[randomNumber]
        }()

        const durationInHours = function(){
            const arrayOfEndingTimes = function(){
                let r = []
                arrayOfTimes.forEach((value, index) =>{
                    
                    if (value > startingTime){
                        r.push(value)
                    }
                })
                return r;
            }()
            const range = arrayOfEndingTimes.length
            const randomNumber = Math.floor(Math.random() * range)

            let r = arrayOfEndingTimes[randomNumber] - startingTime
            r = r*10 % 2 === 0 ? r : r + 0.5;
            return r;
        }()

        const room = Math.ceil(Math.random() * numberOfRooms)

        if (r.checkIfDoubleBooking(startingTime, durationInHours, room) === false){
            r.addChemoSlot(startingTime, durationInHours, room)
        }
        
        if (Object.keys(r.value).length === numberOfPatients){
            return r;
        }
    }

    return r;

}

function generateSlotlist(difficulty, baseSchedule = new Schedule()){
    let r = []

    const scheduleMap = function(){
        let r = {}
        const rooms = [1, 2, 3, 4]
        const startingTimeOptions = [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5]
        const FIRST_START_TIME = 9
        const LAST_END_TIME = 19
        const EMPTY = 0
        const FILLED = 1

        rooms.forEach((room) =>{
            r[room]= {}
            startingTimeOptions.forEach((startingTime) =>{
                r[room][startingTime] = EMPTY
            })
        })

        Object.keys(baseSchedule.value).forEach((slotName) =>{
            const room = baseSchedule.value[slotName].room
            const startingTime = baseSchedule.value[slotName].startingTime
            const endingTime = baseSchedule.value[slotName].endingTime

            for (let i = startingTime; i < endingTime; i = i+0.5){
                r[room][i] = FILLED
            }
        })

        return r;
    }()

    const emptySlots = function(){
        let r = []
        const rooms = [1, 2, 3, 4]
        const startingTimeOptions = [9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5]
        const FIRST_START_TIME = 9
        const LAST_END_TIME = 19
        const EMPTY = 0
        const FILLED = 1

        let t1, t2;
        rooms.forEach((room) =>{
            t1 = FIRST_START_TIME
            t2 = FIRST_START_TIME
            startingTimeOptions.forEach((startingTime) =>{
                if(scheduleMap[room][startingTime] === FILLED){
                    t2 = startingTime
                    if (t2 - t1 > 0){
                        r.push(t2 - t1)
                    }
                    t1 = startingTime + 0.5
                    return;
                }
                if (startingTime === LAST_END_TIME - 0.5){
                    r.push (LAST_END_TIME - t1)
                }
            })
        })
        return r;
    }()

    function generateNumberList(n){
        let r = []
        const numbers = function(){
            let r = []
            for (let i = 1; i <= n; i++){
                r.push(i)
            }
            return r
        }()
        const frequency = [...numbers].sort((a, b) => b-a)

        return r = function(){
            let r = []
            numbers.forEach((number) =>{
                for (let i = 0; i < frequency[number]; i++){
                    r.push(number)
                }
            })
            return r
        }()
    }

    const fullSlotList = function(){
        let r = []
        emptySlots.forEach((n) =>{
            let number = Math.floor(n)
            while(number > 1){
                const candidates = generateNumberList(number)
                const random = Math.floor(Math.random() * candidates.length)
                const chosenCandidate = candidates[random]
                r.push(chosenCandidate)
                number = number - chosenCandidate
            }
        })
        return r;
    }()

    const smallerSlotList = function(){
        let r = []
        const sortedList = [...fullSlotList].sort((a, b) => b - a)
        switch (difficulty){
            case 'easy':
                return (sortedList.length >= 3) ? sortedList.toSpliced(3) : sortedList;
            case 'medium':
                return (sortedList.length >= 5) ? sortedList.toSpliced(5) : sortedList;
            case 'hard' :
                return (sortedList.length >= 7) ? sortedList.toSpliced(7) : sortedList;
            default:
                return sortedList
        }
    }()

    return r = smallerSlotList;
}