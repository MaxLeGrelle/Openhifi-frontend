import {displayNavBar,displayMenu} from './Home.js'
import {onNavigate} from './Router.js'

function LegalMentions(){
    displayMain()
  }
  function displayLegalMentions() {
      $("#container").empty();
      $("#container").append(`<div id="main"></div>`);
      $("#navbar").on("click", onNavigate)
      $("#menu").on("click", onNavigate)
      if($("#navbar").text().length == 0){
        displayNavBar();
        displayMenu();
        displayFooter();
    }
      LegalMentions()
      
  }
  function displayMain(){
    $("#main").append(`<div id = "general"><div class="display-4">Mentions légales:</div>
    
    `)
  }
  export default displayLegalMentions;