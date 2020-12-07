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
    getAllAlbums()
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
    <a class = "btn btn-primary" id="loginBtn" href= "#" data-url ="/logout">Logout</a>`)

    //profil picture on top right
    $('#profile').append(`<div class="row">
    <div class="col-md"><img src="${profile}" alt="logo" height="60px" width="60px"/></div></div>`)
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
      <div id="carouselRecently" class="carousel slide" data-interval="false">
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
      <div id="nextRecently">
        <a class="carousel-control-prev" href="#carouselRecently" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
      </div>
      <div id="prevRecently">
        <a class="carousel-control-next" href="#carouselRecently" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>
    </div>
    </div>`)
}

function getAllAlbums() {
  fetch("/api/albums/")
    .then((response) => {
        if (!response.ok)
          throw new Error("Error code : " + response.status + " : " + response.statusText);
        return response.json();
      })
      .then((data) => displayDiscover(data))
      // .catch((err) => onErrorAddingAlbum(err));
}

function displayDiscover(data) {
  $("#discover").append(`
  <!--Carousel Wrapper-->
  <div id="multi-item-example" class="carousel slide carousel-multi-item" data-ride="carousel" data-interval="false">
  
    <!--Fleches-->
    <div id="nextDiscover">
        <a class="carousel-control-prev" href="#multi-item-example" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
    </div>
    <div id="prevDiscover">
      <a class="carousel-control-next" href="#multi-item-example" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
      </a>
    </div>
    <!--/Fleches-->
  
    <!--Slides-->
    <div class="carousel-inner" role="listbox">
    </div>
    <!--/.Slides-->
  
  </div>
  <!--/.Carousel Wrapper-->`)
  let i = 0;
  let j;
  console.log(data)
  data.albumList.forEach(album => {
    if (i%4==0) {
      j = i;
      $("#discover .carousel-inner").append(`<div id="discoverCarouselItem${i}" class="carousel-item">`);
      $("#discoverCarouselItem0").addClass("active")
    }

    $(`#discoverCarouselItem${j}`).append(`
        <div class="container-card" style="float:left">
          <div class="card mb-2">
            <a href="#" data-url="/albums" data-id="${album.id}">
              <img class="card-img-top" src="${data.image64List[i]}" alt="album cover">
            </a>
            <div class="card-body">
              <a href="#" data-url="/albums" data-id="${album.id}">
                <h4 class="card-title">${album.name}</h4>
              </a>
              <a href="#" data-url="/albums" data-id="${album.id}">
                <p class="card-text">de : ${data.creatorList[i]}</p>
              </a>
              <a class="btn btn-primary">Like</a>
            </div>
          </div>
        </div>`
   )
   i++;
  });
  $("#discover .carousel-inner a").on("click", onNavigate)
  
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

export {displayAccueil, displayMenu, displayNavBar, displayMain};