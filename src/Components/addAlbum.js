import { redirectUrl } from "./Router";
import { getUserStorageData } from "../Utils/storage.js";
const jwt = require("jsonwebtoken");

function displayAddAlbum() {
    $("#page").append(`
    <form id="formAddAlbum">
        <div class="form-group">
            <label for="nom">Nom :</label>
            <input type="text" class="form-control" id="nom">
        </div>
        <div class="form-group">
            <label for="image">Image :</label>
            <input type="file" class="form-control" id="image">
        </div>
        <div class="form-group">
            <input type="submit" class="form-control" id="submitAddAlbum">
        </div>
    </form>
    <div id="errorAddingAlbum"></div>
    <div id="displayAlbum"></div>`)
    $("#formAddAlbum").on("submit", onSubmitAlbum);
}

function onSubmitAlbum(e) {
    e.preventDefault();
    const promise = imageToBase64($("#image").prop('files')[0]);
    promise.then((image64) => {
        const user = getUserStorageData();
        const userPayload = jwt.decode(user.token)
        let album = {
            name : $("#nom").val(),
            listIdMusics : [],
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
function onErrorAddingAlbum(err){
    $("#errorAddingAlbum").append(`<p class="alert alert-danger mt-3"> ${err.message} </p>`);
}

function imageToBase64(image) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function() { resolve(reader.result); };
        reader.onerror = reject;
        reader.readAsDataURL(image);
    });
}
export default displayAddAlbum;