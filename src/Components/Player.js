import {
    displayNavBar,
    displayMenu
} from './Home.js'
import {
    onNavigate
} from './Router.js'
//import music from '../sounds/m1.mp3'
import loop from '../img/loop.png'
import loopActive from '../img/loop-active.png'
import loopAlbumActive from '../img/loop-album-active.png'
const howler = require("howler")

let sound;
let musicsList;
let vol = false;
let currentMusicIndex;
let onLoopAlbum = false;
let onLoopSound = false;

//source : https://codepen.io/astephannie/pen/NaBKLG

function displayLecture(musics, indexMusicSelected) {
    if (sound) sound.stop() //if an other music is playing, it will stop it
    musicsList = musics
    currentMusicIndex = parseInt(indexMusicSelected);
    sound = musics[indexMusicSelected];
    sound.loop(onLoopSound);
    onListening()
}

function barClick(e) {
    var position = e.clientX - this.getBoundingClientRect().left; //get the postion of the cursor on the div audio-progress in px
    console.log(position)
    var duration = sound.duration() // get the duration of the sound played
    position = position / 600 // division by 600 because the width of the div is 600 (maybe optimized this)
    position = duration * position // transform the position from pixels to seconds
    sound.seek(position) // update where the sound is
}

function audioClick(e) {
    var position = e.clientY - this.getBoundingClientRect().top;
    var volume = 1 - position / 100
    sound.volume(volume);
    console.log(volume)
    barVolProgress.style.height = (100 - sound.volume() * 100) + '%';

}


function displayPlayer() {
    $("#player").append(`<div id = "generalLecture">
    <div class = "playerPosition">
        <div id = "playerBlocInfo"> 
        </div>
        <div id = "playerBlocCenter">
            <div id= "playerButtons"> 
                <button><i class="fas fa-random"></i></button>
                <button><i class="fas fa-backward"></i></button>
                <button id='howler-play'><i class="fas fa-play"></i></button>

                <button><i class="fas fa-forward"></i></button>
                <button id='howler-loop'><img src = "${loop}" href="loop"></button>
            </div>
            <div id="player-bar">
                <span id="timer">0:00 </span>
                <div class="audio-progress">
                    <div id="progress">
                    </div>
                </div>
                <span id="duration">0:00</span>
            </div>
        </div>    
        <div id="contenaire-vol">
            <div id="displayBarVol"> 
            </div>
            <button id='howler-vol'><i class="fas fa-volume-up"></i></button>
        </div> 
    </div>   
    `)
    $("#howler-play").on("click", onListening)
    $("#howler-vol").on("click", onChangingVolume);
    $(".audio-progress").on("click", barClick)
    $("#howler-loop").on("click", onLoop)

}

function formatTime(secs) {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function updateTimeTracker() {
    var self = this;
    var seek = sound.seek() || 0;
    var currentTime = formatTime(Math.round(seek));
    $('#timer').text(currentTime);
    progress.style.width = (((seek / self.duration()) * 100) || 0) + '%';

    if (self.playing()) {
        requestAnimationFrame(updateTimeTracker.bind(self));
    }
}

function onLoop() {
    $("#howler-loop").empty()
    if (!onLoopAlbum && !onLoopSound) {
        $("#howler-loop").append(`<img src = "${loopAlbumActive}" href="loop">`)
        onLoopAlbum = true;
    }else if(onLoopAlbum && !onLoopSound){
        onLoopAlbum = false;
        sound.loop(true)
        $("#howler-loop").append(`<img src = "${loopActive}" href="loop">`)
        onLoopSound = true;
    }else {
        onLoopAlbum = false;
        onLoopSound = false;
        $("#howler-loop").append(`<img src = "${loop}" href="loop">`)
        sound.loop(false)
    }
}

function onListening() {
    $("#howler-play").empty()
    console.log("SOUND",sound)
    if (!(sound.playing())) {
        $("#howler-play").append(`<i class="fas fa-pause"></i>`)
        sound.play();
    } else {
        $("#howler-play").append(`<i class="fas fa-play"></i>`)
        sound.pause();
    }
}

function onChangingVolume() {
    $("#displayBarVol").empty()
    if (vol) {
        vol = false;
    } else {
        vol = true;
        $("#displayBarVol").append(`<div id = "bar-vol"><div id="barVolProgress"></div></div>`)
        barVolProgress.style.height = (100 - sound.volume() * 100) + '%';
        $("#bar-vol").on("click", audioClick)
    }
}

function onPlay() {
    var time = Math.round(sound.duration());
    $('#duration').html(formatTime(time));
    // Start upating the progress of the track.
    requestAnimationFrame(updateTimeTracker.bind(this));
    //$(`#music${currentMusicIndex}`).addClass("musicPlayingHover")
}

function onEnd() {
    if(onLoopSound) return;
    currentMusicIndex++;
    if(onLoopAlbum && currentMusicIndex == musicsList.length)
        currentMusicIndex = 0;
    else if(!onLoopAlbum && currentMusicIndex == musicsList.length){
        sound.stop();
    }    
    sound = musicsList[currentMusicIndex];
    sound.play()

}

function onStop() {
    //$(`#music${currentMusicIndex}`).removeClass("musicPlayingHover")
}

export {
    displayLecture,
    displayPlayer,
    onPlay,
    onEnd,
    onStop
};