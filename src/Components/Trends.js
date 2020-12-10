import {displayNavBar,displayMenu} from './Home.js'
import {onNavigate} from './Router.js'
function Trends(){
    displayMain()
  }
  function displayTrends() {
      $("#page").empty();
      console.log("affiche profil");
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
      $("#trends").empty();
      $("#trends").append(`<div class ="blue"><a href="#" data-url="/trends"> Tendances <i class="fas fa-star fa-2x"></i> </a></div>`)
      Trends()
      
  }
  function displayMain(){
    $("#main").append(`<div id = "general"><div class="display-4">Musiques populaires :</div>
    
    `)
  }
  export default displayTrends;