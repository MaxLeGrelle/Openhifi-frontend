import "./stylesheets/style.css";
import "bootstrap"
import logo from "./img/js-logo.png";
import musicPath from "./sound/Infecticide-11-Pizza-Spinoza.mp3";
import {AnalogClock} from "customizable-analog-clock";


function displayIndex() {
    const lecteur = `<audio id="audioPlayer" controls autoplay>
    <source
      src="${musicPath}"
      type="audio/mpeg"
    />
    Your browser does not support the audio element.
    </audio>`;
    const jsImage = `<img src="${logo}" height="50" alt="" />`;

    $(".lecteur").append(lecteur);
    $(".jsImage").append(jsImage);
}

const stopStartSound = () => {
    const myAudioPlayer = document.querySelector("#audioPlayer");
    
    if( myAudioPlayer.paused)
        myAudioPlayer.play();
    else
        myAudioPlayer.pause();
}

displayIndex();

const header = document.querySelector("header");

header.addEventListener("click",stopStartSound);

$("#myClock").attr("style", "width : 200px; height : 200px");

const clock = new AnalogClock({
    htmlElement : "myClock",
    showIndicators : true,
})