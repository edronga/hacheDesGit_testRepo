'use strict'

// game loop

let timeStamp = Date.now()
const REFRESH_INTERVAL = 15
let customFrame = {
    value: 1,
    NUMBER_OF_FRAMES: 24,
    get: function(){
        return this.value;
    },
    update: function(){
        const newValue = this.value <= this.NUMBER_OF_FRAMES ? this.value + 1 : 1;
        this.value = newValue
    }
}

function loop(){
    if (Date.now() - timeStamp >= REFRESH_INTERVAL){
        timeStamp = Date.now()
        customFrame.update()
        main()
    }
    if (debug.debugBreak){ // for debugging purposes, break loop in order to allow to look at html and css
        return;
    }
    window.requestAnimationFrame(loop) 
}

function main(){
    document.querySelector('#myContent').innerHTML = ''
    const htmlData = gameData.getCurrentPage()
    document.querySelector('#myContent').appendChild(htmlData)
}

document.addEventListener('pointerdown', (e) => {
    e.preventDefault();
}, {passive: false})
document.addEventListener('pointermove', (e) => {
    e.preventDefault();
}, {passive: false})
document.addEventListener('pointerup', (e) => {
    e.preventDefault();
}, {passive: false})

gameData.getCurrentPage = titleScreen
loop();
