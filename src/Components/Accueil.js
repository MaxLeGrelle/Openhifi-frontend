import "bootstrap"
import logo from "../img/open-hifi-logo-transparent2.png"
import profile from "../img/default_profile.png"
import r1 from "../img/rooster.jpg"
import r2 from "../img/camel.jpg"
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {onNavigate} from './Router.js'

//set up for import fas, far
library.add(fas, far)
dom.watch()

function Accueil() {
    displayNavBar()
    displayMenu()
    displayMain()
}

//HTML for the navbar
function displayNavBar() {

    //logo on top left
    $('#logo').append(`<div class="row">
    <div class="col-md"><img src="${logo}" alt="logo" height="150px" width="150px"/> </div></div>`)

    //seach bar on top
    $("#search").append(`
    <div class="input-group md-form form-sm form-2 pl-0">
    <input size ="100" class="form-control my-0 py-1 red-border" type="text" placeholder="Rechercher" aria-label="Search">
    <div class="input-group-append">
      <span class="input-group-text red lighten-3" id="basic-text1"><i class="fas fa-search "aria-hidden="true"></i></span>
    </div>
    </div>`)
    //add button on top  
    $('#add').append(`<button class="btn btn-bluegradient">Ajouter</button> 
    <a class = "btn btn-primary" id="loginBtn" href= "#" data-url ="/login">Login</a>`)

    //profil picture on top right
    $('#profile').append(`<div class="row">
    <a href= "#" data-url ="/profil"><div class="col-md"><img src="${profile}" alt="logo" height="60px" width="60px"/></div></div></a>`)
}

//HTML for the vertical menu
function displayMenu() {

    //trends button/link on middle left (star)
    $('#trends').append(`<a href="url"> Tendances <i class="far fa-star fa-2x"></i> </a>`)

    //favorite button/link on middle left (heart)
    $('#favorite').append(`<a href="url"> Favoris <i class="far fa-heart fa-2x"></i> </a>`)
}


//HTML for the main page
function displayMain() {
    //carrousel made with bootstrap 
    $('#recently').append(`
      <div class="row">
      <div class="col-md">
      <div id="carouselExampleControls" class="carousel slide" data-interval="false">
      <div class="carousel-inner">
        <div class="carousel-item active">
        <img src="${r1}" alt="logo" height="200px" width="200px"/>
        <img src="${r2}" alt="logo" height="200px" width="200px"/>
        <img src="${r1}" alt="logo" height="200px" width="200px"/>
        <img src="${r2}" alt="logo" height="200px" width="200px"/>
        </div>
        <div class="carousel-item">
        <img src="${r1}" alt="logo" height="200px" width="200px"/>
        <img src="${r1}" alt="logo" height="200px" width="200px"/>
        <img src="${r1}" alt="logo" height="200px" width="200px"/>
        <img src="${r1}" alt="logo" height="200px" width="200px"/>
        </div>
      </div>
      <div id="next">
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
      </div>
      <div id="prev">
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    </div>
    </div>`)
}

function displayAccueil() {
    $("#page").empty();
    console.log("affiche accueil");
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
        <div class="display-4">Bienvenue Pepito, quelle agréable journée pour écouter votre playlist country</div>
        <h2>Écouté recemment :</h2>
        <div id="recently"></div>
        <h2>À Découvrir :</h2>
        <div id="discover"></div>`);

    $("#navbar").on("click", onNavigate)
    Accueil();
    
}

export {displayNavBar, displayMenu, displayAccueil} ;