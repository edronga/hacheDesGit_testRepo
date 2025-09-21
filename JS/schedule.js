'use strict'

class Schedule {
    constructor(){
        this.value = {}
    }
    addChemoSlot(startingTime, durationInHours, room, name = undefined){
        // checks for variable contraints
        if (typeof(startingTime) !== 'number' || startingTime > 24 || startingTime< 0){
            console.log ('wrong format for variable')
            console.trace()
            return;
        }
        if (typeof(durationInHours) !== 'number' || startingTime + durationInHours > 24){
            console.log ('wrong format for variable')
            console.trace()
            return;
        }
        if (typeof(room) !== 'number'){
            console.log ('wrong format for variable')
            console.trace()
            return;
        }

        // check for double booking
        const isThereDoubleBooking = this.checkIfDoubleBooking(startingTime, durationInHours, room)
        
        if (isThereDoubleBooking){
            console.log (`Cannot add time slot because of conflict with another time slot ; refused time slot had the following characteristicts: starting time ${startingTime}, duration ${durationInHours} hours, room ${room}`)
            return;
        }

        if (name === undefined){
            name = generateUniqueName.next().value
        }
        
        this.value[name] = {
            durationInHours: durationInHours,
            startingTime: startingTime,
            endingTime: startingTime + durationInHours,
            room: room 
        }      
    };
    checkIfDoubleBooking(startingTime, durationInHours, room){
        const endingTime = startingTime + durationInHours
        for (let key in this.value){
            const sT = this.value[key].startingTime
            const eT = this.value[key].endingTime
            if (room === this.value[key].room){   
                if (startingTime === sT && endingTime === eT){
                    return true;
                }        
                if (startingTime > sT && startingTime < eT){
                    return true;
                }
                if (endingTime > sT && endingTime < eT){
                    return true;
                }
                if (sT > startingTime && sT < endingTime){
                    return true;
                }
                if (eT > startingTime && eT < endingTime){
                    return true;
                }
            }   
        }
        return false;
    }
    removeChemoSlot(slotName){
        let copy = {}
        Object.keys(this.value).forEach((name) =>{
            if (slotName !== name){
                copy[name] = this.value[name]
            }
        })
        this.value = copy
    }
    copy(){
        let r = new Schedule()
        r.value = {...this.value}
        return r;
    }
    copyScheduleWithoutSlotName(schedule, slotName){
        let r = new Schedule()
        Object.keys(schedule.value).forEach((name) =>{
            if (slotName !== name){
                r.value[name] = schedule.value[name]
            }
        })
        return r;
    }
}

function generateRandomSchedule(numberOfPatients, numberOfRooms = 4, firstStart = 9, lastEnd = 18.5){
    let r = new Schedule()

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
