
import {setMusicLikedDataStorage, setUserDataStorage} from '../Utils/storage.js';
import { stopMusic } from './Player.js';
import { redirectUrl } from './Router.js';

const EMAIL_REGEX =  "^\\w+([.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,4})+\$"

function Login() {

  displayConnection();
  displayRegistration();
  stopMusic()
  $("#player").empty()
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

</div>
<div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="homme">
    <label class="form-check-label" for="gridRadios1">
    Homme
    </label>
</div>
<div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="femme">
    <label class="form-check-label" for="gridRadios1">
    Femme
    </label>
</div>
<div class="form-check form-check-inline">
    <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="autre">
    <label class="form-check-label" for="gridRadios1">
    Autre
    </label>
</div>
<div class="form-group col-md-4">
<label for="inputState">Style</label>
<select id="inputState" class="form-control">
  <option selected>Style</option>
  <option>pop</option>
</select>
</div>
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
  $("#login").append(`<div id = "connection"> </div>  <div id = "registration"> </div>`)

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
  setUserDataStorage(data);
  setMusicLikedDataStorage(new Array())
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
  setUserDataStorage({token : data.token, email : data.email});
  console.log(data.musicsLiked)
  setMusicLikedDataStorage(data.musicsLiked)
  redirectUrl("/");
}

function onErrorLogin(err) {
  let errorMessage;
  if (err.message.includes("401")) errorMessage = "Mauvais mot de passe ou email";
  else errorMessage = err.message;
  $("#errorConnection").append(`<p class="alert alert-danger"> ${errorMessage} </p>`);
  
}
export default displayLogin;
