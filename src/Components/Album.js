import { layer } from '@fortawesome/fontawesome-svg-core';
import { faCcPaypal } from '@fortawesome/free-brands-svg-icons';

import { displayNavBar, displayMenu } from './Home.js'
import { onNavigate, redirectUrl } from './Router.js';
import { getUserStorageData, getMusicLikedDataStorage, setMusicLikedDataStorage, addNewMusicLikedStorage } from '../Utils/storage.js'
const jwt = require("jsonwebtoken")
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
    fetch("/api" + window.location.pathname + "/" + parameter)
        .then((response) => {
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
            onplay: onPlay,
            onend: onEnd,       
            preload: true,
        }))
    }
    let i = 0;
    data.listMusicsInfo.forEach(musicInfo => {
        if(getMusicLikedDataStorage().includes(musicInfo.id.toString())){
            $("#albumMusicList tbody").append(`
            <tr class="scope" data-id="${i}">
                <td id="music${i}">${musicInfo.title}</td>
                <td>${data.creator}</td>
                <td>${data.name}</td>
                <td>NA</td>
                <td class = "Like" data-realid = "${musicInfo.id}"><i id = "heart-${musicInfo.id}" class="fas fa-heart fa-2x"></i></td>
            </tr>`)
        }
        else{
            $("#albumMusicList tbody").append(`
            <tr class="scope" data-id="${i}">
                <td id="music${i}">${musicInfo.title}</td>
                <td>${data.creator}</td>
                <td>${data.name}</td>
                <td>NA</td>
                <td class = "Like" data-realid = "${musicInfo.id}"><i id = "heart-${musicInfo.id}" class="far fa-heart fa-2x"></i></td>
            </tr>`)
        }

        $(`#music${i}`).on("click", onSelectMusic)
        $(`#music${i}`).on("mouseover", (e) => {

            $(e.target).addClass("musicPlayingHover")
        })
        $(`#music${data.id+"-"+i}`).on("mouseleave", (e) => {
            $(e.target).removeClass("musicPlayingHover")
        })
        i++
    });
    $(".Like").on("click", onLike)
}
function onLike(e) {
    console.log("Class List :",e.target.classList)
    if (e.target.tagName === "svg" || e.target.tagName === "path") {
        let musicLikedId ;
        if(e.target.tagName === "svg"){
            musicLikedId = e.target.parentElement.dataset.realid
            $(`#heart-${musicLikedId}`).removeClass("far")
            $(`#heart-${musicLikedId}`).addClass("fas")

        }
        else {
            musicLikedId = e.target.parentElement.parentElement.dataset.realid
            $(`#heart-${musicLikedId}`).removeClass("fas")
            $(`#heart-${musicLikedId}`).addClass("far")
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
            .catch((err) => redirectUrl("/error", err.message))
        console.log("add")
        console.log(e.target.parentElement)
        addNewMusicLikedStorage(musicLikedId)


/**
 * Fires when we click on a music, it will get the hided id and all the data fetched
 * @param {*} e event
 * @param {*} data data fetched
 */
function onSelectMusic(e, data) {
    let indexMusicSelected = e.target.parentElement.dataset.id
    displayLecture(musics, indexMusicSelected, data)
}

export { displayAlbum };

