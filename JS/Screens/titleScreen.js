'use strict'

function titleScreen(){
    let r = document.createElement('div')
    r.style.margin = 0
    r.style.height = '100dvh'
    r.style.width = '100dvw'
    r.style.display = 'flex'
    r.style.flexDirection = 'column'
    r.style.justifyContent = 'center'
    r.style.alignItems = 'center'

    const divAxe = document.createElement('div')
    r.appendChild(divAxe)
    divAxe.style.width = '100dvw'
    divAxe.style.height = '30dvh'
    divAxe.style.backgroundImage = `url(Images/imgAxe.png)`
    divAxe.style.backgroundRepeat = 'no-repeat'
    divAxe.style.backgroundSize = 'contain'
    divAxe.style.backgroundPosition = 'center'

    const divDie = document.createElement('div')
    r.appendChild(divDie)
    divDie.style.width = '100dvw'
    divDie.style.height = '30dvh'
    divDie.style.backgroundImage = `url(Images/imgDie.png)`
    divDie.style.backgroundRepeat = 'no-repeat'
    divDie.style.backgroundSize = 'contain'
    divDie.style.backgroundPosition = 'center'

    const divTombstone = document.createElement('div')
    r.appendChild(divTombstone)
    divTombstone.style.width = '100dvw'
    divTombstone.style.height = '30dvh'
    divTombstone.style.backgroundImage = `url(Images/imgTombstone.png)`
    divTombstone.style.backgroundRepeat = 'no-repeat'
    divTombstone.style.backgroundSize = 'contain'
    divTombstone.style.backgroundPosition = 'center'

    r.addEventListener('pointerdown', goToMenu)

    return r;
}