import {displayNavBar,displayMenu} from './Home.js'
import {onNavigate} from './Router.js'
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
  $("#main").append(`
  <div id = "BlocProfil">
    <div id = "BlocInfoGeneral">
      <div id = "general">
        <div class="display-4">
          Général
        </div>
        <hr id = "whiteHR">
        <p>Pseudo :</p>
        <hr>
        <p>email :</p>
        <hr>
        <form id ="FormChangePassword">
          <div id="aligneRow">
            Mot de passe actuel : <input type="password" class="form-control" id="actualPassword" placeholder="Mot de passe actuel">
          </div>
          <hr>
          <div id="aligneRow">
            Nouveau mot de passe :   <input type="password" class="form-control" id="newPasswordRegistration" placeholder="Mot de passe"> <button type="submit" class="btn btn-success">OK</button>
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
}
export default displayProfil;