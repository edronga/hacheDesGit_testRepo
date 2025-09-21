'use strict'

function titleScreen(){
    let r = document.createElement('div')
    r.style.margin = 0
    r.style.height = '100dvh'
    r.style.width = '100dvw'

    const divAxe = document.createElement('div')
    r.appendChild(divAxe)
    divAxe.style.height = '30dvh'
    divAxe.style.backgroundImage = `url(Images/imgAxe.png)`
    divAxe.style.backgroundRepeat = 'no-repeat'
    divAxe.style.backgroundSize = 'contain'

    const divDie = document.createElement('div')
    r.appendChild(divDie)
    divDie.style.height = '30dvh'
    divDie.style.backgroundImage = `url(Images/imgDie.png)`
    divDie.style.backgroundRepeat = 'no-repeat'
    divDie.style.backgroundSize = 'contain'

    const divTombstone = document.createElement('div')
    r.appendChild(divTombstone)
    divTombstone.style.height = '30dvh'
    divTombstone.style.backgroundImage = `url(Images/imgTombstone.png)`
    divTombstone.style.backgroundRepeat = 'no-repeat'
    divTombstone.style.backgroundSize = 'contain'

    r.addEventListener('pointerdown', goToMenu)

    return r;
}