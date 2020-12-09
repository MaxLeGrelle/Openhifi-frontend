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
let onRandomList = false;
let volume;
let toPlayMusicsList;
let dataMusics;
let id;

//source : https://codepen.io/astephannie/pen/NaBKLG

function displayLecture(musics, indexMusicSelected, data) {
    if (sound) stopMusic()
    id = data.id
    musicsList = new Array()
    musics.forEach(music => {
        musicsList.push(music)
    });
    // musicsList = musics
    currentMusicIndex = parseInt(indexMusicSelected);
    dataMusics = data
    if (onRandomList) fillToPlayMusicsList()
    playMusic()
}

function playMusic() {
    if (sound) stopMusic()
    sound = musicsList[currentMusicIndex];
    $(`#music${id+"-"+currentMusicIndex}`).addClass("musicPlaying")
    sound.loop(onLoopSound)
    sound.volume(volume)
    onListening()
}

function stopMusic() {
    if(!sound) return;
    sound.stop() //if an other music is playing, it will stop it
    $(`#music${id+"-"+currentMusicIndex}`).removeClass("musicPlaying")
}

function barClick(e) {
    var position = e.clientX - this.getBoundingClientRect().left; //get the postion of the cursor on the div audio-progress in px
    var duration = sound.duration() // get the duration of the sound played
    position = position / 600 // division by 600 because the width of the div is 600 (maybe optimized this)
    position = duration * position // transform the position from pixels to seconds
    sound.seek(position) // update where the sound is
}

function audioClick(e) {
    var position = e.clientY - this.getBoundingClientRect().top;
    volume = 1 - position / 100
    sound.volume(volume);
    barVolProgress.style.height = (100 - sound.volume() * 100) + '%';
}


function displayPlayer() {
    $("#player").empty()
    $("#player").append(`<div id = "generalLecture">
    <hr id="player-hr" class="w-100 m-0">

    <div class = "playerPosition">
        <div id = "playerBlocInfo">
        </div>
        <div id = "playerBlocCenter" class="align-self-center">
            <div id= "playerButtons"> 
                <button id="btnRandom"><i class="fas fa-random"></i></button>
                <button id="btnPrevious"><i class="fas fa-step-backward"></i></button>
                <button id='howler-play'><i class="fas fa-play"></i></button>

                <button id="btnNext"><i class="fas fa-step-forward"></i></button>
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
    if (sound) displayDataPlayer()
    $("#howler-play").on("click", onListening)
    $("#howler-vol").on("click", onChangingVolume);
    $(".audio-progress").on("click", barClick)
    $("#howler-loop").on("click", onLoop)
    $("#btnPrevious").on("click", onPrevious)
    $("#btnNext").on("click", onNext)
    $("#btnRandom").on("click", onRandom)


}

function onPrevious() {
    if (!sound) return;
    if (sound.seek() >= 5 || currentMusicIndex == 0 || onLoopSound) {
        sound.seek(0)
    } else {
        stopMusic()
        currentMusicIndex--
        playMusic()
    }

}

function onNext() {
    if (!sound) return;
    if (onLoopSound) {
        sound.seek(0)
        return;
    }
    stopMusic()
    if (!onRandomList && !onLoopAlbum && currentMusicIndex == musicsList.length - 1) return
    onEnd()
}

function onRandom() {
    if (!sound) return;
    if (onRandomList) {
        onRandomList = false;
        $(".fa-random").removeClass("randomActive")
    } else {
        onRandomList = true;
        $(".fa-random").addClass("randomActive")
        toPlayMusicsList = new Array()
        fillToPlayMusicsList()
    }
}

function fillToPlayMusicsList() {
    toPlayMusicsList = new Array()
    for (let i = 0; i < musicsList.length; i++) {
        if (i == currentMusicIndex) continue
        toPlayMusicsList.push(i)
    }
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
    $("#progress").css("width", (((seek / self.duration()) * 100) || 0) + '%')

    if (self.playing()) {
        requestAnimationFrame(updateTimeTracker.bind(self));
    }
}

function onLoop() {
    if (!sound) return;
    $("#howler-loop").empty()
    if (!onLoopAlbum && !onLoopSound) {
        $("#howler-loop").append(`<img src = "${loopAlbumActive}" href="loop">`)
        onLoopAlbum = true;
    } else if (onLoopAlbum && !onLoopSound) {
        onLoopAlbum = false;
        sound.loop(true)
        $("#howler-loop").append(`<img src = "${loopActive}" href="loop">`)
        onLoopSound = true;
    } else {
        onLoopAlbum = false;
        onLoopSound = false;
        $("#howler-loop").append(`<img src = "${loop}" href="loop">`)
        sound.loop(false)
    }
}

function onListening() {
    if (!sound) return;
    $("#howler-play").empty()
    if (!(sound.playing())) {
        $("#howler-play").append(`<i class="fas fa-pause"></i>`)
        sound.play();
    } else {
        $("#howler-play").append(`<i class="fas fa-play"></i>`)
        sound.pause();
    }
}

function onChangingVolume() {
    if (!sound) return;
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
    $(`#music${id+"-"+currentMusicIndex}`).addClass("musicPlaying")
    sound.volume(volume)
    displayDataPlayer()
    var time = Math.round(sound.duration());
    $('#duration').html(formatTime(time));
    // Start upating the progress of the track.
    requestAnimationFrame(updateTimeTracker.bind(this));
}

function onEnd() {
    if (onLoopSound) return;
    $(`#music${id+"-"+currentMusicIndex}`).removeClass("musicPlaying")
    if (onRandomList) {
        if (toPlayMusicsList.length == 0) {
            if (onLoopAlbum) fillToPlayMusicsList()
            else {
                sound.stop();
                return;
            }
        }
        let newIndex = toPlayMusicsList[Math.floor(Math.random() * toPlayMusicsList.length)]
        let i = toPlayMusicsList.indexOf(newIndex)
        toPlayMusicsList.splice(i, 1)
        currentMusicIndex = newIndex;

    } else {
        currentMusicIndex++;
    }

    if (onLoopAlbum && currentMusicIndex == musicsList.length)
        currentMusicIndex = 0;
    else if ((!onLoopAlbum && currentMusicIndex == musicsList.length)) {
        sound.stop();
        return;
    }
    sound = musicsList[currentMusicIndex];
    sound.play()
}

function displayDataPlayer() {
    $("#playerBlocInfo").empty()
    $("#playerBlocInfo").append(`
    <img src="${dataMusics.image64}" width="175px" height="100px">
    <div class="ml-3 d-flex flex-column justify-content-center">
        <p class="mb-1">${dataMusics.listMusicsInfo[currentMusicIndex].title}</p>
        <p>${dataMusics.creator}</p>
    </div>
    `)
    let time = Math.round(sound.duration());
    $('#duration').html(formatTime(time));
    if (sound.playing()) {
        $("#howler-play").empty()
        $("#howler-play").append(`<i class="fas fa-pause"></i>`)
    }
    if (onLoopAlbum) {
        $("#howler-loop").empty()
        $("#howler-loop").append(`<img src = "${loopAlbumActive}" href="loop">`)
    }else if (onLoopSound) {
        $("#howler-loop").empty()
        $("#howler-loop").append(`<img src = "${loopActive}" href="loop">`)
    }
    if (onRandomList) {
        $(".fa-random").addClass("randomActive")
    }
}

export {
    displayLecture,
    displayPlayer,
    onPlay,
    onEnd,
    stopMusic,
    formatTime
};