import {getUserStorageData, setMusicLikedDataStorage, setRecentlyDataStorage, setUserDataStorage} from '../Utils/storage.js';
import { stopMusic } from './Player.js';
import { redirectUrl } from './Router.js';
import logo from '../img/open-hifi-logo-transparent.png';
import { removeLoadingAnimation } from '../Utils/animations.js';
import {getImageNavbar} from './Home.js'

const EMAIL_REGEX =  "^\\w+([.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+\$" //regex for verifying the input email

function Login() {
  removeLoadingAnimation()
  displayConnection();
  displayRegistration();
  stopMusic()
  $("#player").empty()
  $("#navbar").empty()
  $("#menu").css("display", "none");
  $("#menu").empty()
  $("#footer").css("display", "none");
}
function displayRegistration() {
  $("#registration").append(`<p>Pas encore de compte ?</p> <p>Créez en un!</p>
    <form  id= "formRegistration">
    <div class="form-group">
      <label for="formGroupExampleInput">Email :</label>
      <input type="text" class="form-control" id="emailRegistration" placeholder="Email" pattern="${EMAIL_REGEX}" required">
    </div>
    <div class="form-group">
      <label for="formGroupExampleInput2">Pseudonyme :</label>
      <input type="text" class="form-control" id="pseudoRegistration" placeholder="Pseudonyme" required>
    </div>
    <div class="form-group">
    <label for="formGroupExampleInput2">Mot de passe :</label>

    <input type="password" class="form-control" id="passwordRegistration" placeholder="Mot de passe" required>
  </div>
  <div class="form-group">
  <label for="formGroupExampleInput2">Confirmer mot de passe :</label>
  <input type="password" class="form-control" id="passwordRegistrationVerif" placeholder="Confirmation" required>
  <br><br>
<button type="submit" class="btn btn-primary">S'inscrire</button>
  </form>
  <div id ="errorRegistration" ></div>`);
}
function displayConnection() {
  $("#connection").append(`<p>Connectez-vous !</p>
    <form id="formConnection">
    <div class="form-group">
      <label for="formGroupExampleInput">Email :</label>
      <input type="text" class="form-control" id="emailConnection" placeholder="Email" pattern="${EMAIL_REGEX}" required>
    </div>
    <div class="form-group">
      <label for="formGroupExampleInput2">Mot de passe :</label>
      <input type="password" class="form-control" id="passwordConnection" placeholder="Mot de passe" required>
    </div>
    <button type="submit" class="btn btn-primary" id = "connection"> Se connecter</button>
  </form>
  <div id ="errorConnection" ></div>`);

}

function displayLogin() {
  $("#container").empty();
  $("#container").append(`<div id = "login"> </div>`)
  $("#login").append(`
  <div id = "connection"> </div>
  <img id = "logoLogin" href= "logo" src ="${logo}">
  <div id = "registration"> </div>`)

  Login();
  $("#formRegistration").on("submit", onRegister);
  $("#formConnection").on("submit", onLogin);

}

function onRegister(e){
  e.preventDefault();
  $("#errorRegistration").empty()
  if($("#passwordRegistrationVerif").val() === $("#passwordRegistration").val()){
    let user = {
      email : $("#emailRegistration").val(),
      pseudo : $("#pseudoRegistration").val(),
      password : $("#passwordRegistration").val()
      
    }
    fetch("/api/users/register/" , {
      method : "POST" , 
      body : JSON.stringify(user),
      headers: {
        "Content-Type" : "application/json",
      },
    })
    .then((response) =>{
      if(!response.ok) throw new Error("Code d'erreur : " + response.status + " : " + response.statusText);
      return response.json();
    })
    .then((data) => onRegistration(data))
    .catch((err) => onErrorRegistration(err));
  }
  else {
    onErrorRegistration(new Error("La confirmation du mot de passe est erronée"));
  }

}

//TODO
function onErrorRegistration(err){
  $("#errorRegistration").append(`<p class="alert alert-danger mt-3"> ${err.message} </p>`);
}

function onRegistration(data){
  $("#menu").css("display", "");
  setMusicLikedDataStorage([])
  setRecentlyDataStorage([])
  setUserDataStorage(data);
  getImageNavbar()
  redirectUrl("/");

}

function onLogin(e) {
  e.preventDefault();
  $("#errorConnection").empty()
  let userCo = {
    email : $("#emailConnection").val(),
    password : $("#passwordConnection").val()
  }
  fetch("/api/users/login/", {
      method : "POST" , 
      body : JSON.stringify(userCo),
      headers: {
        "Content-Type" : "application/json",
    },
  },)
  .then((response) => {
    if (!response.ok) throw new Error("Code d'erreur : " + response.status + " : " + response.statusText);
    return response.json();
  })
  .then((data) => onConnection(data))
  .catch((err) => onErrorLogin(err))
}

function onConnection(data) {
  $("#menu").css("display", "");
  setMusicLikedDataStorage(data.musicsLiked)
  setRecentlyDataStorage(data.recentlyListened)
  setUserDataStorage(data);
  getImageNavbar()
  redirectUrl("/");
}

function onErrorLogin(err) {
  let errorMessage;
  if (err.message.includes("401")) errorMessage = "Mauvais mot de passe ou email";
  else errorMessage = err.message;
  $("#errorConnection").append(`<p class="alert alert-danger"> ${errorMessage} </p>`);
  
}
export default displayLogin;
