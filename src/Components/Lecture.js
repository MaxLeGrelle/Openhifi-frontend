import {displayNavBar,displayMenu} from './Home.js'
import {onNavigate} from './Router.js'
import music from '../sounds/m1.mp3'
import loop from '../img/loop.png'
import { Collapse } from 'bootstrap'

const howler = require("howler")

//source : https://codepen.io/astephannie/pen/NaBKLG

const sound  = new howler.Howl({src: [`${music}`],
    onplay: function() {
        var time = Math.round(sound.duration());
        $('#duration').html(formatTime(time));
        // Start upating the progress of the track.
        requestAnimationFrame(updateTimeTracker.bind(this));
        var volume = sound.volume()},
    volume:0.1,})

function Lecture(){
    displayMain()
  }
  function displayLecture() {
      
      $("#page").empty();
      console.log("affiche lecture");
      $("#page").append(`<div id = "container"> </div>`)
      $("#container").append(` 
          <div id="navbar">
          <div id="logo"></div>
          <div id="search"></div>
          <div id="add"></div>
          <div id="profile"></div>
        </div>
        <div id="menu">
          <div id="favorite"></div>
          <div id="trends"></div>
        </div>
        <div id="main">
         
          </div>`);
  
      $("#navbar").on("click", onNavigate)
      $("#menu").on("click", onNavigate)
      displayMenu()
      displayNavBar()
      Lecture()
      
  }
  function barClick(e){
    var position = e.clientX - this.getBoundingClientRect().left; //get the postion of the cursor on the div audio-progress in px
    console.log(position)
    var duration = sound.duration() // get the duration of the sound played
    position = position /600 // division by 600 because the width of the div is 600 (maybe optimized this)
    position = duration*position // transform the position from pixels to seconds
    sound.seek(position) // update where the sound is
  }
  function audioClick(e){
    var position = e.clientY - this.getBoundingClientRect().top;
    var volume = 1-position/100
    sound.volume(volume);
    console.log(volume)
    barVolProgress.style.height = (100-sound.volume()*100) + '%';

  }
  function displayMain(){
    let vol = false;
    
    $("#main").append(`<div id = "generalLecture"><div class="display-4">Lecture :</div>
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



    $("#howler-play").on("click", function(){
       
        $("#howler-play").empty()
        if(!(sound.playing())){
            $("#howler-play").append(`<i class="fas fa-pause"></i>`)
            sound.play();
            }
        else {
            $("#howler-play").append(`<i class="fas fa-play"></i>`)
            sound.pause();
            }
        
    });
$("#howler-vol").on("click",function(){
    $("#displayBarVol").empty()
    if(vol){
        vol = false;
    }
    else{
        vol = true;
        $("#displayBarVol").append(`<div id = "bar-vol"><div id="barVolProgress"></div></div>`)
        barVolProgress.style.height = (100-sound.volume()*100) + '%';
        $("#bar-vol").on("click",audioClick)
    }

});

  $(".audio-progress").on("click",barClick)
    $(function(){
    

        $("#howler-loop").on("click", function(){
            if(sound.loop())
                sound.loop(false)
            else{
                sound.loop(true)
            }
        });
    
    });
    
  }
function formatTime(secs) {
    var minutes = Math.floor(secs / 60) || 0;
    var seconds = (secs - minutes * 60) || 0;
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

function updateTimeTracker  () {
    var self = this;
    var seek = sound.seek() || 0;
    var currentTime = formatTime(Math.round(seek));
    $('#timer').text(currentTime);
    progress.style.width = (((seek / self.duration()) * 100) || 0) + '%';
        
     if (self.playing()) {
        requestAnimationFrame(updateTimeTracker.bind(self));
    }
}

  export default displayLecture;