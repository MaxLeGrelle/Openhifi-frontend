import {displayNavBar,displayMenu} from './Home.js'
import {onNavigate} from './Router.js'
import {onPlay, onEnd, formatTime} from './Player';
import { getUserStorageData, getMusicLikedDataStorage, addNewMusicLikedStorage } from '../Utils/storage.js'
import { displayFooter } from './Footer.js';
const howl = require("howler")
const jwt = require("jsonwebtoken")

/**
 * Displays the favorite's page.
 */
function displayFavorite() {
  $("#loading-wrapper").css("display", "none") //prevent to show loading-wrapper when refreshing
    $("#container").empty();
    $("#container").append(`<div id="main"></div>`);
    if($("#navbar").text().length == 0){
      displayNavBar();
      displayMenu();
      displayFooter();
  } 
    $("#favorite").empty();
    $("#trends").empty();
    $("#favorite").append(`<div id ="blue"><a href="#" data-url ="/favorite"> Favoris <i class="fas fa-heart fa-2x"></i> </a></div>`)
    $('#trends').append(`<a href="#" data-url="/trends"> Tendances <i class="far fa-star fa-2x"></i> </a>`)
    getMusiquesData()
}

/**
 * Get all the musics liked by the user
 */
function getMusiquesData(){
  const user = getUserStorageData();
  const infoUser = jwt.decode(user.token)
  fetch(`/api/musics/${infoUser.id}`) //TODO authorize
  .then((response) => {
    if (!response.ok)
      throw new Error("Code d'erreur : " + reponse.status + " : " + reponse.statusText);
    return response.json()
  })
  .then((data) => displayMusicsData(data))
  .catch((err) =>  onErrorFavorite(err))
}

let musics //will contains all the musics of the album ordered as it's displayed

/**
 * Displays the list of music liked by the user with their datas
 * @param {*} data datas of the musics liked
 */
function displayMusicsData(data){
  $("#main").empty()
  $("#main").append(`
  <div class="container" id="albumDisplay">
      <p id = "alert"></p>
      <p class="display-1">Favoris</p>

      <hr>
      <table id="albumMusicList" class="table">
          <thead>
              <tr>
                  <th>Titre</th>
                  <th>Artiste</th>
                  <th>Album</th>
                  <th>Durée</th>
                  <th></th>
              </tr>
          </thead>
      <tbody></tbody>
      </table>
  </div>`)
  musics = new Array() //empty the array to avoid duplicated songs
  for (let i = 0; i < data.length; i++) {
      musics.push(new howl.Howl({
          src: [data[i]], 
          onplay : onPlay,
          onend: onEnd,
          preload : true,
      }))
  }
  let i = 0;
  data.forEach(musicInfo => {
      //hide the id of the music in order to know which music has been clicked
      //All musics will have a unique html id in order to change dynamicaly its style when it's played
      if(getMusicLikedDataStorage().includes(musicInfo.id.toString())){
          $("#albumMusicList tbody").append(`
          <tr class="scope" data-id="${i}">
                <td id="music${musicInfo.music.id+"-"+i}" href="#" data-url="/albums" data-id="${musicInfo.music.idAlbum}"><span id="span${musicInfo.music.id+"-"+i}">${musicInfo.music.title}</span></td>
                <td>${musicInfo.creator}</td>
                <td>${musicInfo.music.album}</td>
                <td>${formatTime(Math.round(musicInfo.music.duration))}</td>
                <td class = "Like" data-realid = "${musicInfo.music.id}"><div class ="liked"><i id = "heart-${musicInfo.music.id}" class="fas fa-heart fa-2x"></i></div></td>
            </tr>`)
        }

        $(`#music${musicInfo.music.id+"-"+i}`).on("click", onNavigate)
        $(`#span${musicInfo.music.id+"-"+i}`).on("mouseover", (e) => {
            $(e.target).addClass("musicPlayingHover")
        })
        $(`#span${musicInfo.music.id+"-"+i}`).on("mouseleave", (e) => {
            $(e.target).removeClass("musicPlayingHover")
        })
      i++
  });
  $(".Like").on("click", onLike)
}

/**
 * function that displays the heart when it's clicked and send a request to the server to like or dislike the music
 * @param {*} e event
 */
function onLike(e) { 
if (e.target.parentElement.classList.value === "disliked" || e.target.parentElement.parentElement.classList.value === "liked") { // svg = dislike, path = like
  let musicLikedId ;
  if(e.target.parentElement.classList.value === "disliked"){ //dislike become like
      musicLikedId = e.target.parentElement.parentElement.dataset.realid
      $(`#heart-${musicLikedId}`).removeClass("far")
      $(`#heart-${musicLikedId}`).addClass("fas")
      $(`#heart-${musicLikedId}`).parent().removeClass("disliked")
      $(`#heart-${musicLikedId}`).parent().addClass("liked")

  }
  else { //like become dislike
      musicLikedId = e.target.parentElement.parentElement.parentElement.dataset.realid
      $(`#heart-${musicLikedId}`).removeClass("fas")
      $(`#heart-${musicLikedId}`).addClass("far")
      $(`#heart-${musicLikedId}`).parent().removeClass("liked")
      $(`#heart-${musicLikedId}`).parent().addClass("disliked")
  }
  const userLogged = getUserStorageData()
  const infoUser = jwt.decode(userLogged.token)
  fetch(`/api/musics/fav/${infoUser.id}/${musicLikedId}`, {
      method: "PUT"
  })
      .then((response) => {
          if (!response.ok)
              throw new Error("Code d'erreur : " + reponse.status + " : " + reponse.statusText);
          return response.json()
      })
      .catch((err) => onErrorFavorite(err))
  addNewMusicLikedStorage(musicLikedId)
}

}

/**
 * Displays an error in the page when liking/disliking a music
 * @param {*} err Error, if it contains a message, it will be shown.
 */
function onErrorFavorite(err){
  $(".alert").remove()
  if(err.message) $("#main").prepend(`<p class="alert alert-danger">${err.message}</p>`)
  else $("#main").prepend(`<p class="alert alert-danger">Erreur lors du like/dislike</p>`)
}
  export {displayFavorite, onLike};