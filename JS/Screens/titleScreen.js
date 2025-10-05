'use strict'

function titleScreen(){
    let r = document.createElement('div')
    
    r.style.margin = 0
    r.style.height = '100dvh'
    r.style.width = '100dvw'
    r.style.display = 'grid'
    r.style.justifyContent = 'center'
    r.style.alignItems = 'center'
    r.style.gridTemplate = `
    'a b c' 33dvw 
    'd e f' 33dvw
    'g h i' 33dvw
    'j k l' 33dvw
    'x x x' auto /33dvw 33dvw 33dvw
    `

    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l']
    let divBlock = []
    let subDivBlock = []
    let squareLeft = []
    let squareRight = []
    const animationData = titleAnimation.next().value
    const xValue = letters.map((value, index) => {return animationData[index].xValue})
    const color = letters.map((value, index) => {return animationData[index].color})
    const backgroundImage = letters.map((value, index) => {return animationData[index].backgroundImage})
    letters.forEach((letter, index) =>{
        divBlock[index] = document.createElement('div')
        r.appendChild(divBlock[index])
        divBlock[index].style.gridArea = letters[index]
        divBlock[index].style.display = 'flex'
        divBlock[index].style.justifyContent = 'center'
        divBlock[index].style.alignItems = 'center'
        divBlock[index].style.width = '33dvw'
        divBlock[index].style.height = '33dvw'

        subDivBlock[index] = document.createElement('div')
        divBlock[index].appendChild(subDivBlock[index])
        subDivBlock[index].style.display = 'flex'
        subDivBlock[index].style.width = '28dvw'
        subDivBlock[index].style.height = '28dvw'
        subDivBlock[index].style.border = `solid black 3px`
        subDivBlock[index].style.borderRadius = '5%'


        squareLeft[index] = document.createElement('div')
        squareRight[index] = document.createElement('div')
        subDivBlock[index].appendChild(squareLeft[index])
        subDivBlock[index].appendChild(squareRight[index])
        squareLeft[index].style.height = '28dvw'
        squareRight[index].style.height = '28dvw'
        const w = xValue[index].toFixed(3) * 28
        squareLeft[index].style.width = `${Math.ceil(w)}dvw`
        squareRight[index].style.width = `${Math.floor(28 - w)}dvw`
        
        squareLeft[index].style.backgroundColor = 'black'
        const img = backgroundImage[index]
        if (img === ''){
            squareRight[index].style.backgroundColor = color[index]
        }
        else {
            squareRight[index].style.backgroundImage = img
            squareRight[index].style.backgroundRepeat = 'no-repeat'
            squareRight[index].style.backgroundSize = 'cover'
        }
    })


    const bottomDiv = document.createElement('div')
    r.appendChild(bottomDiv)
    bottomDiv.style.gridArea = 'x'

    /*
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

    */

    r.addEventListener('pointerdown', goToMenu)

    return r;
}

let titleAnimation = gen_titleAnimation(6000, 12)
function* gen_titleAnimation(animationTimeInMs, numberOfBlocks){
    let r = function(){
        let r = []
        for (let i = 0; i< numberOfBlocks; i++){
            const o = {
                xValue: 1,
                easingFunction: function(){},
                color: '',
                backgroundImage: ''
            }
        r.push(o)
        }
        return r;    
    }()

    let referenceTime = Date.now()
    initialize()
    r.forEach((value, index) =>{
        r[index].backgroundImage = ''
    })
    r[3].backgroundImage = `url('Images/imgAxe.png')`
    r[4].backgroundImage = `url('Images/imgDie.png')`
    r[5].backgroundImage = `url('Images/imgTombstone.png')`

    function initialize(){
        referenceTime = Date.now()
        const randomThreeNumbers = function(){
                let r = [0, 0, 0]
                let list = new Array(numberOfBlocks)
                list.fill(0)
                list = list.map((value, index) => {return index + 1})
                for (let i = 0; i< 3; i++){
                    const index = Math.floor(Math.random() * list.length)
                    r[i] = list[index]
                    list = list.filter((value) =>{return value !== r[i]})
                }
                return r
            }()
        r = r.map((value, index) =>{
            const xValue = 1 
            const f = getRandomEasingFunction()
            const easingFunction = function (n) {return 1 -  f(n)}
            const random = Math.ceil(Math.random() * 9)
            const color = getHSLColorFromDuration(random)
            const backgroundImage = function(){
                if (randomThreeNumbers.includes(index + 1)){
                    if (index + 1 === randomThreeNumbers[0]){
                        return `url('Images/imgAxe.png')`
                    }
                    if (index + 1 === randomThreeNumbers[1]){
                        return `url('Images/imgDie.png')`
                    }
                    if (index + 1 === randomThreeNumbers[2]){
                        return `url('Images/imgTombstone.png')`
                    }
                }
                return ''
            }()

            return {
                xValue: xValue,
                easingFunction: easingFunction,
                color: color,
                backgroundImage: backgroundImage
            }
        })
    }
    
    const timeStamp1 = animationTimeInMs * 0.2
    const timeStamp2 = animationTimeInMs * 0.5
    const timeStamp3 = animationTimeInMs * 0.7
     const timeStamp4 = animationTimeInMs * 1

    while(true){
        const elapsedTime = Date.now() - referenceTime
        if (elapsedTime < timeStamp1){
            let n = elapsedTime / timeStamp1
            r.forEach((value, index) =>{
                r[index].xValue = r[index].easingFunction(n)
            })
            yield r
        }
        else if (elapsedTime < timeStamp2){
            r.forEach((value, index) =>{
                r[index].xValue = 0
            })
            yield r
        }
        else if (elapsedTime < timeStamp3){
            let n = (elapsedTime - timeStamp2) / (timeStamp3 - timeStamp2)
            r.forEach((value, index) =>{
                r[index].xValue = 1 - r[index].easingFunction(n)
            })
            yield r
        }
        else {
            if (elapsedTime >= timeStamp4){
                initialize()
            }
            yield r
        }
    }

}

