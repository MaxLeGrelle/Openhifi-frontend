import {displayNavBar,displayMenu} from './Home.js'
import {onNavigate} from './Router.js'

function LegalMentions(){
    displayMain()
  }
  function displayLegalMentions() {
      $("#container").empty();
      $("#container").append(` 
        <div id="navbar"></div>
        <div id="menu">
          <div id="favorite"></div>
          <div id="trends"></div>
        </div>
        <div id="main"></div>`);
      $("#navbar").on("click", onNavigate)
      $("#menu").on("click", onNavigate)
      displayMenu()
      displayNavBar()
      LegalMentions()
      
  }
  function displayMain(){
    $("#main").append(`<div id = "general"><div class="display-4">Mentions légales:</div>
    
    `)
  }
  export default displayLegalMentions;