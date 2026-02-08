'use strict'


class MusicPlayer {
    constructor(musicFile = [], soundFile = []){
        this.musicFile = function(){
            let r = {}
            musicFile.forEach((string) =>{
                r[string] = new Audio()
                r[string].src = string
                r[string].loop = true
            })
            return r;
        }()
    
        this.soundFile = function(){
            let r = {}
            soundFile.forEach((string) =>{
                r[string] = new Audio()
                r[string].src = string
                r[string].loop = false
            })
            return r;
        }()

    }
    current = ''
    hasChanged = false
    isMuted = false
    playMusic(){
        if (this.current === ''){
            return;
        }
        if (this.hasChanged === false){
            return;
        }
        if (this.isMuted){
            this.musicFile[this.current].pause()
        }
        else {
            this.musicFile[this.current].play()
        }
        this.hasChanged = false
    }
    stopMusic(){
        if (this.current === ''){
            return;
        }
        this.musicFile[this.current].pause()
        this.current = ''
    }
    changeMusic(musicName){
        if (musicName === this.current){
            return;
        }
        if (this.current !== ''){
            this.musicFile[this.current].pause()
        }  
        this.current = musicName
        if (this.isMuted){
            this.musicFile[this.current].pause()
        }
        else {
            this.musicFile[this.current].play()
        }
        this.hasChanged = true
    }
    muteUnmuteMusic(){
        if (this.isMuted === false){
            this.isMuted = true
            if (this.current !== '') {this.musicFile[this.current].pause()}
        }
        else if (this.isMuted === true){
            this.isMuted = false
            if (this.current !== '') {this.musicFile[this.current].play()}
        }
    }
    playSound(soundName){
        const audio = this.soundFile[soundName].cloneNode()
        audio.play()
    }

}






