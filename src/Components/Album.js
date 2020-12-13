import {displayNavBar,displayMenu} from './Home.js' 
import {displayFooter,adaptFooterPosition} from "./Footer.js";
import {displayLecture, onPlay, onEnd, displayPlayer, formatTime} from './Player';
import { getMusicLikedDataStorage, addAlbumToRecentlyDataStorage, getUserStorageData } from '../Utils/storage.js'
import { loadingAnimation, removeLoadingAnimation } from '../Utils/animations.js';
import {onLike} from './Favorite.js'
const howl = require("howler")

/**
 * Append the divs to display the data of the album
 */
function displayAlbum() {
    loadingAnimation()
    $("#container").append(`<div id="main"></div>`);
    displayPlayer()
    if($("#navbar").text().length == 0 ){
        displayNavBar();
        displayMenu();
        displayFooter();
    }
    getAlbumData()
    adaptFooterPosition();
}

/**
 * Gets the data of the album with its id found in the url
 */
function getAlbumData() {
    const user = getUserStorageData()
    let parameter = findGetParameter("no")
    fetch("/api"+window.location.pathname+"/"+parameter, {
        method : "GET",
        headers : {
            Authorization: user.token,
        },
    }) //TODO authorize
    .then((response)=> {
        if (!response.ok) throw new Error("Code d'erreur : " + response.status + " : " + response.statusText);
        return response.json();
    })
    .then((data) => displayAlbumData(data))
    .catch((err) => onErrorGettingAlbums(err))
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
 * Appends the divs to display the data of the album fetched.
 * Create a list of Howler in order to send them to the player.
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
                    <th></th>
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
    data.listMusicsInfo.forEach(musicInfo => {
        //hide the id of the music in order to know which music has been clicked
        //All musics will have a unique html id in order to change dynamicaly its style when it's played
        if(getMusicLikedDataStorage().includes(musicInfo.id.toString())){ // if the sound is liked display the filled heart if not display the empty heart
            $("#albumMusicList tbody").append(`
            <tr class="scope" data-id="${i}">
                <td id="music${data.id+"-"+i}">${musicInfo.title}</td>
                <td>${data.creator}</td>
                <td>${data.name}</td>
                <td>${formatTime(Math.round(musicInfo.duration))}</td>
                <td class = "Like" data-realid = "${musicInfo.id}"><div class ="liked"><i id = "heart-${musicInfo.id}" class="fas fa-heart fa-2x"></i></div></td>
            </tr>`)
        }
        else{
            $("#albumMusicList tbody").append(`
            <tr class="scope" data-id="${i}">
                <td id="music${data.id+"-"+i}">${musicInfo.title}</td>
                <td>${data.creator}</td>
                <td>${data.name}</td>
                <td>${formatTime(Math.round(musicInfo.duration))}</td>
                <td class = "Like" data-realid = "${musicInfo.id}"><div class ="disliked"><i id = "heart-${musicInfo.id}" class="far fa-heart fa-2x"></i></div></td>
            </tr>`)
        }
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
    $(".Like").on("click", onLike)
    removeLoadingAnimation()
}

/**
 * Displays an error in the page when getting albums datas
 * @param {} err Error, if it contains a message, it will be shown.
 */
function onErrorGettingAlbums(err) {
    if (err.message) $("#main").append(`<p class="alert alert-danger">${err.message}</p>)`)
    else $("#main").append(`<p class="alert alert-danger">Il y a eu un probléme lors de la récupération des albums</p>)`)
}

/**
 * Fires when we click on a music, it will get the hided id and all the data fetched
 * @param {*} e event
 * @param {*} data data fetched
 */
function onSelectMusic(e, data) {
    addAlbumToRecentlyDataStorage(data.id)
    let indexMusicSelected = e.target.parentElement.dataset.id
    displayLecture(musics, indexMusicSelected, data)
}

export {displayAlbum};