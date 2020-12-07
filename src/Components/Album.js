import { layer } from '@fortawesome/fontawesome-svg-core';
import { faCcPaypal } from '@fortawesome/free-brands-svg-icons';
import {displayNavBar,displayMenu} from './Home.js'
import { onNavigate } from './Router.js';
const howl = require("howler")

//PEUT PAS RECUP LOGO ???
function displayAlbum() {
    $("#page").empty()
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
    displayNavBar()
    displayMenu()
    getAlbumData()

}

function getAlbumData() {
    let parameter = findGetParameter("no")
    fetch("/api"+window.location.pathname+"/"+parameter)
    .then((response)=> {
        if (!response.ok) throw new Error("Code d'erreur : " + response.status + " : " + response.statusText);
        return response.json();
    })
    .then((data) => displayAlbumData(data))
    .catch((err) => console.log(err.message))
}

//source : https://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

let musics = new Array()
function displayAlbumData(data){
    console.log(data)
    $("#main").append(`
    <div class="container" id="albumDisplay">
        <p class="display-1">${data.name}</p>
        <p >De : ${data.creator}</p>
        <hr>
        <table id="albumMusicList" class="table">
            <thead>
                <tr>
                    <th>Titre</th>
                    <th>Artiste</th>
                    <th>Album</th>
                    <th>Durée</th>
                </tr>
            </thead>
        <tbody></tbody>
        </table>
    </div>`)
    for (let i = 0; i < data.listMusics64.length; i++) {
        musics.push(new howl.Howl({
            src: [data.listMusics64[i]], 
            onplay : onPlay,
            preload : true,
        }))
    }
    let i = 0; 
    data.listMusicsInfo.forEach(musicInfo => {
        $("#albumMusicList tbody").append(`
        <tr class="scope" data-id="${i}">
            <td id="music${i}">${musicInfo.title}</td>
            <td>${data.creator}</td>
            <td>${data.name}</td>
            <td>NA</td>
        </tr>`)
        $(`#music${i}`).on("click", onListening)
        $(`#music${i}`).on("mouseover", (e) => {
            $(e.target).addClass("musicPlayingHover")
        })
        $(`#music${i}`).on("mouseleave", (e) => {
            $(e.target).removeClass("musicPlayingHover")
        })
        i++
    });
}

function onListening(e) {
    e.preventDefault()
    let id = e.target.parentElement.dataset.id
    if (!musics[id].playing()) {
        musics[id].play();
        $(e.target).addClass("musicPlayingHover musicPlaying")
    }else {
        musics[id].pause()
        $(e.target).removeClass("musicPlayingHover musicPlaying")
    }
}

function onPlay(id) {
    for (let i = 0; i < musics.length; i++) {
        $(`#music${i}`).removeClass("musicPlayingHover musicPlaying")
        musics[i].stop()
    }
}

export default displayAlbum;