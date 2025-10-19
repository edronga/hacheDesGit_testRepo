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

    r.style.margin = 0
    r.style.height = '100dvh'
    r.style.width = '100dvw'
    r.style.display = 'flex'
    r.style.flexDirection = 'column'
    r.style.alignContent = 'center'
    r.style.alignItems = 'center'

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
        const contentJustification = function(){
            if (character === 'narrator'){
                return 'center'
            }
            if (character === 'protagonist'){
                return 'left'
            }
            return 'right'
        }()
        textDiv[index].style.width = '90dvw'
        textDiv[index].style.alignContent = 'center'
        textDiv[index].style.alignItems = 'center'
        textDiv[index].style.justifyContent = contentJustification
        textDiv[index].style.justifyItems = contentJustification
        

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
            character: 'narrator',
            text:'narration - test'
        },
        {
            character: 'protagonist',
            text : 'protagoniste - test'
        },
        {
            character: 'Julia',
            text: 'personnage - test'
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

let timerNumberOfIntervalsSinceStarting = gen_timerNumberOfTimeIntervalsSinceStarting(1000)
function* gen_timerNumberOfTimeIntervalsSinceStarting(timeIntervalInMilliseconds){
    let r = 0
    let numberOfUserInputs = 0
    let newInput = 0
    const startingTime = Date.now()


    while(true){
        r = numberOfUserInputs +  Math.floor((Date.now() - startingTime) / timeIntervalInMilliseconds)
        newInput =  yield r
        numberOfUserInputs = numberOfUserInputs + newInput
    }
}