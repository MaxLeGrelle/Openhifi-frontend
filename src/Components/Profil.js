import profile from "../img/default_profile.png"
import {displayNavBar,displayMenu} from './Home.js'
import{getUserStorageData} from '../Utils/storage.js'
import{fileToBase64} from './addAlbum.js'
import { displayFooter} from './Footer.js'
import { verifyType } from "../Utils/checkInputFile"
const jwt = require("jsonwebtoken")
let showEditPhoto = false;
let userInformations;

/**
 * called to display the page profil
 */
function displayProfil() {
    $("#loading-wrapper").css("display", "none")
    getPublicInformations()
    $("#container").empty();
    $("#container").append(`<div id="main"></div>`);
    if($("#navbar").text().length == 0){ // if the navbar is empty fill it
      displayNavBar();
      displayMenu();
      displayFooter();
    }
    displayGeneral()
    
}

/**
 * display the first part of the page
 * general informations
 */
function displayGeneral(){
  showEditPhoto = false;
  const user = getUserStorageData();
  $("#main").append(`

  <div id = "BlocProfil">
    <div id = "BlocInfoGeneral">
      <div id= "hoverPhoto">
        <img id= "photoDuProfile" src="${profile}" alt="photo de profile"/>    
      </div>
      <div id = "general">
        <div class="display-4">
          Général
        </div>
        <hr id = "whiteHR">
        <p>Pseudo : ${user.pseudo}</p>
        <hr>
        <p>email : ${user.email}</p>
        <hr>
        <form id ="FormChangePassword">
          <div class="aligneRow">
            <p>Mot de passe actuel : </p><input type="password" class="form-control" id="oldPassword" placeholder="Mot de passe actuel">
          </div>
          <hr>
          <div class="aligneRow">
            <p>Nouveau mot de passe : </p><input type="password" class="form-control" id="newPassword" placeholder="Mot de passe">
            <button id="BtnEditPassword" type="submit" class="btn btn-success">OK</button>
          </div> 
        </form>
        <div id= "alertMdp"> </div>
      </div>
    </div>  
    <div id = "modifierPhoto" > </div>     
    <div id= "Biographie" class="display-4">
      Biographie
    </div>
    <hr id = "whiteHR">
    <form id= "formChangeBio">
      <textarea cols = "60" rows = "5" id ="bio" name="bioInput"> 
      </textarea>
    </form>
  </div>`)
  $("#favorite").empty();
  $('#favorite').append(`<a href="#" data-url ="/favorite"> Favoris <i class="far fa-heart fa-2x"></i> </a>`)
$("#formChangeBio").on("change",editBio)
$('#hoverPhoto').on("mouseover", () => $("#photoDuProfile").css("opacity", "0.5")) 
$('#hoverPhoto').on("mouseleave", () => $("#photoDuProfile").css("opacity", "1"))  

$("#hoverPhoto").on("click", editPhoto);
$("#BtnEditPassword").on("click", editPassword);

}

/**
 * function to change the content of the bio
 * @param {*} e event
 */
function editBio(e){
  e.preventDefault();
  const user = getUserStorageData();
  const userPayload = jwt.decode(user.token)
        let biographie = {
            bio : $("#bio").val(),
            id : userPayload.id
        }
        fetch("/api/users/profil/bio", { //TODO authorize
            method : "PUT",
            body : JSON.stringify(biographie),
            headers : {
                "Content-Type" : "application/json",
                Authorization: user.token,
            }
        })
        .then((response) => {
            if (!response.ok) throw new Error("Code d'erreur : " + response.status + " : " + response.statusText);
            return response.json();
        })
        .then((data) => getBio(data))
        .catch((err) => onErrorAddingAlbum(err));
}

/**
 * replace the bio directly on the page
 * @param {*} data 
 */
function getBio(data){
  $("#bio").empty();
  $("#bio").append(data.bio)
}

/**
 * display the form to edit your photo
 */
