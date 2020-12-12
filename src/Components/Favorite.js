import {displayNavBar,displayMenu} from './Home.js'
import {onNavigate} from './Router.js'
import {displayLecture, onPlay, onEnd, displayPlayer, formatTime} from './Player';
import { getUserStorageData, getMusicLikedDataStorage, setMusicLikedDataStorage, addNewMusicLikedStorage } from '../Utils/storage.js'
import { displayFooter} from './Footer.js'
const howl = require("howler")
const jwt = require("jsonwebtoken")

  function displayFavorite() {
      $("#container").empty();
      $("#container").append(`<div id="main"></div>`);
      if($("#navbar").text().length == 0){
        displayNavBar();
        displayMenu();
        displayFooter();
    } 
      $("#favorite").empty();
      $("#favorite").append(`<div id ="blue"><a href="#" data-url ="/favorite"> Favoris <i class="fas fa-heart fa-2x"></i> </a></div>`)
      getMusiquesData()

      
  }
  let musics
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
    console.log(data)
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
    //TODO
    data.forEach(musicInfo => {
        //hide the id of the music in order to know which music has been clicked
        //All musics will have a unique html id in order to change dynamicaly its style when it's played
        if(getMusicLikedDataStorage().includes(musicInfo.id.toString())){
            $("#albumMusicList tbody").append(`
            <tr class="scope" data-id="${i}">
                <td id="music${data.id+"-"+i}" href="#" data-url="/albums" data-id="${musicInfo.idAlbum}"><span>${musicInfo.title}</span></td>
                <td>${musicInfo.idCreator}</td>
                <td>${musicInfo.album}</td>
                <td>${formatTime(Math.round(musicInfo.duration))}</td>
                <td class = "Like" data-realid = "${musicInfo.id}"><div class ="liked"><i id = "heart-${musicInfo.id}" class="fas fa-heart fa-2x"></i></div></td>
            </tr>`)
        }

        $(`#music${data.id+"-"+i}`).on("click", onNavigate)
        $(`#music${data.id+"-"+i}`).on("mouseover", (e) => {
            $(e.target).addClass("musicPlayingHover")
        })
        $(`#music${data.id+"-"+i}`).on("mouseleave", (e) => {
            $(e.target).removeClass("musicPlayingHover")
        })
        i++
    });
    $(".Like").on("click", onLike)
  }
function getMusiquesData(){
  const user = getUserStorageData();
  const infoUser = jwt.decode(user.token)
  fetch(`/api/musics/${infoUser.id}`)
  .then((response) => {
    if (!response.ok)
      throw new Error("Code d'erreur : " + reponse.status + " : " + reponse.statusText);
    return response.json()
  })
  .then((data) => displayMusicsData(data))
  .catch((err) =>  onErrorFavorite(err))
}
function onLike(e) { 
  console.log("Target :",e.target.parentElement.classList.value)
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
  console.log("add")
  console.log(e.target.parentElement)
  addNewMusicLikedStorage(musicLikedId)
}

}

function onErrorFavorite(err){
  $("alert").empty()
  if(err.message) $("#alert").append(`<pclass="alert alert-danger">${err.message}</p>`)
  else $("#alert").append(`<p class="alert alert-danger">Il y a eu une erreur lors du chargement des données ! </p>`)
}
  export default displayFavorite;