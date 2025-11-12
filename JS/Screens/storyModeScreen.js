'use strict'

function storyModeIntroTemplate(text){
    let r = document.createElement('div')

    r.style.margin = 0
    r.style.height = '100dvh'
    r.style.width = '100dvw'
    r.style.backgroundImage = `url('Images/imgNurseVsRobot.png')`
    r.style.backgroundRepeat = 'no-repeat'
    r.style.backgroundSize = 'cover'
    r.style.backgroundPosition = 'center'
    r.style.display = 'flex'
    r.style.alignContent = 'center'
    r.style.alignItems = 'center'
    r.style.justifyContent = 'center'
    r.style.justifyItems = 'center'

    const dayTitleDiv = document.createElement('div')
    r.appendChild(dayTitleDiv)
    const dayTitleText = document.createElement('p')
    dayTitleDiv.appendChild(dayTitleText)
    dayTitleText.innerHTML = text

    dayTitleDiv.style.width = '80dvw'
    dayTitleDiv.style.height = '20dvh'
    dayTitleDiv.style.border = 'solid 2px black'
    dayTitleDiv.style.display = 'flex'
    dayTitleDiv.style.alignContent = 'center'
    dayTitleDiv.style.justifyContent = 'center'
    dayTitleDiv.style.alignItems = 'center'
    dayTitleDiv.style.alignContent = 'center'
    dayTitleDiv.style.backgroundColor = 'white'

    dayTitleText.style.fontSize = '10dvh'
    
    r.addEventListener('pointerdown', () =>{
        timerNumberOfIntervalsSinceStarting = gen_timerNumberOfTimeIntervalsSinceStarting(3000)
        gameData.getCurrentPage = storyNavigation.goToNextStoryScreen()
    })

    return r;
}

function storyModeScreenTemplate(textTable){
    let r = document.createElement('div')

    r.style.margin = '2dvw'
    r.style.height = '100dvh'
    r.style.width = '96dvw'
    r.style.display = 'flex'
    r.style.flexDirection = 'column'
    r.style.gap = '5px'

    let textDiv = []
    let textContent = []
    const numberOfBubblesToShow = timerNumberOfIntervalsSinceStarting.next(0).value
    textTable.forEach((text, index) =>{
        if (index > numberOfBubblesToShow){
            return
        }

        const character = text.character
        const textData = text.text
        textDiv[index] = document.createElement('div')
        r.appendChild(textDiv[index])
        textContent[index] = document.createElement('p')
        textDiv[index].appendChild(textContent[index])
        textContent[index].innerHTML = textData


        textDiv[index].style.display = 'flex'
        textDiv[index].style.textAlign = 'justify'
        textDiv[index].style.width = function(){
            const t = {'narrator': '94dvw', 'protagonist': '60dvw'}
            return (t[character] === undefined) ? '60dvw': t[character];

        }()
        textDiv[index].style.backgroundColor = function(){
            const t = {'narrator': 'white', 'protagonist': 'pink'}
            return (t[character] === undefined) ? 'lightBlue': t[character];

        }()
        const contentJustification = function(){
            if (character === 'narrator'){
                return 'center'
            }
            if (character === 'protagonist'){
                return 'flex-start'
            }
            return 'flex-end'
        }()
        textDiv[index].style.alignSelf = contentJustification
        textDiv[index].style.justifyContent = 'center'
        textDiv[index].style.alignContent = 'center'

        textDiv[index].style.borderRadius = '5px'
        
        textContent[index].style.margin = '3px'

    })

    r.addEventListener('pointerdown', () =>{
        if (numberOfBubblesToShow < textTable.length){
            timerNumberOfIntervalsSinceStarting.next(1)
            return;
        }
        gameData.getCurrentPage = storyNavigation.goToNextStoryScreen()
    })

    return r;
}

function storyModeGameOverScreen(){
    let r = document.createElement('div')

    r.style.margin = 0
    r.style.height = '100dvh'
    r.style.width = '100dvw'

    r.addEventListener('pointerdown', () =>{
        gameData.getCurrentPage = storyNavigation.goToNextStoryScreen()
    })

    return r;

}


const storyText = {
    'lundi' :[
        {
            character: 'protagonist',
            text:`La journée s'annonce nuageuse !`
        },
        {
            character: 'narrator',
            text:`Notre protagoniste n'était pas aiguilleur du ciel. Elle était infirmière coordinatrice. C'était un peu pareil, un planning millimétré autour de questions de vie et de mort. Quasiment pareil. En moins bien payé.`
        },
        {
            character: 'protagonist',
            text:`Au moins je sais que je sers à quelque chose.`
        },
        {
            character: 'narrator',
            text:`Soudain, la directrice de l'hôpital fit irruption dans son bureau.
            <br>Sans dire bonjour.`
        },
        {
            character: `Directrice de l'hôpital`,
            text : `Je suis venu vous dire qu'on va vous remplacer par un logiciel qui fait votre travail. Mais en mieux. En plus vite. Et en moins cher.`
        },
        {
            character: 'protagonist',
            text: 'Une intelligence artificielle à la pointe comme ChatGPT ?'
        },
        {
            character: `Directrice de l'hôpital`,
            text: `Non c'est ce qu'on voulait, mais on n'avait pas le budget.
            <br>A la place, c'est un logiciel developpé par Justine, ma filleule de 12 ans, sur sa calculatrice de poche. Il s'appelle "loIo".`
        },
        {
            character: `narrator`,
            text: `Notre protagoniste se permit un petit sourire intérieur. Ce n'était pas aujourd'hui qu'elle allait être remplacée par une machine.`
        },
        {
            character: `Directrice de l'hôpital`,
            text: `Allez c'est parti pour un petit test. On a configuré loIo sur le planning du jour. Si vous ne faites pas mieux, vous êtes virée.`
        }
    

    ],
    'mardi' :[

    ],
    'mercredi' :[

    ],
    'jeudi' :[

    ],
    'vendredi' :[

    ],

}

let timerNumberOfIntervalsSinceStarting = gen_timerNumberOfTimeIntervalsSinceStarting(10000)
function* gen_timerNumberOfTimeIntervalsSinceStarting(timeIntervalInMilliseconds){
    let r = 0
    let numberOfUserInputs = 0
    let newInput = 0
    const startingTime = Date.now()


    while(true){
        r = numberOfUserInputs // +  Math.floor((Date.now() - startingTime) / timeIntervalInMilliseconds)
        newInput =  yield r
        numberOfUserInputs = numberOfUserInputs + newInput
    }
}