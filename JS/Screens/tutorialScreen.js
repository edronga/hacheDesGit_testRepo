'use strict'

function tutorialScreen(text, canvasDescription){
    let r = document.createElement('div')

    const canvas = document.createElement('canvas')
    r.appendChild(canvas)
    const CANVAS_HEIGHT = 0.8
    const CANVAS_WIDTH = 1
    canvas.height = window.innerHeight * CANVAS_HEIGHT
    canvas.width = window.innerWidth * CANVAS_WIDTH
    const ctx = canvas.getContext('2d')

    canvasDescription.drawAll(canvas.width, canvas.height, ctx)

    const textDiv = document.createElement('div')
    r.appendChild(textDiv)
    const textArea = document.createElement('div')
    textDiv.appendChild(textArea)
    const textValue = document.createElement('p')
    textArea.appendChild(textValue)
    textValue.innerHTML = text
    const imgArea = document.createElement('div')
    textDiv.appendChild(imgArea)

    r.style.margin = 0
    r.style.height = '95dvh'
    r.style.width = '100dvw'

    textDiv.style.margin = 0
    textDiv.style.height = `${95 - 95 * CANVAS_HEIGHT}dvh`
    textDiv.style.width = '100dvw'
    textDiv.style.display = 'flex'
    textDiv.style.alignContent = 'center'
    textDiv.style.alignItems = 'center'

    textArea.style.height = '100%'
    textArea.style.width = '80%'
    textArea.style.display = 'flex'
    textArea.style.justifyItems = 'center'
    textArea.style.alignItems = 'center'
    textArea.style.justifyContent = 'center'
    textArea.style.alignContent = 'center'

    textValue.style.marginLeft = '5px'
    textValue.style.marginTop = '0px'
    textValue.style.marginBottom = '0px'
    textValue.style.display = 'flex'
    textValue.style.justifyContent = 'center'
    textValue.style.justifyContent = 'center'
    textValue.style.alignContent = 'center'
    textValue.style.alignItems = 'center'

    imgArea.style.height = '100%'
    imgArea.style.width = '20%'
    imgArea.style.backgroundImage = 'url(Images/imgNerdEmoji.png)'
    imgArea.style.backgroundPosition = 'center'
    imgArea.style.backgroundRepeat = 'no-repeat'
    imgArea.style.backgroundSize = 'contain'


    // event listeners

    r.addEventListener('pointerdown', () =>{
        const data = getNextTutorialData.next().value
        const isOver = data.isOver
        if (isOver){
            getNextTutorialData = gen_getNextTutorialData()
            goToMenu()
            return
        }
        const text = data.text
        const canvasDescription = data.canvasDescription
        goToTutorialScreen(text, canvasDescription)
    })

   
    return function (){return r;};
}

