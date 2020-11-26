import "./stylesheets/style.css";
import "bootstrap"
import logo from "./img/open-hifi-logo-transparent1.png"
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function displayAcceuil() {
    $('#logo').append(`<img src="${logo}" alt="logo" height="100px" width="100px"/>`)
    $("#search").append(`<div class="active-pink-3 active-pink-4 mb-4">
    <input class="form-control" type="text" placeholder="Search" aria-label="Search">
  </div>`)
}

displayAcceuil()