import profile from "../img/default_profile.png"
import {displayNavBar,displayMenu} from './Home.js'
import {onNavigate} from './Router.js'
import{getUserStorageData} from '../Utils/storage.js'
import{fileToBase64} from './addAlbum.js'
import { displayFooter} from './Footer.js'
const jwt = require("jsonwebtoken")
let showEditPhoto = false;
let userInformations;


function displayProfil() {
    $("#loading-wrapper").css("display", "none")
    getPublicInformations()
    $("#container").empty();
    console.log("affiche profil");
    $("#container").append(`<div id="main"></div>`);
    if($("#navbar").text().length == 0){
      displayNavBar();
      displayMenu();
      displayFooter();
    }
    displayGeneral()
    
}
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
      <input  id = "btnChangeBio" type = "submit" value = "confirmer changements" class="btn btn-primary form-control">
    </form>
  </div>`)
  $("#trends").empty()
  $("#favorite").empty();
  $('#trends').append(`<a href="#" data-url="/trends"> Tendances <i class="far fa-star fa-2x"></i> </a>`)
  $('#favorite').append(`<a href="#" data-url ="/favorite"> Favoris <i class="far fa-heart fa-2x"></i> </a>`)
$("#formChangeBio").on("submit",editBio)  
$("#hoverPhoto").on("click", editPhoto);
$("#BtnEditPassword").on("click", editPassword);

}

function editBio(e){
  e.preventDefault();
  const user = getUserStorageData();
  const userPayload = jwt.decode(user.token)
        let biographie = {
            bio : $("#bio").val(),
            id : userPayload.id
        }
        fetch("/api/users/profil/bio", {
            method : "PUT",
            body : JSON.stringify(biographie),
            headers : {
                "Content-Type" : "application/json",
            }
        })
        .then((response) => {
            if (!response.ok) throw new Error("Code d'erreur : " + response.status + " : " + response.statusText);
            return response.json();
        })
        .then((data) => getBio(data))
        .catch((err) => onErrorAddingAlbum(err));
}

function getBio(data){
  $("#bio").empty();
  $("#bio").append(data.bio)
}

function editPhoto (){
  if(showEditPhoto) return;
  showEditPhoto = true;
  $("#modifierPhoto").append(`
  <form id = "submitEditPhoto">
    <div id="form-group">
      <label for = "inputPhoto">nouvelle photo :</label>
      <input type="file" class="form-control" id="inputPhoto" accept="image/*">
    </div>
    <div id="form-group">
      <input id = "btnConfirmSetImage" type="submit" class="btn btn-primary form-control" value = "confirmer le choix">
    </div>
  </form>
  `);
  $("#submitEditPhoto").on("submit", sendPhoto);
}

function getThisUser(data){
  userInformations = data;
  if (userInformations.userInfo.pathImage !== "") $("#photoDuProfile").attr("src",userInformations.userInfo.pathImage)
  $("#bio").empty();
  $("#bio").append(userInformations.userInfo.bio)
}


function getPublicInformations(){
  const user = getUserStorageData();
  const userPayload = jwt.decode(user.token)
  let id = userPayload.id
  fetch("/api/users/profil/"+ id,{

  }).then((response) =>{
    if (!response.ok) throw new Error("Code d'erreur : " + response.status + " : " + response.statusText);
    return response.json();
  }).then((data) => getThisUser(data))
  .catch((err) => onErrorProfile(err));
}

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
      fetch("/api/users/profil/setImage/", {
          method : "PUT",
          body : JSON.stringify(photo),
          headers : {
              "Content-Type" : "application/json",
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

function onErrorProfile(err){
  $("#alertMdp").empty();  
  if(err.message){
    $("#alertMdp").append(`</br><p class="alert alert-danger">${err.message} </p>`);
  }else{  $("#alertMdp").append(`</br><p class="alert alert-danger">la modification ne s'est pas bien déroulée </p>`);
}
}

function showData(data){
  console.log("DATA", data)
  $("#photoDuProfile").attr("src",data.image64);
}

function editPassword(e){
  e.preventDefault();
  const userLogged = getUserStorageData()
  const infoUser  = jwt.decode(userLogged.token)

  let userPassword = {
    newPassword : $("#newPassword").val(),
    oldPassword : $("#oldPassword").val(),
    email : infoUser.email
  }

  console.log($("#newPassword").val())
  console.log($("#oldPassword").val())
  console.log(infoUser.email)

  fetch("/api/users/profil/editPw" , {
    method : "POST" , 
    body : JSON.stringify(userPassword),
    headers: {
      "Content-Type" : "application/json",
    },
  }).then((response) =>{
    if(!response.ok) throw new Error("Code d'erreur : " + response.status + " : " + response.statusText);
    return response.json();
  }).then( () => {
    $("#alertMdp").empty();
    $("#alertMdp").append(` </br><p class="alert alert-success"> la modification a été exécutée avec succès </p>`);
  }).catch((err) => { 
    $("#alertMdp").empty();
    $("#alertMdp").append(`</br><p class="alert alert-danger">la modification ne s'est pas bien déroulée </p>`);
  })
}

export default displayProfil;