let getNextTutorialData = gen_getNextTutorialData()
function* gen_getNextTutorialData(){
    let r = {
        isOver: false,
        text: '',
        canvasDescription: new CanvasDescription(new Schedule(), new Schedule(), window.innerWidth, window.innerHeight*0.8)
    }

    const plot = [
        {
            isOver: false,
            text: `Il faut essayer d'optimiser le planning au maximum :<br>4 boxs, 1 infirmier(e), des horaires de m***e, quelques contraintes.`,
            canvasDescription: new CanvasDescription(generateRandomSchedule(16), new Schedule(), window.innerWidth, window.innerHeight*0.8)
        },
        {
            isOver: false,
            text: `Sur le planning idéal, on souhaiterait au max 3 patients en même temps pour un(e) infirmier(e), et un ratio 1 pour 1 sur les 30 premières minutes et les 30 dernières minutes de prise en charge.`,
            canvasDescription: function(){
                const perfectSchedule = function(){
                    const listOfPerfectSchedules =[
                        {"value":{"name_18700":{"durationInHours":2,"startingTime":15,"endingTime":17,"room":2},"name_18701":{"durationInHours":2,"startingTime":9.5,"endingTime":11.5,"room":3},"name_18702":{"durationInHours":1,"startingTime":13.5,"endingTime":14.5,"room":4},"name_18703":{"durationInHours":3,"startingTime":10,"endingTime":13,"room":2},"name_18704":{"durationInHours":3,"startingTime":13,"endingTime":16,"room":1},"name_18705":{"durationInHours":5,"startingTime":11.5,"endingTime":16.5,"room":3},"name_18706":{"durationInHours":1,"startingTime":17.5,"endingTime":18.5,"room":2},"name_18707":{"durationInHours":2,"startingTime":17,"endingTime":19,"room":4}}},
                        {"value":{"name_40220":{"durationInHours":4,"startingTime":10,"endingTime":14,"room":2},"name_40221":{"durationInHours":1,"startingTime":18,"endingTime":19,"room":3},"name_40222":{"durationInHours":1,"startingTime":10.5,"endingTime":11.5,"room":3},"name_40223":{"durationInHours":3,"startingTime":9.5,"endingTime":12.5,"room":4},"name_40224":{"durationInHours":3,"startingTime":11.5,"endingTime":14.5,"room":3},"name_40225":{"durationInHours":1,"startingTime":15.5,"endingTime":16.5,"room":3},"name_40226":{"durationInHours":1,"startingTime":17,"endingTime":18,"room":2},"name_40227":{"durationInHours":2,"startingTime":15,"endingTime":17,"room":2}}},
                        {"value":{"name_41100":{"durationInHours":1,"startingTime":13.5,"endingTime":14.5,"room":2},"name_41101":{"durationInHours":2,"startingTime":13,"endingTime":15,"room":3},"name_41102":{"durationInHours":1,"startingTime":17,"endingTime":18,"room":3},"name_41103":{"durationInHours":1,"startingTime":18,"endingTime":19,"room":4},"name_41104":{"durationInHours":1,"startingTime":15,"endingTime":16,"room":1},"name_41105":{"durationInHours":3,"startingTime":10,"endingTime":13,"room":1},"name_41106":{"durationInHours":3,"startingTime":9,"endingTime":12,"room":2},"name_41107":{"durationInHours":5,"startingTime":12,"endingTime":17,"room":4}}},
                        {"value":{"name_116620":{"durationInHours":1,"startingTime":12.5,"endingTime":13.5,"room":1},"name_116621":{"durationInHours":1,"startingTime":17.5,"endingTime":18.5,"room":3},"name_116622":{"durationInHours":3,"startingTime":11,"endingTime":14,"room":3},"name_116623":{"durationInHours":6,"startingTime":11.5,"endingTime":17.5,"room":2},"name_116624":{"durationInHours":4,"startingTime":15,"endingTime":19,"room":4},"name_116625":{"durationInHours":1,"startingTime":15.5,"endingTime":16.5,"room":3},"name_116626":{"durationInHours":1,"startingTime":9.5,"endingTime":10.5,"room":4},"name_116627":{"durationInHours":1,"startingTime":14,"endingTime":15,"room":3}}},
                        {"value":{"name_214859":{"durationInHours":2,"startingTime":14,"endingTime":16,"room":1},"name_214860":{"durationInHours":4,"startingTime":13,"endingTime":17,"room":2},"name_214861":{"durationInHours":2,"startingTime":16,"endingTime":18,"room":3},"name_214862":{"durationInHours":2,"startingTime":12,"endingTime":14,"room":4},"name_214863":{"durationInHours":1,"startingTime":14.5,"endingTime":15.5,"room":3},"name_214864":{"durationInHours":1,"startingTime":11,"endingTime":12,"room":1},"name_214865":{"durationInHours":1,"startingTime":18,"endingTime":19,"room":2},"name_214866":{"durationInHours":1,"startingTime":10,"endingTime":11,"room":2}}},
                        {"value":{"name_237211":{"durationInHours":2,"startingTime":10.5,"endingTime":12.5,"room":1},"name_237212":{"durationInHours":1,"startingTime":13,"endingTime":14,"room":2},"name_237213":{"durationInHours":2,"startingTime":14,"endingTime":16,"room":4},"name_237214":{"durationInHours":2,"startingTime":16,"endingTime":18,"room":2},"name_237215":{"durationInHours":1,"startingTime":16.5,"endingTime":17.5,"room":1},"name_237216":{"durationInHours":2,"startingTime":10,"endingTime":12,"room":3},"name_237217":{"durationInHours":1,"startingTime":14.5,"endingTime":15.5,"room":3},"name_237218":{"durationInHours":1,"startingTime":18,"endingTime":19,"room":3}}},
                        {"value":{"name_263555":{"durationInHours":2,"startingTime":16.5,"endingTime":18.5,"room":3},"name_263556":{"durationInHours":1,"startingTime":14,"endingTime":15,"room":2},"name_263557":{"durationInHours":4,"startingTime":11.5,"endingTime":15.5,"room":3},"name_263558":{"durationInHours":2,"startingTime":17,"endingTime":19,"room":1},"name_263559":{"durationInHours":2,"startingTime":16,"endingTime":18,"room":2},"name_263560":{"durationInHours":6,"startingTime":10,"endingTime":16,"room":1},"name_263561":{"durationInHours":1,"startingTime":10.5,"endingTime":11.5,"room":4},"name_263562":{"durationInHours":2,"startingTime":12,"endingTime":14,"room":4}}},
                        {"value":{"name_288771":{"durationInHours":2,"startingTime":13.5,"endingTime":15.5,"room":1},"name_288772":{"durationInHours":8,"startingTime":9,"endingTime":17,"room":3},"name_288773":{"durationInHours":4,"startingTime":14.5,"endingTime":18.5,"room":4},"name_288774":{"durationInHours":1,"startingTime":12,"endingTime":13,"room":2},"name_288775":{"durationInHours":1,"startingTime":15.5,"endingTime":16.5,"room":2},"name_288776":{"durationInHours":4,"startingTime":10.5,"endingTime":14.5,"room":4},"name_288777":{"durationInHours":1,"startingTime":11,"endingTime":12,"room":1},"name_288778":{"durationInHours":2,"startingTime":17,"endingTime":19,"room":1}}},
                        {"value":{"name_297443":{"durationInHours":1,"startingTime":18,"endingTime":19,"room":4},"name_297444":{"durationInHours":2,"startingTime":15.5,"endingTime":17.5,"room":3},"name_297445":{"durationInHours":4,"startingTime":11,"endingTime":15,"room":4},"name_297446":{"durationInHours":2,"startingTime":15,"endingTime":17,"room":1},"name_297447":{"durationInHours":2,"startingTime":16,"endingTime":18,"room":4},"name_297448":{"durationInHours":2,"startingTime":10,"endingTime":12,"room":1},"name_297449":{"durationInHours":1,"startingTime":9,"endingTime":10,"room":1},"name_297450":{"durationInHours":1,"startingTime":12,"endingTime":13,"room":3}}},
                        {"value":{"name_303931":{"durationInHours":1,"startingTime":14.5,"endingTime":15.5,"room":2},"name_303932":{"durationInHours":1,"startingTime":10,"endingTime":11,"room":3},"name_303933":{"durationInHours":3,"startingTime":16,"endingTime":19,"room":4},"name_303934":{"durationInHours":1,"startingTime":17.5,"endingTime":18.5,"room":1},"name_303935":{"durationInHours":1,"startingTime":16.5,"endingTime":17.5,"room":1},"name_303936":{"durationInHours":1,"startingTime":13.5,"endingTime":14.5,"room":3},"name_303937":{"durationInHours":3,"startingTime":9.5,"endingTime":12.5,"room":2},"name_303938":{"durationInHours":4,"startingTime":9,"endingTime":13,"room":1}}},
                        {"value":{"name_320619":{"durationInHours":4,"startingTime":11.5,"endingTime":15.5,"room":3},"name_320620":{"durationInHours":3,"startingTime":10,"endingTime":13,"room":4},"name_320621":{"durationInHours":3,"startingTime":14,"endingTime":17,"room":2},"name_320622":{"durationInHours":2,"startingTime":12,"endingTime":14,"room":1},"name_320623":{"durationInHours":3,"startingTime":13,"endingTime":16,"room":4},"name_320624":{"durationInHours":1,"startingTime":18,"endingTime":19,"room":1},"name_320625":{"durationInHours":1,"startingTime":17,"endingTime":18,"room":1},"name_320626":{"durationInHours":1,"startingTime":10.5,"endingTime":11.5,"room":2}}},
                        {"value":{"name_359195":{"durationInHours":3,"startingTime":14,"endingTime":17,"room":1},"name_359196":{"durationInHours":3,"startingTime":12,"endingTime":15,"room":2},"name_359197":{"durationInHours":1,"startingTime":12.5,"endingTime":13.5,"room":3},"name_359198":{"durationInHours":1,"startingTime":17.5,"endingTime":18.5,"room":2},"name_359199":{"durationInHours":4,"startingTime":10,"endingTime":14,"room":4},"name_359200":{"durationInHours":1,"startingTime":9,"endingTime":10,"room":4},"name_359201":{"durationInHours":1,"startingTime":15.5,"endingTime":16.5,"room":2},"name_359202":{"durationInHours":1,"startingTime":11,"endingTime":12,"room":3}}},
                        {"value":{"name_417979":{"durationInHours":1,"startingTime":16,"endingTime":17,"room":1},"name_417980":{"durationInHours":1,"startingTime":12.5,"endingTime":13.5,"room":4},"name_417981":{"durationInHours":3,"startingTime":9.5,"endingTime":12.5,"room":2},"name_417982":{"durationInHours":3,"startingTime":11.5,"endingTime":14.5,"room":3},"name_417983":{"durationInHours":5,"startingTime":11,"endingTime":16,"room":1},"name_417984":{"durationInHours":2,"startingTime":17,"endingTime":19,"room":3},"name_417985":{"durationInHours":1,"startingTime":17.5,"endingTime":18.5,"room":2},"name_417986":{"durationInHours":1,"startingTime":10,"endingTime":11,"room":4}}},
                        {"value":{"name_461387":{"durationInHours":5,"startingTime":13,"endingTime":18,"room":1},"name_461388":{"durationInHours":3,"startingTime":9.5,"endingTime":12.5,"room":3},"name_461389":{"durationInHours":1,"startingTime":16,"endingTime":17,"room":2},"name_461390":{"durationInHours":1,"startingTime":14.5,"endingTime":15.5,"room":3},"name_461391":{"durationInHours":2,"startingTime":15.5,"endingTime":17.5,"room":3},"name_461392":{"durationInHours":2,"startingTime":11,"endingTime":13,"room":2},"name_461393":{"durationInHours":1,"startingTime":10,"endingTime":11,"room":4},"name_461394":{"durationInHours":1,"startingTime":18,"endingTime":19,"room":3}}},
                        {"value":{"name_531699":{"durationInHours":6,"startingTime":11.5,"endingTime":17.5,"room":1},"name_531700":{"durationInHours":2,"startingTime":16.5,"endingTime":18.5,"room":2},"name_531701":{"durationInHours":1,"startingTime":15.5,"endingTime":16.5,"room":2},"name_531702":{"durationInHours":3,"startingTime":15,"endingTime":18,"room":3},"name_531703":{"durationInHours":4,"startingTime":11,"endingTime":15,"room":4},"name_531704":{"durationInHours":1,"startingTime":12.5,"endingTime":13.5,"room":3},"name_531705":{"durationInHours":1,"startingTime":10,"endingTime":11,"room":1},"name_531706":{"durationInHours":1,"startingTime":9,"endingTime":10,"room":2}}},
                        {"value":{"name_583035":{"durationInHours":1,"startingTime":18,"endingTime":19,"room":4},"name_583036":{"durationInHours":2,"startingTime":9,"endingTime":11,"room":3},"name_583037":{"durationInHours":2,"startingTime":15.5,"endingTime":17.5,"room":1},"name_583038":{"durationInHours":3,"startingTime":11,"endingTime":14,"room":1},"name_583039":{"durationInHours":1,"startingTime":14,"endingTime":15,"room":3},"name_583040":{"durationInHours":4,"startingTime":9.5,"endingTime":13.5,"room":4},"name_583041":{"durationInHours":7,"startingTime":10,"endingTime":17,"room":2},"name_583042":{"durationInHours":2,"startingTime":16,"endingTime":18,"room":4}}},
                        {"value":{"name_622219":{"durationInHours":1,"startingTime":12.5,"endingTime":13.5,"room":4},"name_622220":{"durationInHours":3,"startingTime":16,"endingTime":19,"room":2},"name_622221":{"durationInHours":1,"startingTime":10,"endingTime":11,"room":2},"name_622222":{"durationInHours":1,"startingTime":14,"endingTime":15,"room":3},"name_622223":{"durationInHours":2,"startingTime":16.5,"endingTime":18.5,"room":3},"name_622224":{"durationInHours":1,"startingTime":11.5,"endingTime":12.5,"room":4},"name_622225":{"durationInHours":1,"startingTime":17,"endingTime":18,"room":1},"name_622226":{"durationInHours":2,"startingTime":9.5,"endingTime":11.5,"room":4}}},
                        {"value":{"name_661091":{"durationInHours":5,"startingTime":10,"endingTime":15,"room":2},"name_661092":{"durationInHours":4,"startingTime":10.5,"endingTime":14.5,"room":3},"name_661093":{"durationInHours":1,"startingTime":13,"endingTime":14,"room":4},"name_661094":{"durationInHours":1,"startingTime":15,"endingTime":16,"room":4},"name_661095":{"durationInHours":1,"startingTime":16.5,"endingTime":17.5,"room":2},"name_661096":{"durationInHours":1,"startingTime":17.5,"endingTime":18.5,"room":4},"name_661097":{"durationInHours":1,"startingTime":9,"endingTime":10,"room":3},"name_661098":{"durationInHours":1,"startingTime":12,"endingTime":13,"room":4}}},
                        {"value":{"name_728723":{"durationInHours":1,"startingTime":15,"endingTime":16,"room":3},"name_728724":{"durationInHours":1,"startingTime":11,"endingTime":12,"room":4},"name_728725":{"durationInHours":1,"startingTime":18,"endingTime":19,"room":3},"name_728726":{"durationInHours":2,"startingTime":9,"endingTime":11,"room":2},"name_728727":{"durationInHours":2,"startingTime":14.5,"endingTime":16.5,"room":1},"name_728728":{"durationInHours":3,"startingTime":10,"endingTime":13,"room":1},"name_728729":{"durationInHours":1,"startingTime":17,"endingTime":18,"room":4},"name_728730":{"durationInHours":3,"startingTime":14,"endingTime":17,"room":2}}},
                        {"value":{"name_745307":{"durationInHours":3,"startingTime":14.5,"endingTime":17.5,"room":2},"name_745308":{"durationInHours":3,"startingTime":14,"endingTime":17,"room":3},"name_745309":{"durationInHours":1,"startingTime":12,"endingTime":13,"room":2},"name_745310":{"durationInHours":1,"startingTime":9.5,"endingTime":10.5,"room":2},"name_745311":{"durationInHours":1,"startingTime":15,"endingTime":16,"room":1},"name_745312":{"durationInHours":5,"startingTime":9,"endingTime":14,"room":4},"name_745313":{"durationInHours":1,"startingTime":18,"endingTime":19,"room":4},"name_745314":{"durationInHours":2,"startingTime":16,"endingTime":18,"room":1}}},
                        {"value":{"name_829027":{"durationInHours":2,"startingTime":10.5,"endingTime":12.5,"room":2},"name_829028":{"durationInHours":1,"startingTime":14,"endingTime":15,"room":3},"name_829029":{"durationInHours":4,"startingTime":9,"endingTime":13,"room":4},"name_829030":{"durationInHours":6,"startingTime":11.5,"endingTime":17.5,"room":1},"name_829031":{"durationInHours":2,"startingTime":9.5,"endingTime":11.5,"room":1},"name_829032":{"durationInHours":3,"startingTime":13,"endingTime":16,"room":2},"name_829033":{"durationInHours":3,"startingTime":15,"endingTime":18,"room":3},"name_829034":{"durationInHours":1,"startingTime":16,"endingTime":17,"room":2}}},
                        {"value":{"name_841499":{"durationInHours":2,"startingTime":15,"endingTime":17,"room":1},"name_841500":{"durationInHours":2,"startingTime":13,"endingTime":15,"room":1},"name_841501":{"durationInHours":3,"startingTime":13.5,"endingTime":16.5,"room":3},"name_841502":{"durationInHours":1,"startingTime":17.5,"endingTime":18.5,"room":1},"name_841503":{"durationInHours":2,"startingTime":12.5,"endingTime":14.5,"room":2},"name_841504":{"durationInHours":2,"startingTime":15.5,"endingTime":17.5,"room":2},"name_841505":{"durationInHours":1,"startingTime":10.5,"endingTime":11.5,"room":2},"name_841506":{"durationInHours":1,"startingTime":9.5,"endingTime":10.5,"room":1}}},
                        {"value":{"name_843715":{"durationInHours":8,"startingTime":10,"endingTime":18,"room":3},"name_843716":{"durationInHours":1,"startingTime":14,"endingTime":15,"room":1},"name_843717":{"durationInHours":1,"startingTime":16,"endingTime":17,"room":1},"name_843718":{"durationInHours":1,"startingTime":11,"endingTime":12,"room":2},"name_843719":{"durationInHours":1,"startingTime":15,"endingTime":16,"room":4},"name_843720":{"durationInHours":2,"startingTime":9,"endingTime":11,"room":2},"name_843721":{"durationInHours":2,"startingTime":12,"endingTime":14,"room":1},"name_843722":{"durationInHours":1,"startingTime":18,"endingTime":19,"room":1}}},
                        {"value":{"name_854067":{"durationInHours":3,"startingTime":12.5,"endingTime":15.5,"room":4},"name_854068":{"durationInHours":3,"startingTime":11,"endingTime":14,"room":3},"name_854069":{"durationInHours":1,"startingTime":17,"endingTime":18,"room":1},"name_854070":{"durationInHours":2,"startingTime":16.5,"endingTime":18.5,"room":2},"name_854071":{"durationInHours":1,"startingTime":9.5,"endingTime":10.5,"room":2},"name_854072":{"durationInHours":1,"startingTime":15.5,"endingTime":16.5,"room":3},"name_854073":{"durationInHours":1,"startingTime":14,"endingTime":15,"room":3},"name_854074":{"durationInHours":2,"startingTime":9,"endingTime":11,"room":4}}},
                        {"value":{"name_930211":{"durationInHours":4,"startingTime":11.5,"endingTime":15.5,"room":2},"name_930212":{"durationInHours":6,"startingTime":12,"endingTime":18,"room":3},"name_930213":{"durationInHours":1,"startingTime":15.5,"endingTime":16.5,"room":4},"name_930214":{"durationInHours":2,"startingTime":17,"endingTime":19,"room":4},"name_930215":{"durationInHours":2,"startingTime":16.5,"endingTime":18.5,"room":2},"name_930216":{"durationInHours":1,"startingTime":14,"endingTime":15,"room":4},"name_930217":{"durationInHours":4,"startingTime":9,"endingTime":13,"room":4},"name_930218":{"durationInHours":1,"startingTime":13,"endingTime":14,"room":4}}},
                        {"value":{"name_954723":{"durationInHours":3,"startingTime":14,"endingTime":17,"room":3},"name_954724":{"durationInHours":1,"startingTime":9.5,"endingTime":10.5,"room":4},"name_954725":{"durationInHours":1,"startingTime":17,"endingTime":18,"room":2},"name_954726":{"durationInHours":1,"startingTime":12,"endingTime":13,"room":2},"name_954727":{"durationInHours":1,"startingTime":15,"endingTime":16,"room":4},"name_954728":{"durationInHours":3,"startingTime":16,"endingTime":19,"room":1},"name_954729":{"durationInHours":3,"startingTime":9,"endingTime":12,"room":2},"name_954730":{"durationInHours":1,"startingTime":10.5,"endingTime":11.5,"room":3}}},
                        {"value":{"name_973555":{"durationInHours":2,"startingTime":15,"endingTime":17,"room":4},"name_973556":{"durationInHours":2,"startingTime":17,"endingTime":19,"room":2},"name_973557":{"durationInHours":3,"startingTime":12,"endingTime":15,"room":1},"name_973558":{"durationInHours":3,"startingTime":13.5,"endingTime":16.5,"room":2},"name_973559":{"durationInHours":3,"startingTime":10,"endingTime":13,"room":2},"name_973560":{"durationInHours":1,"startingTime":17.5,"endingTime":18.5,"room":4},"name_973561":{"durationInHours":2,"startingTime":11.5,"endingTime":13.5,"room":3},"name_973562":{"durationInHours":2,"startingTime":9.5,"endingTime":11.5,"room":4}}},
                        {"value":{"name_979371":{"durationInHours":4,"startingTime":14,"endingTime":18,"room":2},"name_979372":{"durationInHours":2,"startingTime":11.5,"endingTime":13.5,"room":1},"name_979373":{"durationInHours":2,"startingTime":14.5,"endingTime":16.5,"room":4},"name_979374":{"durationInHours":5,"startingTime":10.5,"endingTime":15.5,"room":3},"name_979375":{"durationInHours":2,"startingTime":15.5,"endingTime":17.5,"room":1},"name_979376":{"durationInHours":2,"startingTime":11,"endingTime":13,"room":4},"name_979377":{"durationInHours":1,"startingTime":18,"endingTime":19,"room":1},"name_979378":{"durationInHours":1,"startingTime":9,"endingTime":10,"room":1}}},
                        {"value":{"name_1070339":{"durationInHours":1,"startingTime":17,"endingTime":18,"room":2},"name_1070340":{"durationInHours":1,"startingTime":12,"endingTime":13,"room":2},"name_1070341":{"durationInHours":2,"startingTime":15,"endingTime":17,"room":2},"name_1070342":{"durationInHours":5,"startingTime":11.5,"endingTime":16.5,"room":4},"name_1070343":{"durationInHours":1,"startingTime":10.5,"endingTime":11.5,"room":4},"name_1070344":{"durationInHours":1,"startingTime":18,"endingTime":19,"room":4},"name_1070345":{"durationInHours":3,"startingTime":13,"endingTime":16,"room":3},"name_1070346":{"durationInHours":1,"startingTime":9.5,"endingTime":10.5,"room":3}}},
                        {"value":{"name_1076187":{"durationInHours":2,"startingTime":16,"endingTime":18,"room":3},"name_1076188":{"durationInHours":1,"startingTime":18,"endingTime":19,"room":4},"name_1076189":{"durationInHours":5,"startingTime":12.5,"endingTime":17.5,"room":2},"name_1076190":{"durationInHours":1,"startingTime":10.5,"endingTime":11.5,"room":4},"name_1076191":{"durationInHours":1,"startingTime":9.5,"endingTime":10.5,"room":3},"name_1076192":{"durationInHours":1,"startingTime":14,"endingTime":15,"room":1},"name_1076193":{"durationInHours":2,"startingTime":12,"endingTime":14,"room":1},"name_1076194":{"durationInHours":1,"startingTime":15,"endingTime":16,"room":4}}}
                    ]
                    const random = Math.floor(Math.random() * listOfPerfectSchedules.length)
                    let r = new Schedule()
                    r.value = listOfPerfectSchedules[random].value
                    return r
                }()
                return new CanvasDescription(perfectSchedule, new Schedule(), window.innerWidth, window.innerHeight*0.8)
            }()
        },
        {
            isOver: false,
            text: `Score de pénalité :
            <br>+1 si >3 patients sur le même créneau
            <br>+1 si 2 patients débutent en même temps
            <br>+1 si 2 patients terminent en même temps
            <br>+1 si un patient débute alors qu'un autre patient termine dans 30 min`,
            canvasDescription: function(){
                const fixedSchedule = new Schedule()
                fixedSchedule.addChemoSlot(10, 8, 1)
                fixedSchedule.addChemoSlot(11, 3, 2)
                fixedSchedule.addChemoSlot(12, 3, 3)
                fixedSchedule.addChemoSlot(15.5, 2, 2)
                const badSchedule = fixedSchedule.copy()
                badSchedule.addChemoSlot(12.5, 1, 4)
                badSchedule.addChemoSlot(15.5, 1, 3)
                badSchedule.addChemoSlot(16.5, 1, 3)
                badSchedule.addChemoSlot(17.5, 1, 4)
                return new CanvasDescription(badSchedule, fixedSchedule, window.innerWidth, window.innerHeight*0.8)
            }()
        },
        {
            isOver: false,
            text: `L'objectif est d'avoir le score le plus bas possible <br>Bon courage !`,
            canvasDescription: function(){
                const fixedSchedule = new Schedule()
                const d1_4 = [9, 10, 12, 13, 17, 18]
                const d2_3 = [9, 10, 11, 12, 13, 14, 15, 17, 18]
                d1_4.forEach((n) =>{
                    fixedSchedule.addChemoSlot(n, 1, 1)
                    fixedSchedule.addChemoSlot(n, 1, 4)
                })
                d2_3.forEach((n) =>{
                    fixedSchedule.addChemoSlot(n, 1, 2)
                    fixedSchedule.addChemoSlot(n, 1, 3)
                })
                const smileySchedule = fixedSchedule.copy()
                smileySchedule.addChemoSlot(11, 1, 1)
                smileySchedule.addChemoSlot(11, 1, 4)
                smileySchedule.addChemoSlot(15, 1, 1)
                smileySchedule.addChemoSlot(14, 1, 1)
                smileySchedule.addChemoSlot(16, 1, 1)
                smileySchedule.addChemoSlot(16, 1, 2)
                smileySchedule.addChemoSlot(16, 1, 3)
                smileySchedule.addChemoSlot(14, 1, 4)
                smileySchedule.addChemoSlot(15, 1, 4)
                smileySchedule.addChemoSlot(16, 1, 4)
                return new CanvasDescription(smileySchedule, fixedSchedule, window.innerWidth, window.innerHeight*0.8)
            }()
        },
        {
            isOver: true,
            text: ``,
            canvasDescription: new CanvasDescription(new Schedule(), new Schedule(), window.innerWidth, window.innerHeight*0.8)
        }
    ]

    let i = 0
    while (true){
        yield r = plot[i]
        
        if(plot[i].isOver === false){
            i++
        }
    }

}