import {displayHome} from "./Home.js";
import displayLogin from "./Login.js";
import displayError from "./Error.js";
import logout from "./Logout.js";
import { getUserStorageData } from "../Utils/storage.js";
import displayProfil from "./Profil.js";
import {displayFavorite} from "./Favorite.js";
import {displayAddAlbum} from "./addAlbum.js";
import {displayAlbum} from "./Album.js";
import displayLegalMentions from "./LegalMentions.js";
let pageToRender;

//Dictionnary of all routes
const routes = {
    "/": displayHome,
    "/login": displayLogin,
    "/logout" : logout,
    "/profil" : displayProfil,
    "/favorite": displayFavorite,
    "/addAlbum" : displayAddAlbum,
    "/albums": displayAlbum,
    "/error" : displayError,
    "/legalMentions" : displayLegalMentions
}

/**
 * allow to render the right page in relation with the current url
 */
function router(){
    $(window).on("load", () => {
        pageToRender = routes[window.location.pathname];
        if (!getUserStorageData() && window.location.pathname != "/error" && window.location.pathname != "/legalMentions") {
            pageToRender = routes["/login"]; //if not connected => display login/register page
            window.history.pushState({}, "/login", window.location.origin + "/login")
        }
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

/**
 * Change the url when interacting with DOM elements which have data-url and render the right page
 * @param {*} e event 
 */
function onNavigate(e){
    let url;
    let id;
    if(e.target.tagName === "A"){
        e.preventDefault();
        url = e.target.dataset.url;
    }else if (e.target.tagName === "IMG" || e.target.tagName === "H4" || e.target.tagName === "P" || e.target.tagName === "SPAN") {
        id = e.target.parentElement.dataset.id;
        url = e.target.parentElement.dataset.url;
        if (!url) url = e.target.dataset.url
    }

    if(url){
        if (id) window.history.pushState({}, url, window.location.origin + url + '?no=' + id) 
        else window.history.pushState({}, url, window.location.origin + url)
        pageToRender = routes[url];
        
        if(routes[url]){
            pageToRender();
        }
        else{
            displayError(new Error(`L'url ${url} n'existe pas`))
        }
    }
}

/**
 * Redirect to the url url
 * @param {*} url url to redirect
 */
function redirectUrl(url){
    window.history.pushState({}, url, window.location.origin + url)

    pageToRender = routes[url]
    if(routes[url]){
        pageToRender();
    }
    else{
        displayError(new Error(`L'url ${url} n'existe pas`))
    }
}

export {router, redirectUrl, onNavigate} ;