/*
from https://easings.net/#
*/
function getRandomEasingFunction (){
    const table = {
        easeInSine: function(x) {
            return 1 - Math.cos((x * Math.PI) / 2);
        },
        easeOutSine: function (x){ 
            return Math.sin((x * Math.PI) / 2);
        },
        /*
        easeOutBounce: function (x) {
            const n1 = 7.5625;
            const d1 = 2.75;

            if (x < 1 / d1) {
                return n1 * x * x;
            } else if (x < 2 / d1) {
                return n1 * (x -= 1.5 / d1) * x + 0.75;
            } else if (x < 2.5 / d1) {
                return n1 * (x -= 2.25 / d1) * x + 0.9375;
            } else {
                return n1 * (x -= 2.625 / d1) * x + 0.984375;
            }
        },
        easeInBounce: function (x){
            function f (x) {
                const n1 = 7.5625;
                const d1 = 2.75;

                if (x < 1 / d1) {
                    return n1 * x * x;
                } else if (x < 2 / d1) {
                    return n1 * (x -= 1.5 / d1) * x + 0.75;
                } else if (x < 2.5 / d1) {
                    return n1 * (x -= 2.25 / d1) * x + 0.9375;
                } else {
                    return n1 * (x -= 2.625 / d1) * x + 0.984375;
                }
            }
            return 1 - f(1 - x);
        },
        easeInOutBounce: function (x){
            function f (x) {
                const n1 = 7.5625;
                const d1 = 2.75;

                if (x < 1 / d1) {
                    return n1 * x * x;
                } else if (x < 2 / d1) {
                    return n1 * (x -= 1.5 / d1) * x + 0.75;
                } else if (x < 2.5 / d1) {
                    return n1 * (x -= 2.25 / d1) * x + 0.9375;
                } else {
                    return n1 * (x -= 2.625 / d1) * x + 0.984375;
                }
            }
            return x < 0.5
                ? (1 - f(1 - 2 * x)) / 2
                : (1 + f(2 * x - 1)) / 2;
        },
        */
        easeInOutSine: function (x) {
            return -(Math.cos(Math.PI * x) - 1) / 2;
        },
        easeInQuad: function(x) {
            return x * x;
        },
        easeOutQuad: function(x) {
            return 1 - (1 - x) * (1 - x);
        },
        easeInOutQuad: function(x) {
            return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
        },
        easeInCubic: function(x) {
            return x * x * x;
        },
        easeOutCubic: function(x) {
            return 1 - Math.pow(1 - x, 3);
        },
        easeInOutCubic: function(x) {
            return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        },
        easeInQuart: function(x) {
            return x * x * x * x;
        },
        easeOutQuart: function(x) {
            return 1 - Math.pow(1 - x, 4);
        },
        easeInOutQuart: function(x) {
            return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
        },
        /*
        easeInExpo: function(x) {
            return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
        },
        easeOutExpo: function(x) {
            return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
        },
        easeInOutExpo: function(x) {
            return x === 0
                ? 0
                : x === 1
                ? 1
                : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
                : (2 - Math.pow(2, -20 * x + 10)) / 2;
        },
        easeInCirc: function(x) {
            return 1 - Math.sqrt(1 - Math.pow(x, 2));
        },
        easeOutCirc: function(x) {
            return Math.sqrt(1 - Math.pow(x - 1, 2));
        },
        easeInOutCirc: function(x) {
            return x < 0.5
                ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
                : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
        }
        */
    }

    const randomKey = Object.keys(table)[Math.floor(Math.random() * Object.keys(table).length)]
    return table[randomKey]
}