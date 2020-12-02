import {displayNavBar} from './Accueil.js'
import {displayMenu} from './Accueil.js'

function displayProfil() {
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
        <div class="display-4">general</div>
        </div>`);

    $("#navbar").on("click", onNavigate)
    displayMenu()
    displayNavBar()
    
}

export default displayProfil;