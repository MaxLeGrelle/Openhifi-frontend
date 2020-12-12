import { displayFooter } from './Footer.js';
import {displayNavBar,displayMenu} from './Home.js'
import {onNavigate} from './Router.js'
function Trends(){
    displayMain()
  }
  function displayTrends() {
    $("#loading-wrapper").css("display", "none")
    $("#container").empty();
    $("#container").append(`<div id="main"></div>`);
    if($("#navbar").text().length == 0){
      displayNavBar();
      displayMenu();
      displayFooter();
    }
    $("#trends").empty()
    $("#favorite").empty();
      $("#trends").append(`<div id ="blue"><a href="#" data-url="/trends"> Tendances <i class="fas fa-star fa-2x"></i> </a></div>`)
      $('#favorite').append(`<a href="#" data-url ="/favorite"> Favoris <i class="far fa-heart fa-2x"></i> </a>`)
      Trends()
      
  }
  function displayMain(){
    $("#main").append(`<div id = "trendancePage"><div class="display-4">Musiques populaires :</div>
    
    `)
  }
  export default displayTrends;