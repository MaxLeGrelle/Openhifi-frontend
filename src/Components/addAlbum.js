import {redirectUrl} from "./Router";
import {getUserStorageData} from "../Utils/storage.js";
import {displayNavBar,displayMenu} from './Home.js';
import imageDefault from "../img/defaultImg.jpg";
import { displayFooter } from "./Footer";
const jwt = require("jsonwebtoken");
const escape = require("escape-html")

function displayAddAlbum() {
    $("#loading-wrapper").css("display", "none")
    $("#container").empty()
    $("#container").append(`
    <div id="main">
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
        <div id ="AddAlbumPlace"></div>
    </div>
    </div>`)
    $("#trends").empty()
    $("#favorite").empty();
    $('#trends').append(`<a href="#" data-url="/trends"> Tendances <i class="far fa-star fa-2x"></i> </a>`)
    $('#favorite').append(`<a href="#" data-url ="/favorite"> Favoris <i class="far fa-heart fa-2x"></i> </a>`)
    $("#formAddMusic").on("submit", onSubmitMusic);
    if($("#navbar").text().length == 0){
        displayNavBar();
        displayMenu();
        displayFooter();
      }
}

let listMusicToAdd;
let songsDuration = [];
function onSubmitMusic(e) {
    e.preventDefault();
    setFileInfo($("#music").prop('files')[0])
    let showFormAddAlbum = true;
    listMusicToAdd = new Array();
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
        showFormAddAlbum = false
        listMusicToAdd = new Array();
        $("#formAddAlbum").on("submit", onSubmitAlbum);
        $('#image').on("change",changeImage);
    }
    $("#listMusicsToAdd").append(`
            <li id= "newMusic">${escape($("#musicTitle").val())}</li>
            <hr>
    `)
    const promise = fileToBase64($("#music").prop('files')[0]);
    promise.then((music64) => {
        listMusicToAdd.push({
            "music64": music64,
            "title": escape($("#musicTitle").val()),
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
/**
 * send the album to the backend
 * @param {} e 
 */
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
        .then(() => onAddingAlbum())
        .catch((err) => onErrorAddingAlbum(err));
    })
}

function onAddingAlbum() {
    redirectUrl("/");
}

//TODO
function onErrorAddingAlbum(err) {
    $("#errorAddingAlbum").append(`<p class="alert alert-danger mt-3"> ${err.message} </p>`);
}


/**
 * transform a file to a b64
 * @param {*} file 
 */
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

/**
 * when the user put a new image, show it directly
 */
function changeImage(){
    let promise = fileToBase64($("#image").prop('files')[0]);
    promise.then( (image64) => {
        $("#imageAddAlbum").attr("src", image64);
    });
}
export {displayAddAlbum, fileToBase64};