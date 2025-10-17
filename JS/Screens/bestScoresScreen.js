'use strict'

function bestScoresScreen(){
    let r = document.createElement('div')
    
    r.style.margin = 0
    r.style.height = '100dvh'
    r.style.width = '100dvw'
    r.style.display = 'grid'
    r.style.justifyContent = 'center'
    r.style.alignItems = 'center'
    r.style.gridTemplate = `
    'a b c d' 25dvw 
    'e f g h' 25dvw
    'i j k l' 25dvw
    'm n o p' 25dvw
    'q r s t' 25dvw
    'x x x x' auto /25dvw 25dvw 25dvw 25dvw
    `

    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't']
    let divBlock = []
    let subDivBlock = []
    letters.forEach((letter, index) =>{
        divBlock[index] = document.createElement('div')
        r.appendChild(divBlock[index])
        divBlock[index].style.gridArea = letters[index]
        divBlock[index].style.display = 'flex'
        divBlock[index].style.justifyContent = 'center'
        divBlock[index].style.alignItems = 'center'
        divBlock[index].style.width = '25dvw'
        divBlock[index].style.height = '25dvw'

        subDivBlock[index] = document.createElement('div')
        divBlock[index].appendChild(subDivBlock[index])
        if (index === 0){return}
        subDivBlock[index].style.display = 'flex'
        subDivBlock[index].style.width = '20dvw'
        subDivBlock[index].style.height = '20dvw'
        subDivBlock[index].style.border = `solid black 3px`
        subDivBlock[index].style.borderRadius = '5%'
    })

    myStyle.addBackgroundImage('Images/imgNeutralFaceEmoji.png', subDivBlock[1].style)
    myStyle.addBackgroundImage('Images/imgSmilingEmoji.png', subDivBlock[2].style)
    myStyle.addBackgroundImage('Images/imgSunglassesEmoji.png', subDivBlock[3].style)
    myStyle.addBackgroundImage('Images/imgOneStar.png', subDivBlock[4].style)
    myStyle.addBackgroundImage('Images/imgTwoStars.png', subDivBlock[8].style)
    myStyle.addBackgroundImage('Images/imgThreeStars.png', subDivBlock[12].style)
    myStyle.addBackgroundImage('Images/imgCamping.png', subDivBlock[16].style)

    const medalsDiv = [
        [5, 'easy', 'hasTried'], 
        [6, 'easy', 'hasEqualized'],
        [7, 'easy', 'hasBeaten'],
        [9, 'medium', 'hasTried'], 
        [10, 'medium', 'hasEqualized'],
        [11, 'medium', 'hasBeaten'],
        [13, 'hard', 'hasTried'], 
        [14, 'hard', 'hasEqualized'],
        [15, 'hard', 'hasBeaten'],
        [17, 'storyMode', 'hasTried'], 
        [18, 'storyMode', 'hasEqualized'],
        [19, 'storyMode', 'hasBeaten']
    ]
    medalsDiv.forEach((v) =>{
        const n = v[0]
        const key = v[1]
        const value = v[2]
        const url = (gameData.medalsCounter[key][value] > 0) ? 'Images/imgMedal.png' : 'Images/imgMedalVoid.png'
        myStyle.addBackgroundImage(url, subDivBlock[n].style)
    })
    

    const bottomDiv = document.createElement('div')
    r.appendChild(bottomDiv)
    bottomDiv.style.height = '100%'
    bottomDiv.style.width = '100%'
    bottomDiv.style.gridArea = 'x'
    bottomDiv.style.display = 'flex'
    bottomDiv.style.justifyContent = 'center'
    bottomDiv.style.justifyItems = 'center'
    bottomDiv.style.alignContent = 'center'
    bottomDiv.style.alignItems = 'center'
    const bar = document.createElement('div')
    bottomDiv.appendChild(bar)
    const progressBar = document.createElement('div')
    bar.appendChild(progressBar)
    const trophyDiv = document.createElement('div')
    bottomDiv.appendChild(trophyDiv)

    trophyDiv.style.width = '20%'
    trophyDiv.style.height = '100%'
    myStyle.addBackgroundImage('Images/imgGift.png', trophyDiv.style)

    bar.style.width = '70%'
    bar.style.height = '20%'
    bar.style.display = 'flex'
    bar.style.alignItems = 'left'
    bar.style.border = 'solid black 2px'

    progressBar.style.width = `${trophyAnimation.next().value * 100}%`
    progressBar.style.height = '100%'
    progressBar.style.backgroundColor = 'green'

    r.addEventListener('pointerdown', goToMenu)

    return r;
}

let trophyAnimation = gen_trophyAnimation()
function* gen_trophyAnimation(){

    const startingTime = Date.now()
    const animationTime = 5000
    const maxScore = 12
    const score = function(){
        let r = 0
        const data = [
            ['easy', 'hasTried'], 
            ['easy', 'hasEqualized'],
            ['easy', 'hasBeaten'],
            ['medium', 'hasTried'], 
            ['medium', 'hasEqualized'],
            ['medium', 'hasBeaten'],
            ['hard', 'hasTried'], 
            ['hard', 'hasEqualized'],
            ['hard', 'hasBeaten'],
            ['storyMode', 'hasTried'], 
            ['storyMode', 'hasEqualized'],
            ['storyMode', 'hasBeaten']
        ]
        data.forEach((v) =>{
            const key = v[0]
            const value = v[1]
            const n = gameData.medalsCounter[key][value]
            if (n > 0){
                r++
            }
        })
        return r;
    }()

    let timeDiff
    while (true){
        timeDiff = function(){
            let r = Date.now() - startingTime
            if (r > animationTime){
                return animationTime
            }
            return r
        }()

        yield Math.pow(timeDiff / animationTime, 3) * (score/maxScore);
    }
}