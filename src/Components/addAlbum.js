
import {
    redirectUrl
} from "./Router";
import {
    getUserStorageData
} from "../Utils/storage.js";
import {displayNavBar,displayMenu} from './Home.js';
import { redirectUrl } from "./Router";
import imageDefault from "../img/defaultImg.jpg";
import { getUserStorageData } from "../Utils/storage.js";
const jwt = require("jsonwebtoken");
var FinalImage = imageDefault;

function displayAddAlbum() {

    $("#container").append(`
    <div id="navbar"></div>
    <div id="menu">
      <div id="favorite"></div>
      <div id="trends"></div>
    </div>
    <div id="addAlbumPage">
        <div id = "topPageAddAlbum">
            <img id = "imageAddAlbum"src="${imageDefault}" href"image album">
            <ol id="listMusicsToAdd">
            </ol>
        </div>
        <form id="formAddMusic">
            <div class="form-group">
                <label for="musicTitle">Titre :</label>
                <input type="text" class="form-control" id="musicTitle">
            </div>
            <div class="form-group">
                <label for="music">Musique :</label>
                <input type="file" class="form-control" id="music">
            </div>
            <div class="form-group w-25">
                <input value="Ajouter la musique" type="submit" class="form-control" id="submitAddMusic">
            </div>
        </form>
        <div id ="AddAlbumPlace"> </div>
    </div>`)
    displayNavBar()
    displayMenu()
    $("#formAddMusic").on("submit", onSubmitMusic);
    // document.getElementById("music").onchange = setFileInfo

}

let listMusicToAdd;
let currentSongDuration;
let songsDuration = [];
function onSubmitMusic(e) {
    e.preventDefault();
    setFileInfo($("#music").prop('files')[0])
    let showFormAddAlbum;
    if (!listMusicToAdd) {
        listMusicToAdd = new Array();
        showFormAddAlbum = true;
    }
    if (showFormAddAlbum) {
        $("#AddAlbumPlace").append(`
        <div class="container">
            <form id="formAddAlbum">
                <div class="form-group">
                    <label for="nom">Nom :</label>
                    <input type="text" class="form-control" id="nom">
                </div>
                <div class="form-group">
                    <label for="image">Image :</label>
                    <input type="file" class="form-control" id="image">
                </div>
                <div class="form-group w-25">
                    <input value="Créer l'album" type="submit" class="form-control" id="submitAddAlbum">
                </div>
            </form>
            <div id="errorAddingAlbum"></div>
        </div>`)
        $("#formAddAlbum").on("submit", onSubmitAlbum);
        $('#image').on("change",changeImage);
        showFormAddAlbum = false
    }
    $("#listMusicsToAdd").append(`
            <li id= "newMusic">${$("#musicTitle").val()}</li>
            <hr>
    `)
    const promise = fileToBase64($("#music").prop('files')[0]);
    promise.then((music64) => {
        listMusicToAdd.push({
            "music64": music64,
            "title": $("#musicTitle").val(),
            "duration" : songsDuration[0]
        })
    })



}


//https://stackoverflow.com/questions/29285056/get-video-duration-when-input-a-video-file/29285597
function setFileInfo(song) { 
    let audioDOM = document.createElement('audio');
    audioDOM.preload = 'metadata';

    audioDOM.onloadedmetadata = function () {
        window.URL.revokeObjectURL(audioDOM.src);
        let duration = audioDOM.duration;
        if (songsDuration.length > 0) songsDuration.pop()
        songsDuration.push(duration)
    }
    audioDOM.src = URL.createObjectURL(song);

}

function onSubmitAlbum(e) {
    e.preventDefault();
    const promise = fileToBase64($("#image").prop('files')[0]);
    promise.then((image64) => {
        const user = getUserStorageData();
        const userPayload = jwt.decode(user.token)
        let album = {
            name : $("#nom").val(),
            listMusics : listMusicToAdd,
            idCreator : userPayload.id,
            image64 : image64,
            imageName : $("#image").prop('files')[0].name
        }
        fetch("/api/albums/add/", {
            method : "POST",
            body : JSON.stringify(album),
            headers : {
                "Content-Type" : "application/json",
            }
        })
        .then((response) => {
            if (!response.ok) throw new Error("Code d'erreur : " + response.status + " : " + response.statusText);
            return response.json();
        })
        .then((data) => onAddingAlbum(data))
        .catch((err) => onErrorAddingAlbum(err));
    })
}

function onAddingAlbum(data) {
    console.log(data)
    redirectUrl("/");
}

//TODO
function onErrorAddingAlbum(err) {
    $("#errorAddingAlbum").append(`<p class="alert alert-danger mt-3"> ${err.message} </p>`);
}

function fileToBase64(file) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function () {
            resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function changeImage(e){
    isDefault = false;
    let promise = fileToBase64($("#image").prop('files')[0]);
    promise.then( (image64) => {
        $("#imageAddAlbum").attr("src", image64);
        finalImage = image64;
    });
}
export default displayAddAlbum;