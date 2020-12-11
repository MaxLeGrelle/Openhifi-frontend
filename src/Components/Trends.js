import {displayNavBar,displayMenu} from './Home.js'
import {onNavigate} from './Router.js'
function Trends(){
    displayMain()
  }
  function displayTrends() {
      $("#container").empty();
      console.log("affiche profil");
      $("#container").append(`<div id="main"></div>`);
      $("#navbar").on("click", onNavigate)
      $("#menu").on("click", onNavigate)
      if($("#navbar").text().length == 0){
        displayNavBar();
        displayMenu();
        displayFooter();
    }
      $("#trends").append(`<div id ="blue"><a href="#" data-url="/trends"> Tendances <i class="fas fa-star fa-2x"></i> </a></div>`)
      Trends()
      
  }
  function displayMain(){
    $("#main").append(`<div id = "trends"><div class="display-4">Musiques populaires :</div>
    
    `)
  }
  export default displayTrends;