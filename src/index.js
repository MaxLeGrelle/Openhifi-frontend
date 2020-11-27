import "./stylesheets/style.css";
import "bootstrap"
import logo from "./img/open-hifi-logo-transparent2.png"
import profile from "./img/default_profile.png"
import r1 from "./img/rooster.jpg"
import r2 from "./img/camel.jpg"
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'



function displayAcceuil() {
    //set up for import fas
    library.add(fas,far)
    dom.watch()
    $('#logo').append(`<img src="${logo}" alt="logo" height="100px" width="100px"/>`)
    $("#search").append(`
    <div class="input-group md-form form-sm form-2 pl-0">
      <input size ="100" class="form-control my-0 py-1 red-border" type="text" placeholder="Rechercher" aria-label="Search">
      <div class="input-group-append">
        <span class="input-group-text red lighten-3" id="basic-text1"><i class="fas fa-search "aria-hidden="true"></i></span>
      </div>
    </div>`)
  $('#add').append(`<button class="btn btn-bluegradient">Ajouter</button>`)
  $('#profile').append(`<img src="${profile}" alt="logo" height="60px" width="60px"/>`)
  $('#trends').append(`<a href="url"> Tendances <i class="far fa-star fa-2x"></i> </a>`)
  $('#favorite').append(`<a href="url"> Favoris <i class="far fa-heart fa-2x"></i> </a>`)
  $('#recently').append(`
  <div id="carouselExampleControls" class="carousel slide" data-interval="false">
  <div class="carousel-inner">
    <div class="carousel-item active">
    <img src="${r1}" alt="logo" height="200px" width="200px"/>
    <img src="${r2}" alt="logo" height="200px" width="200px"/>
    <img src="${r1}" alt="logo" height="200px" width="200px"/>
    <img src="${r2}" alt="logo" height="200px" width="200px"/>
    </div>
    <div class="carousel-item">
    <img src="${r1}" alt="logo" height="200px" width="200px"/>
    <img src="${r1}" alt="logo" height="200px" width="200px"/>
    <img src="${r1}" alt="logo" height="200px" width="200px"/>
    <img src="${r1}" alt="logo" height="200px" width="200px"/>
    </div>
  </div>
  <div id="next">
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
  </div>
  <div id="prev">
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</div>`)
  //$('#r1').append(``)
  //$('#r2').append(`<img src="${r2}" alt="logo" height="200px" width="200px"/>`)
  //$('#r3').append(`<img src="${r1}" alt="logo" height="200px" width="200px"/>`)
  //$('#r4').append(`<img src="${r2}" alt="logo" height="200px" width="200px"/>`)
  
}

displayAcceuil()