import {displayNavBar,displayMenu} from './Home.js'
import {onNavigate} from './Router.js'
import music from '../sounds/m1.mp3'
const howler = require("howler")

//source : https://codepen.io/astephannie/pen/NaBKLG

const sound  = new howler.Howl({src: [`${music}`],
    onplay: function() {
        var time = Math.round(sound.duration());
        $('#duration').html(formatTime(time));
        // Start upating the progress of the track.
        requestAnimationFrame(updateTimeTracker.bind(this));},
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
    var duration = sound.duration() // get the duration of the sound played
    position = position /500 // division by 500 because the width of the div is 500 (maybe optimized this)
    position = duration*position // transform the position from pixels to seconds
    sound.seek(position) // update where the sound is
  }
  function displayMain(){
   
    
    $("#main").append(`<div id = "general"><div class="display-4">Lecture :</div>
    
    <button id='howler-play'>Play</button>
    <button id='howler-pause'>Pause</button>
    <button id='howler-stop'>Stop</button>
    <button id='howler-volup'>Vol+</button>
    <button id='howler-voldown'>Vol-</button>
    <button id='howler-loop'>Loop</button>
    <div class="audio-progress">
	<div id="progress"></div>
	<div class="time">
		<span id="timer">0:00 </span>/
		<span id="duration">0:00</span>
	</div>
</div>
    `)
  $(".audio-progress").on("click",barClick)
    $(function(){

        $("#howler-play").on("click", function(){
            sound.play();
        });
    
        $("#howler-pause").on("click", function(){
            sound.pause();
        });
    
        $("#howler-stop").on("click", function(){
            sound.stop();
        });
    
        $("#howler-volup").on("click", function(){
            var vol = sound.volume();
            vol += 0.1;
            if (vol > 1) {
                vol = 1;
            }
            sound.volume(vol);
        });
    
        $("#howler-voldown").on("click", function(){
            var vol = sound.volume();
            vol -= 0.1;
            if (vol < 0) {
                vol = 0;
            }
            sound.volume(vol);
        });
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