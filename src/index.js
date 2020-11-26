import "./stylesheets/style.css";
import "bootstrap"
import logo from "./img/open-hifi-logo-transparent1.png"
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'



function displayAcceuil() {
    library.add(fas)
    dom.watch()
    $('#logo').append(`<img src="${logo}" alt="logo" height="100px" width="100px"/>`)
    $("#search").append(`<div class="input-group md-form form-sm form-2 pl-0">
    <input class="form-control my-0 py-1 red-border" type="text" placeholder="Search" aria-label="Search">
    <div class="input-group-append">
      <span class="input-group-text red lighten-3" id="basic-text1"><i class="fas fa-search text-grey"
          aria-hidden="true"></i></span>
    </div>
  </div>`)
}

displayAcceuil()