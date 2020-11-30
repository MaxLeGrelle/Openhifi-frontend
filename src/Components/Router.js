import displayAccueil from "./Accueil.js";
import displayLogin from "./Login.js";
import displayError from "./Error.js";

let pageToRender;

const routes = {
    "/": displayAccueil,
    "/login": displayLogin,
    "/error" : displayError
}

function router(){
    $(window).on("load", () => {
        pageToRender = routes[window.location.pathname];
        if(!pageToRender){
            displayError(new Error(`l'url ${window.location.pathname} n'existe pas`));
            return;
        }
        pageToRender();
    });
}

export default router;