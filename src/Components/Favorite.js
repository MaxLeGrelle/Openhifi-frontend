import {displayNavBar,displayMenu} from './Home.js'
import {onNavigate} from './Router.js'
function Favorite(){
    displayMain()
  }
  function displayFavorite() {

      $("#container").empty();
      console.log("affiche profil");
      $("#container").append(` 
        <div id="navbar"></div>
        <div id="menu">
          <div id="favorite"></div>
          <div id="trends"></div>
        </div>
        <div id="main">
        </div>`);
      displayMenu()
      displayNavBar()
      $("#navbar").on("click", onNavigate)
      $("#menu").on("click", onNavigate)
      
      $("#favorite").empty();
      $("#favorite").append(`<div id ="blue"><a href="#" data-url ="/favorite"> Favoris <i class="fas fa-heart fa-2x"></i> </a></div>`)
      Favorite()
      
  }
  function displayMain(){
    $("#main").append(`<div id = "general"><div class="display-4">Musiques favorite :</div>
    
    `)
  }
  export default displayFavorite;