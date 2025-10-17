'use strict'

const myStyle = {
    addPElement(parent, text, ...otherStyles){
        const p = document.createElement('p')
        parent.appendChild(p)
        p.innerText = text
        p.style.display = 'flexbox'
        p.style.margin = '0px'
        p.style.height = '100%'
        p.style.width = '100%'

        if (otherStyles.length >0){
            otherStyles.forEach((styleObject)=>{
                const key = Object.keys(styleObject)[0]
                const value = Object.values(styleObject)[0]
                p.style[key] = value
            })
        }
    },

    addBackgroundImage(imgUrl, elementStyle){
        let r = elementStyle
        r.backgroundImage = `url('${imgUrl}')`
        r.backgroundRepeat = 'no-repeat'
        r.backgroundSize = 'contain'
        r.backgroundPosition = 'center'
    }
}

