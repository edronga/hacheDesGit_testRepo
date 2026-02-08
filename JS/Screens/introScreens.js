'use strict'

'use strict'

function getIntroScreen1(){
    let r = document.createElement('div')
    r.style.width = '100dvw'
    r.style.height = '100dvh'
    r.style.margin = 0
    r.style.display = 'flex'
    r.style.alignItems = 'center'
    r.style.justifyContent = 'center'
    r.style.backgroundColor = 'whitesmoke'

    const text = function(){
        let r = document.createElement('p')
        r.style.width = '100%'
        r.style.height = '100%'
        r.style.margin = 0
        r.style.fontSize = '75dvw'
        r.style.display = 'flex'
        r.style.alignItems = 'center'
        r.style.justifyContent = 'center'

        r.innerHTML = `\u{1F381}`

        return r;
    }()
    r.appendChild(text)

    r.addEventListener('pointerdown', goToIntroScreen2)

    return r;
}

function getIntroScreen2(){
    let r = document.createElement('div')
    r.style.width = '100dvw'
    r.style.height = '100dvh'
    r.style.margin = 0
    r.style.display = 'flex'
    r.style.alignItems = 'center'
    r.style.justifyContent = 'center'
    r.style.backgroundColor = 'whitesmoke'

    const quote = function(){
        let r = document.createElement('div')
        r.style.width = '95%'
        r.style.height = '30%'
        r.style.margin = 0
        r.style.display = 'flex'
        r.style.alignItems = 'center'
        r.style.justifyContent = 'center'
        r.style.textAlign = 'center'
        r.style.backgroundColor = 'white'
        r.style.border = 'solid black 2px'
        r.style.borderRadius = '10px'

        const text = function(){
            let r = document.createElement('p')
            r.style.width = '100%'
            r.style.height = '100%'
            r.style.margin = 0
            r.style.fontSize = '16px'
            r.style.textAlign = 'center'
            r.style.alignContent = 'center'

            r.innerText = `"En gros, elle passe son temps à jouer à l'ordinateur et à papoter au téléphone. Parfois les 2 en même temps. Et en plus elle est payée pour ça." (Anonyme)
            \n\n"C'est pas vrai du tout." (Laurence D.)
            `

            return r;

        }()
        r.appendChild(text)

        return r;
    }()
    r.appendChild(quote)

    r.addEventListener('pointerdown', goToTitleScreen)

    return r;
}