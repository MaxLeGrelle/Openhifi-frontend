import {displayNavBar,displayMenu} from './Home.js'
import {onNavigate} from './Router.js'
function Favorite(){
    displayMain()
  }
  function displayFavorite() {
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
      $("#favorite").empty();
      $("#favorite").append(`<div id ="blue"><a href="#" data-url ="/favorite"> Favoris <i class="fas fa-heart fa-2x"></i> </a></div>`)
      Favorite()
      
  }
  function displayMain(){
    $("#main").append(`<div id = "general"><div class="display-4">Musiques favorite :</div>
    
    `)
  }
  export default displayFavorite;