
//import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';

function Login(){
   
    displayConnection();
    displayRegistration();
}
function displayConnection(){
    $("#connection").append(`<p>Pas encore de compte ?</p> <p>Créez en un!</p>
    <form>
    <div class="form-group">
      <label for="formGroupExampleInput">Email :</label>
      <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Email">
    </div>
    <div class="form-group">
      <label for="formGroupExampleInput2">Pseudonyme :</label>
      <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Pseudonyme">
    </div>
    <div class="form-group">
    <label for="formGroupExampleInput2">Mot de passe :</label>
    <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Mot de passe">
  </div>
  <div class="form-group">
  <label for="formGroupExampleInput2">Confirmer mot de passe :</label>
  <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Confirmation">
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
  </form>
  <button class="btn btn-primary">S'inscrire</button>`)
}
function displayRegistration(){
    $("#registration").append(`<p>Connectez-vous !</p>
    <form>
    <div class="form-group">
      <label for="formGroupExampleInput">Email :</label>
      <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Email">
    </div>
    <div class="form-group">
      <label for="formGroupExampleInput2">Mot de passe :</label>
      <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Mot de passe">
    </div>
  </form>
  <button class="btn btn-primary">Se connecter</button>`);
}
export default Login;
