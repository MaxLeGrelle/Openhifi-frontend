import { layer } from '@fortawesome/fontawesome-svg-core';
import { faCcPaypal } from '@fortawesome/free-brands-svg-icons';
import {displayNavBar,displayMenu} from './Home.js'
import { onNavigate } from './Router.js';
import {displayLecture, onPlay, onEnd, displayPlayer, formatTime} from './Player'; 
const howl = require("howler")

/**
 * Append the divs to display the data of the album
 */
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
    displayPlayer();
}

/**
 * Gets the data of the album with its id found in the url
 */
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

/**
 * Return the value associated with the key parameterName in the url
 * @param {*} parameterName the key
 * //source : https://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
 */
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

let musics //It will contains all the musics of the album ordered as it is displayed

/**
 * Appends the divs to display the data of the album fetched
 * @param {*} data all the data related to the album
 */
function displayAlbumData(data){
    $("#main").empty()
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
    musics = new Array() //empty the array to avoid duplicated songs
    for (let i = 0; i < data.listMusics64.length; i++) {
        musics.push(new howl.Howl({
            src: [data.listMusics64[i]], 
            onplay : onPlay,
            onend: onEnd,
            preload : true,
        }))
    }
    let i = 0;
    //TODO
    data.listMusicsInfo.forEach(musicInfo => {
        //hide the id of the music in order to know which music has been clicked
        //All musics will have a unique html id in order to change dynamicaly its style when it's played
        $("#albumMusicList tbody").append(`
        <tr class="scope" data-id="${i}">
            <td id="music${data.id+"-"+i}">${musicInfo.title}</td>
            <td>${data.creator}</td>
            <td>${data.name}</td>
            <td>${formatTime(Math.round(musicInfo.duration))}</td>
        </tr>`)
        $(`#music${data.id+"-"+i}`).on("click", function(e) {
            onSelectMusic(e, data)
        })
        $(`#music${data.id+"-"+i}`).on("mouseover", (e) => {
            $(e.target).addClass("musicPlayingHover")
        })
        $(`#music${data.id+"-"+i}`).on("mouseleave", (e) => {
            $(e.target).removeClass("musicPlayingHover")
        })
        i++
    });
}

/**
 * Fires when we click on a music, it will get the hided id and all the data fetched
 * @param {*} e event
 * @param {*} data data fetched
 */
function onSelectMusic(e, data) {
    let indexMusicSelected = e.target.parentElement.dataset.id
    displayLecture(musics, indexMusicSelected, data)
}

export {displayAlbum};