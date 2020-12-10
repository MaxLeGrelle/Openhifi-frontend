import profile from "../img/default_profile.png"
import {displayNavBar,displayMenu} from './Home.js'
import {onNavigate} from './Router.js'
import{getUserStorageData} from '../Utils/storage.js'
const jwt = require("jsonwebtoken")
function Profil(){
  displayGeneral()
}
function displayProfil() {

    $("#container").empty();
    console.log("affiche profil");
    $("#container").append(` 
      <div id="navbar"></div>

      <div id="menu">
        <div id="favorite"></div>
        <div id="trends"></div>
      </div>
      <div id="main"></div>`);
    displayMenu()
    displayNavBar()
    Profil()
    
}
function displayGeneral(){
  const userLogged = getUserStorageData()
  const infoUser  = jwt.decode(userLogged.token)
  $("#main").append(`

  <div id = "BlocProfil">
    <div id = "BlocInfoGeneral">
      <div id= "hoverPhoto">
        <img id= "photoDuProfile" src="${profile}" alt="photo de profile"/>
        <div id = "modifierPhoto" > </div>      
      </div>
      <div id = "general">
        <div class="display-4">
          Général
        </div>
        <hr id = "whiteHR">
        <p>Pseudo : ${infoUser.pseudo}</p>
        <hr>
        <p>email : ${infoUser.email}</p>
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
    <div id= "Biographie" class="display-4">
      Biographie
    </div>
    <hr id = "whiteHR">
    <textarea id ="bio"name="bioInput" form="formBio">Enter text here...</textarea> 
  </div>`)
$("#hoverPhoto").on("click", editPhoto);
$("#BtnEditPassword").on("click", editPassword);

}

function editPhoto (){
  $("#modifierPhoto").empty();
  $("#modifierPhoto").append(`
  <form>
    <input id = "inputPhoto" type="file" name="photoProfile" accept="image/png, image/jpeg">
    <button type="submit" class="btn btn-primary">confirmer</button>
  </form>
  `);
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