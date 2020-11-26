import "./stylesheets/style.css";
import "bootstrap"
import logo from "./img/open-hifi-logo-transparent1.png"
import 'bootstrap';

function displayAcceuil() {
    $('#logo').append(`<img src="${logo}" alt="logo" height="100px" width="100px"/>`)
    $("#search").append(``)
}

displayAcceuil()