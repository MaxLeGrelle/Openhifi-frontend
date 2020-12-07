
import logo from "../img/open-hifi-logo-transparent2.png"
import profile from "../img/default_profile.png"
import r1 from "../img/rooster.jpg"
import r2 from "../img/camel.jpg"
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {onNavigate} from './Router.js'
import{getUserStorageData} from '../Utils/storage.js'
const jwt = require("jsonwebtoken")


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
    $('#logo').append(`<a href = "#"><div class="row">
    <div class="col-md"><img src="${logo}" alt="logo" data-url ="/" height="150px" width="150px"/> </div></div></a>`)

    //seach bar on top
    $("#search").append(`
    <div class="input-group md-form form-sm form-2 pl-0">
    <input size ="100" class="form-control my-0 py-1 red-border" type="text" placeholder="Rechercher" aria-label="Search">
    <div class="input-group-append">
      <span class="input-group-text red lighten-3" id="basic-text1"><i class="fas fa-search "aria-hidden="true"></i></span>
    </div>
    </div>`)
    //add button on top  
    $('#add').append(`<button class="btn btn-bluegradient">Ajouter</button> `)
    $('#add').append(`<a href="#" data-url ="/lecture">Musique</a> `)

    //profil picture on top right
    $('#profile').append(`
    <div class="dropdown" >
    <a  href="#" role="button" id="dropdownMenuLink"   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <div class="row" ><div class="col-md"><img src="${profile}"  alt="logo" id="photoProfil" height="60px" width="60px"/></div></div>
    </a>
  
    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
      <a class="dropdown-item" href= "#" data-url ="/profil">Profil</a>
      <a class="dropdown-item" href="#" data-url ="/logout">Se déconnecter</a>
    </div>
  </div>
      `)
     
}

//HTML for the vertical menu
function displayMenu() {

    //trends button/link on middle left (star)
    $('#trends').append(`<a href="#" data-url="/trends"> Tendances <i class="far fa-star fa-2x"></i> </a>`)

    //favorite button/link on middle left (heart)
    $('#favorite').append(`<a href="#" data-url ="/favorite"> Favoris <i class="far fa-heart fa-2x"></i> </a>`)
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
    </div>
    `)
    
}

function displayAccueil() {
    const userLogged = getUserStorageData()
    const infoUser  = jwt.decode(userLogged.token)
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
        <div class="display-4">Bienvenue ${infoUser.pseudo}, quelle agréable journée pour écouter votre playlist country</div>
        <h2>Écouté recemment :</h2>
        <div id="recently"></div>
        <h2>À Découvrir :</h2>
        
        <div id="discover"></div>
        </div>
        `);

    $("#navbar").on("click", onNavigate)
    $("#menu").on("click", onNavigate)
    Accueil();
    
}

export {displayNavBar, displayMenu, displayAccueil} ;