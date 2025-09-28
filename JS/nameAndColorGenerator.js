'use strict'


const generateUniqueName = gen_generateUniqueName()
function* gen_generateUniqueName(){
    let n = 0

    while(true){
        yield `name_${n}`
        n++;
    }
}

const generateColor = gen_generateColor()
function* gen_generateColor(durationInHours = 11){
    const pinkColors = ['pink', 'lightPink', 'hotPink', 'deepPink', 'paleVioletRed', 'mediumVioletRed']
    const purpleColors = ['lavender', 'thistle', 'plum', 'orchid', 'violet', 'fuchsia', 'magenta', 'mediumOrchid', 'darkOrchid', 'darkViolet', 'blueViolet', 'darkMagenta', 'purple', 'mediumPurple', 'mediumSlateBlue', 'slateBlue', 'darkSlateBlue', 'rebeccaPurple', 'indigo']
    const redColors = ['lightSalmon', 'salmon', 'darkSalmon', 'lightCoral', 'indianRed', 'crimson', 'red', 'fireBrick', 'darkRed']
    const orangeColors = ['orange', 'darkOrange', 'coral', 'tomato', 'orangeRed']
    const yellowColors = ['gold', 'yellow', 'lightYellow', 'lemonChiffon', 'lightGoldenRodYellow', 'papayaWhip', 'moccasin', 'peachPuff', 'paleGoldenRod', 'khaki', 'darkKhaki']
    const greenColors = ['greenYellow', 'chartreuse', 'lawnGreen', 'lime', 'limeGreen', 'paleGreen', 'lightGreen', 'mediumSpringGreen', 'springGreen', 'mediumSeaGreen', 'seaGreen', 'forestGreen', 'green', 'darkgreen', 'yellowGreen', 'oliveDrab', 'darkOliveGreen', 'mediumAquaMarine', 'darkSeaGreen', 'lightSeaGreen', 'darkCyan', 'teal']
    const cyanColors = ['aqua', 'cyan', 'lightCyan', 'paleTurquoise', 'aquamarine', 'turquoise', 'mediumTurquoise', 'darkTurquoise']
    const blueColors = ['cadetBlue', 'steelBlue', 'lightSteelBlue', 'lightBlue', 'powderBlue', 'lightSkyBlue', 'skyBlue', 'cornFlowerBlue', 'deepSkyBlue', 'dodgerBlue', 'royalBlue', 'blue', 'mediumBlue', 'darkBlue', 'navy', 'midnightBlue']
    const brownColors = ['cornsilk', 'blanchedAlmond', 'bisque', 'navajoWhite', 'wheat', 'burlyWook', 'tan', 'rosyBrown', 'sandyBrown', 'goldenRod', 'darkGoldenRod', 'peru', 'chocolate', 'olive', 'saddleBrown', 'sienna', 'brown', 'maroon']
    const whiteColors = ['white', 'snow', 'honeyDew', 'mintCream', 'azure', 'aliceBlue', 'ghostWhite', 'whiteSmoke', 'seaShell', 'beige', 'oldLace', 'floralWhite', 'ivory', 'antiqueWhite', 'linen', 'lavenderBlush', 'mistyRose']
    const greyColors = ['gainsboro', 'lightGray', 'silver', 'darkGray', 'dimGray', 'gray', 'lightSlateGray', 'darkSlateGray', 'black']

    let code = durationInHours
    const codeColor = {
        1: redColors,
        2: yellowColors,
        3: orangeColors, 
        4: brownColors,
        5: pinkColors,
        6: greenColors,
        7: cyanColors,
        8: blueColors,
        9: purpleColors,
        10: whiteColors,
        11: greyColors
    }
    let r
    let random

    while (true){
        random = Math.floor(Math.random() * codeColor[code].length)
        r = codeColor[code][random]
        code = yield r
    }
}

function getHSLColorFromDuration(durationInHours, saturation = 100, light = 50){
    const hue = (durationInHours - 1) * (360 / 9)
    return `hsl(${hue} ${saturation}% ${light}%)`;
}