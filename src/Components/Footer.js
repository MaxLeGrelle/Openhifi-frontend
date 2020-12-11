import { onNavigate } from "./Router";

const footer = document.getElementById("footer");

/**
 * getting and displaying date & time
 */
//source : https://stackoverflow.com/questions/27526857/how-to-get-date-to-auto-refresh
function clockTick() {
    var currentTime = new Date(),
        month = currentTime.getMonth() + 1,
        day = currentTime.getDate(),
        year = currentTime.getFullYear(),
        hours = currentTime.getHours(),
        minutes = currentTime.getMinutes(),
        seconds = currentTime.getSeconds(),
        text = (day + "/" + month + "/" + year + ' ' + hours + ':' + minutes + ':' + seconds);
    // here we get the element with the id of "date" and change the content to the text variable we made above
    document.getElementById('footerDate').innerHTML = text;
  }
  // here we run the clockTick function every 1000ms (1 second)
  setInterval(clockTick, 1000);


function displayFooter() {
    $("#footer").empty();
    $("#footer").append(`
    <div id="credits">
        This wonderful website is brought to you by Jehan de Foy, Thomas Dorrekens, Max le Grelle and Thomas Lempereur!  <br><br>
        Don't hesitate to have a look around and discover all the possibilities of Open Hifi :)
    </div>
    <div id="dateTime">
        Aujourdhui, <span id="footerDate"></span> , quel beau jour pour écouter de la musique libre de droit!
    </div>
    <div id="legalMentionsFooter">
        Legal : <br>
        <a  href="#" data-url="/legalMentions">Mentions légales</a><br>
    </div>
    <div id="contact">
        Contact us: <br>
        <a href="mailto:jehan.defoy@student.vinci.be">Jehan de Foy</a><br>
        <a href="mailto:thomas.dorrekens@student.vinci.be">Thomas Dorrekens</a><br>
        <a href="mailto:max.legrelle@student.vinci.be">Max le Grelle</a><br>
        <a href="mailto:thomas.lempereur@student.vinci.be">Thomas Lempereur</a><br>
    </div>
    `);
    $("#legalMentionsFooter").on("click",onNavigate);
}

//Adapts the position of the footer when the player is there
function adaptFooterPosition() {
    if( !$('#player').is(':empty')){
        footer.style.marginBottom = "100px";
    }
}

export {displayFooter,adaptFooterPosition};