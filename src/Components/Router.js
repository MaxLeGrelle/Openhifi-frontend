import {displayAccueil} from "./Accueil.js";
import displayLogin from "./Login.js";
import displayError from "./Error.js";
import displayProfil from "./Profil.js";

let pageToRender;

let navbar;
const routes = {
    "/": displayAccueil,
    "/login": displayLogin,
    "/error" : displayError,
    "/profil" : displayProfil
}

function router(){
    
    $(window).on("load", () => {
        pageToRender = routes[window.location.pathname];
        if(!pageToRender){
            displayError(new Error(`l'url ${window.location.pathname} n'existe pas`));
            return;
        }

        pageToRender();
    })

    $(window).on("popstate" , () =>{
        pageToRender = routes[window.location.pathname]
        pageToRender();
    })
    

}

function onNavigate(e){
    console.log(e.target);
    let url;
    if(e.target.tagName === "A"){
        
        e.preventDefault();
        url = e.target.dataset.url;
    }
    if(url){
        window.history.pushState({}, url, window.location.origin + url)
        pageToRender = routes[url];
        
        if(routes[url]){
            pageToRender();
        }
        else{
            displayError(new Error(`L'url ${url} n'existe pas`))
        }
    }
}
function redirectUrl(url){
    window.history.pushState({}, url, window.location.origin + url)

    pageToRender = routes[url]
    if(routes[url]){
        //TODO
        pageToRender();
    }
    else{
        displayError(new Error(`L'url ${url} n'existe pas`))
    }
}
export {router, redirectUrl, onNavigate} ;