import { onNavigate } from "./Router";
const footer = document.getElementById("footer");

//display the footer
function displayFooter() {
    $("#footer").append(`
    <div class = "footerBloc" id="credits">
        This wonderful website is brought to you by Jehan de Foy, Thomas Dorrekens, Max le Grelle and Thomas Lempereur!  <br><br>
        Don't hesitate to have a look around and discover all the possibilities of Open Hifi :)
    </div>
    <div class = "footerBloc" id="legalMentionsFooter">
        Legal : <br>
        <a  href="#" data-url="/legalMentions">Mentions légales</a><br>
    </div>
    <div  class = "footerBloc"id="contact">
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