import {redirectUrl} from "./Router";
import {getUserStorageData} from "../Utils/storage.js";
import {displayNavBar,displayMenu} from './Home.js';
import imageDefault from "../img/defaultImg.jpg";
import { displayFooter } from "./Footer";
import { verifyType } from "../Utils/checkInputFile";
const jwt = require("jsonwebtoken");
const escape = require("escape-html")

/**
 * Display the form to add a music, when at least one music has been chosen, displays the form to create an album.
 * It also verifies the type & MIME type of the input's file.
 */
function displayAddAlbum() {
    $("#loading-wrapper").css("display", "none") //prevent the loading-wrapper to display when refreshing the page
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
                <input type="file" class="form-control" id="music" accept="audio/*">
            </div>
            <div class="form-group w-25">
                <input value="Ajouter la musique" type="submit" class="form-control" id="submitAddMusic">
            </div>
        </form>
        <div id="errorAddingMusic"></div>
        <div id ="AddAlbumPlace"> </div>
    </div>
    </div>`)
    $("#trends").empty()
    $("#favorite").empty();
    $('#trends').append(`<a href="#" data-url="/trends"> Tendances <i class="far fa-star fa-2x"></i> </a>`)
    $('#favorite').append(`<a href="#" data-url ="/favorite"> Favoris <i class="far fa-heart fa-2x"></i> </a>`)
    $("#formAddMusic").on("submit", (e) => {
        e.preventDefault()
        if (!verifyType($("#music").prop('files')[0], "audio")) {
            onErrorAddingMusic(new Error("Mauvais type de fichier.\n Types acceptés : mp3, aif, flac, mid, wav"))
        }else {
            $("#errorAddingMusic").empty()
            onSubmitMusic(e)
        }
        
    });
    if($("#navbar").text().length == 0){
        displayNavBar();
        displayMenu();
        displayFooter();
      }
}

let listMusicToAdd = new Array();
let songsDuration = [];

/**
 * Set the duration of the music submitted. Append the form to create an album once.
 * Verifies the input's file type & MIME type. 
 * @param {*} e event
 */
function onSubmitMusic(e) {
    e.preventDefault();
    setFileInfo($("#music").prop('files')[0])
    if ($("#AddAlbumPlace").text().length == 1) { //this div length equals 1 when it's empty
        $("#AddAlbumPlace").append(`
        <div class="container">
            <form id="formAddAlbum">
                <div class="form-group">
                    <label for="nom">Nom :</label>
                    <input type="text" class="form-control" id="nom">
                </div>
                <div class="form-group">
                    <label for="image">Image :</label>
                    <input type="file" class="form-control" id="image" accept="image/*">
                </div>
                <div class="form-group w-25">
                    <input value="Créer l'album" type="submit" class="form-control" id="submitAddAlbum">
                </div>
            </form>
            <div id="errorAddingAlbum"></div>
        </div>`)
        let submitAlbumListenerOn = false;
        $('#image').on("change",() => {
            if (!verifyType($("#image").prop('files')[0], "image")) {
                onErrorAddingAlbum(new Error("Mauvais type de fichier.\n Types acceptés : png, jpg/jpeg, ico"))
            }else {
                $("#errorAddingAlbum").empty()
                changeImage()
                if (!submitAlbumListenerOn) $("#formAddAlbum").on("submit", onSubmitAlbum);
                submitAlbumListenerOn = true;
            }
            
        });
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

/**
 * Get the duration of a song
 * source : https://stackoverflow.com/questions/29285056/get-video-duration-when-input-a-video-file/29285597
 * @param {*} song an input file which represents an audio.
 */
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
 * Send the album to the backend.
 * It will contains its name, its list of musics in base64,
 * the creator's id, the album's image in base64 and its name.
 * @param {} e event
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
        fetch("/api/albums/add/", { //TODO authorize
            method : "POST",
            body : JSON.stringify(album),
            headers : {
                "Content-Type" : "application/json",
                Authorization: user.token,
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

/**
 * When the album has been submitted, redirect to the home page.
 */
function onAddingAlbum() {
    redirectUrl("/");
}

/**
 * If an error has been sent during the album's creation process, displays it in the page
 * @param {*} err an Error, if it contains a message, It will be shown.
 */
function onErrorAddingAlbum(err) {
    $("#errorAddingAlbum").empty()
    if (err.message) $("#errorAddingAlbum").append(`<p class="alert alert-danger mt-3"> ${err.message} </p>`);
    else $("#errorAddingAlbum").append(`<p class="alert alert-danger mt-3">Erreur lors de l'ajout de l'album</p>`);
}

function onErrorAddingMusic(err) {
    $("#errorAddingMusic").empty()
    if (err.message) $("#errorAddingMusic").append(`<p class="alert alert-danger mt-3"> ${err.message} </p>`);
    else $("#errorAddingMusic").append(`<p class="alert alert-danger mt-3">Erreur lors de l'ajout de la musique</p>`);
}

/**
 * transform a file to base64
 * source : https://stackoverflow.com/questions/36280818/how-to-convert-file-to-base64-in-javascript
 * @param {*} file the file to transform in base64
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
 * When the user put a new image, shows it directly
 */
function changeImage(){
    let promise = fileToBase64($("#image").prop('files')[0]);
    promise.then( (image64) => {
        $("#imageAddAlbum").attr("src", image64);
    });
}

export {displayAddAlbum, fileToBase64};
