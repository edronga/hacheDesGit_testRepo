'use strict'

const myStyle = {
    addPElement(parent, text){
        const p = document.createElement('p')
        parent.appendChild(p)
        p.innerText = text
        p.style.display = 'flexbox'
    }
}
