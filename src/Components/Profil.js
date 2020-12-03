import profile from "../img/default_profile.png"
import {displayNavBar,displayMenu} from './Home.js'
import {onNavigate} from './Router.js'
import{getUserStorageData} from '../Utils/storage.js'
const jwt = require("jsonwebtoken")
function Profil(){
  displayGeneral()
}
function displayProfil() {
    $("#page").empty();
    console.log("affiche profil");
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
            <p>Mot de passe actuel : </p><input type="password" class="form-control" id="actualPassword" placeholder="Mot de passe actuel">
          </div>
          <hr>
          <div class="aligneRow">
            <p>Nouveau mot de passe : </p><input type="password" class="form-control" id="newPasswordRegistration" placeholder="Mot de passe"> <button type="submit" class="btn btn-success">OK</button>
          </div> 
        </form>
      </div>
    </div>     
    <div id= "Biographie" class="display-4">
      Biographie
    </div>
    <hr id = "whiteHR">
    <textarea id ="bio"name="bioInput" form="formBio">Enter text here...</textarea> 
  </div>`)
$("#hoverPhoto").on("click", modifierPhoto);

}

function modifierPhoto (){
  $("#modifierPhoto").empty();
  $("#modifierPhoto").append(`
  <form>
    <input id = "inputPhoto" type="file" name="photoProfile" accept="image/png, image/jpeg">
    <button type="submit" class="btn btn-primary">confirmer</button>
  </form>
  `);
}



export default displayProfil;