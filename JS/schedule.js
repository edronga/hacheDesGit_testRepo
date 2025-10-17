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

