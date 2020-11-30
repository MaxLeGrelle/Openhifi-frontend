
//import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {

  displayConnection();
  displayRegistration();
}
function displayRegistration() {
  $("#registration").append(`<p>Pas encore de compte ?</p> <p>Créez en un!</p>
    <form  id= "formRegistration" method = "POST" action = "/">
    <div class="form-group">
      <label for="formGroupExampleInput">Email :</label>
      <input type="text" class="form-control" id="emailRegistration" placeholder="Email">
    </div>
    <div class="form-group">
      <label for="formGroupExampleInput2">Pseudonyme :</label>
      <input type="text" class="form-control" id="pseudoRegistration" placeholder="Pseudonyme">
    </div>
    <div class="form-group">
    <label for="formGroupExampleInput2">Mot de passe :</label>
    <input type="text" class="form-control" id="passwordRegistration" placeholder="Mot de passe">
  </div>
  <div class="form-group">
  <label for="formGroupExampleInput2">Confirmer mot de passe :</label>
  <input type="text" class="form-control" id="passwordRegistrationVerif" placeholder="Confirmation">
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
  </form>`);
}
function displayConnection() {
  $("#connection").append(`<p>Connectez-vous !</p>
    <form method = "POST" action="${window.location}">
    <div class="form-group">
      <label for="formGroupExampleInput">Email :</label>
      <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Email">
    </div>
    <div class="form-group">
      <label for="formGroupExampleInput2">Mot de passe :</label>
      <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Mot de passe">
    </div>
    <button type="submit" class="btn btn-primary" id = "connection"> Se connecter</button>
  </form>`);

}

function displayLogin() {
  $("#page").empty();
  $("#page").append(`<div id = "login"> </div>`)
  $("#login").append(`<div id = "connection"> </div>  <div id = "registration"> </div>`)

  Login();
  $("#formRegistration").on("submit", onRegister);

}

function onRegister(e){
  e.preventDefault();

  let user = {
    email : $("#emailRegistration").val(),
    pseudo : $("#pseudoRegistration").val(),
    password : $("#passwordRegistration").val()
  }
}

export default displayLogin;
