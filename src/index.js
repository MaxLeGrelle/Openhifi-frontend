import "./stylesheets/style.css";
import "bootstrap"
import logo from "./img/open-hifi-logo-transparent.png"

function displayAcceuil() {
    $(".container").append(`<div class='logo'>
        <img src='${logo}' alt='logo' width='150px' height='150px'>
        </div>
    `)
}

displayAcceuil()