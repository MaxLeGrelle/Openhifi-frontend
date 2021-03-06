import logo from "../img/open-hifi-logo-transparent2.png"
import profile from "../img/default_profile.png"
import {library,dom} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {far} from '@fortawesome/free-regular-svg-icons'
import {onNavigate} from './Router.js'
import {getRecentlyDataStorage,getUserStorageData} from '../Utils/storage.js'
import {loadingAnimation, removeLoadingAnimation} from "../Utils/animations.js"
import {displayFooter,adaptFooterPosition} from "./Footer.js";
const jwt = require("jsonwebtoken")

//set up for import fas, far
library.add(fas, far)
dom.watch()

/**
 * Displays the home page
 */
function displayHome() {
  loadingAnimation()
  const userLogged = getUserStorageData()
  $("#container").empty();
  $("#footer").css("display", "");
  $("#container").append(`
      <div id="main">
        <div class="display-4">Bienvenue ${userLogged.pseudo}, quelle agréable journée pour écouter de la musique</div>
        <h2>Écouté recemment :</h2>
        <div id="recently"></div>
        <h2>À Découvrir :</h2>
          
        <div id="discover"></div>
      </div>
    `);
    $("#favorite").empty();
    $('#favorite').append(`<a href="#" data-url ="/favorite"> Favoris <i class="far fa-heart fa-2x"></i> </a>`)
  if($("#navbar").text().length == 0){
    displayNavBar();
    displayMenu();
    displayFooter();
  }
  setRecentlyListenedAlbums()
  getRecentyListenedAlbums()
  getAllAlbums()
  adaptFooterPosition()
}     

/**
 * Displays the navbar
 */
function displayNavBar() {
  $("#navbar").append(` 
    <div id="logo"></div>
    <div id="add"></div>
    <div id="profile"></div>`);
  
  //logo on top left
  $('#logo').append(`
  <a href = "#"><div class="row">
  <div class="col-md"><img src="${logo}" alt="logo" data-url ="/" height="150px" width="150px"/> </div></div></a>`)

  //add button on top  

  $('#add').append(`<a class="btn btn-bluegradient" href="#" data-url="/addAlbum">Ajouter</a> `)


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
  getImageNavbar()

  $("#navbar").on("click", onNavigate)

}

/**
 * Get the user's image from the backend
 */
function getImageNavbar() {
  const userData = getUserStorageData()
  const userPayload = jwt.decode(userData.token)
  fetch("/api/users/image/"+userPayload.id, {
    method : "GET",
    headers : {
      Authorization: userData.token,
    }
  }) //TODO authorize
  .then((response) => {
    if (!response) throw new Error("Code d'erreur : " + reponse.status + " : " + reponse.statusText)
    return response.json()
  })
  .then((data) => {
    if (data.image64) {
      $('#photoProfil').attr("src", data.image64)
    }
  }).catch((err) => onErrorDisplayAlbum(err))
}


/**
 * Displays the vertical menu
 */
function displayMenu() {

  $("#menu").append(`
   <div id="favorite"></div>`);
  
  //favorite button/link on middle left (heart)
  $('#favorite').append(`<a href="#" data-url ="/favorite"> Favoris <i class="far fa-heart fa-2x"></i> </a>`)
  $("#menu").on("click", onNavigate)
}

/**
 * Send the list of recently listened album id from the local storage to the backend to update it
 */
