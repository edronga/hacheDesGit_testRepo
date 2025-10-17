'use strict'

function storyModeScreen(){
    let r = document.createElement('div')

    r.style.margin = 0
    r.style.height = '100dvh'
    r.style.width = '100dvw'
    myStyle.addBackgroundImage('Images/imgConstruction.png', r.style)


    r.addEventListener('pointerdown', goToMenu)

    return r;
}