function editPhoto (){
  if(showEditPhoto) return;
  showEditPhoto = true;
  $("#modifierPhoto").append(`
  <form id = "submitEditPhoto">
    <div id="form-group">
      <label for = "inputPhoto" class="text-white font-weight-bold">nouvelle photo :</label>
      <input type="file" class="form-control" id="inputPhoto" accept="image/*">
    </div>
    <div id="form-group">
      <input id = "btnConfirmSetImage" type="submit" class="btn btn-primary form-control" value = "confirmer le choix">
    </div>
  </form>
  `);
  $("#submitEditPhoto").on("submit", (e) => {
    e.preventDefault()
    $("#alertMdp").empty()
    if (!verifyType($("#inputPhoto").prop("files")[0], "image")) {
      onErrorProfile(new Error("Mauvais type de fichier.\n Types acceptés : png, jpeg, ico"))
    }else {
      sendPhoto(e)
    }
  })
}

/**
 * show the bio and the photo when the user arrive on the page
 * @param {} data 
 */
function getThisUser(data){
  userInformations = data;
  if (userInformations.userInfo.pathImage !== "") $("#photoDuProfile").attr("src",userInformations.userInfo.pathImage)
  $("#bio").empty();
  $("#bio").append(userInformations.userInfo.bio)
}

/**
 * ask user's informations from the backend
 */
function getPublicInformations(){
  const user = getUserStorageData();
  const userPayload = jwt.decode(user.token)
  let id = userPayload.id
  fetch("/api/users/profil/"+ id,{ //TODO authorize
    method : "GET",
    headers : {
      Authorization: user.token,
    }
  }).then((response) =>{
    if (!response.ok) throw new Error("Code d'erreur : " + response.status + " : " + response.statusText);
    return response.json();
  }).then((data) => getThisUser(data))
  .catch((err) => onErrorProfile(err));
}

/**
 * set the photo of the user
 * @param {*} e 
 */
function sendPhoto(e){
  e.preventDefault()
  const user = getUserStorageData();
  const userPayload = jwt.decode(user.token)
  let image = $("#inputPhoto").prop('files')[0];
  if(image){
    const promise = fileToBase64(image)
    promise.then((image64) => {
      let photo = {
          id : userPayload.id,
          image64 : image64,
          nameImage : image.name
      }
      fetch("/api/users/profil/setImage/", { //TODO authorize
          method : "PUT",
          body : JSON.stringify(photo),
          headers : {
              "Content-Type" : "application/json",
              Authorization: user.token,
          }
      })
      .then((response) => {
          if (!response.ok) throw new Error("Code d'erreur : " + response.status + " : " + response.statusText);
          return response.json();
      }).then((data) => showData(data))
        .catch((err) => onErrorProfile(err));
    })
  }
   else{
     onErrorProfile(new Error("vous n'avez pas ajouté d'image"));
   }
}

/**
 * display an error on the page
 * @param {*} err 
 */
function onErrorProfile(err){
  $("#alertMdp").empty();  
  if(err.message){
    $("#alertMdp").append(`</br><p class="alert alert-danger">${err.message} </p>`);
  }else{  $("#alertMdp").append(`</br><p class="alert alert-danger">la modification ne s'est pas bien déroulée </p>`);
}
}

/**
 * display the new user's photo
 * @param {*} data 
 */
function showData(data){
  $("#photoDuProfile").attr("src",data.image64);
  $("#photoProfil").attr("src",data.image64);
}

/**
 * allow the password's change to the user
 * and set it in the back
 * @param {*} e event
 */
function editPassword(e){
  e.preventDefault();
  const userLogged = getUserStorageData()
  const infoUser  = jwt.decode(userLogged.token)

  let userPassword = {
    newPassword : $("#newPassword").val(),
    oldPassword : $("#oldPassword").val(),
    email : infoUser.email
  }

  fetch("/api/users/profil/editPw" , { //TODO authorize
    method : "POST" , 
    body : JSON.stringify(userPassword),
    headers: {
      "Content-Type" : "application/json",
      Authorization: userLogged.token,
    },
  }).then((response) =>{
    if(!response.ok) throw new Error("Code d'erreur : " + response.status + " : " + response.statusText);
    return response.json();
  }).then( () => {
    $("#alertMdp").empty();
    $("#alertMdp").append(` </br><p class="alert alert-success"> la modification a été exécutée avec succès </p>`);
  }).catch(() => { 
    $("#alertMdp").empty();
    $("#alertMdp").append(`</br><p class="alert alert-danger">la modification ne s'est pas bien déroulée </p>`);
  })
}

export default displayProfil;