function setRecentlyListenedAlbums() {
  const userData = getUserStorageData()
  const userRecentlyListened = getRecentlyDataStorage()
  const userPayload = jwt.decode(userData.token)
  fetch("/api/users/recently/" + userPayload.id, { //TODO authorize
      method: "PUT",
      body: JSON.stringify({
        recentlyListened: userRecentlyListened
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: userData.token,
      },
    }).then((response) => {
      if (!response.ok) throw new Error("Code d'erreur : " + response.status + " : " + response.statusText);
      return response.json();
    })
    .catch((err) => onErrorDisplayAlbum(err))
}

/**
 * Get the list of recently listened album id from backend
 */
function getRecentyListenedAlbums() {
  const user = getUserStorageData();
  const userPayload = jwt.decode(user.token)
  fetch("/api/users/recently/" + userPayload.id, {
    method : "GET",
    headers : {
      Authorization: user.token,
    }
  }) //TODO authorize
    .then((response) => {
      if (!response.ok) throw new Error("Error code : " + response.status + " : " + response.statusText);
      return response.json();
    }).then((data) => displayRecently(data))
    .catch((err) => onErrorDisplayAlbum(err))
}

/**
 * Displays the carousel of recently listened albums
 * @param {*} data recently listened albums data
 */
function displayRecently(data) {
  //carrousel made with bootstrap 
  $("#recently").append(`
  <!--Carousel Wrapper-->
  <div id="recentlyCarousel" class="carousel slide carousel-multi-item" data-ride="carousel" data-interval="false">
  
    <!--Fleches-->
    <div id="nextRecently">
        <a class="carousel-control-prev" href="#recentlyCarousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
    </div>
    <div id="prevRecently">
      <a class="carousel-control-next" href="#recentlyCarousel" role="button" data-slide="next">
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
  $("#recently .carousel-inner").empty()
  let j;
  data.albumRecentlyListened.forEach(album => {
    if (i % 4 == 0) {
      j = i;
      $("#recently .carousel-inner").append(`<div id="recentlyCarouselItem${i}" class="carousel-item">`);
      $("#recentlyCarouselItem0").addClass("active")
    }
    $(`#recentlyCarouselItem${j}`).append(`
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
            </div>
          </div>
        </div>`)
    i++;
  });
  $("#recently .carousel-inner a").on("click", onNavigate)
}

/**
 * get all albums from the backend
 */
function getAllAlbums() {
  const user = getUserStorageData()
  fetch("/api/albums/", {
    method : "GET",
    headers : {
      Authorization: user.token,
    }
  }) //TODO authorize
    .then((response) => {
      if (!response.ok)
        throw new Error("Error code : " + response.status + " : " + response.statusText);
      return response.json();
    })
    .then((data) => displayDiscover(data))
    .catch((err) => onErrorDisplayAlbum(err));
}

/**
 * Displays the discover's carousel
 * @param {*} data album's data
 */
function displayDiscover(data) {
  $("#discover").append(`
  <!--Carousel Wrapper-->
  <div id="discoverCarousel" class="carousel slide carousel-multi-item" data-ride="carousel" data-interval="false">
  
    <!--Fleches-->
    <div id="nextDiscover">
        <a class="carousel-control-prev" href="#discoverCarousel" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
    </div>
    <div id="prevDiscover">
      <a class="carousel-control-next" href="#discoverCarousel" role="button" data-slide="next">
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

  $("#discover .carousel-inner").empty()

  data.albumList.forEach(album => {
    if (i % 4 == 0) {
      j = i;
      $("#discover .carousel-inner").append(`<div id="discoverCarouselItem${i}" class="carousel-item">`);
      $("#discoverCarouselItem0").addClass("active")
    }

    $(`#discoverCarouselItem${j}`).append(`
        <div class="container-card" style="float:left">
          <div class="card mb-2 ">
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
            </div>
          </div>
        </div>`)
    i++;
  });
  $("#discover .carousel-inner a").on("click", onNavigate)
  removeLoadingAnimation()
}

/**
 * Displays the error and if there's a message, displays it.
 * @param {*} err Error
 */
function onErrorDisplayAlbum(err) {
  $(".alert").remove()
  if (err.message) $("#main").prepend(`<p class="alert alert-danger"> ${err.message} </p>`);
  else $("#main").prepend(`<p class="alert alert-danger">Oups, il y a eu une erreur</p>`);
}

export {
  displayHome,
  displayMenu,
  displayNavBar,
  getImageNavbar
};