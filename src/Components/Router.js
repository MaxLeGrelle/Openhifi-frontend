import {displayHome} from "./Home.js";
import displayLogin from "./Login.js";
import displayError from "./Error.js";
import logout from "./Logout.js";
import { getUserStorageData } from "../Utils/storage.js";
import displayProfil from "./Profil.js";
import displayTrends from "./Trends.js";
import displayFavorite from "./Favorite.js";
import {displayAddAlbum} from "./addAlbum.js";
import {displayAlbum} from "./Album.js";
import displayLegalMentions from "./LegalMentions.js";
let pageToRender;

const routes = {
    "/": displayHome,
    "/login": displayLogin,
    "/logout" : logout,
    "/profil" : displayProfil,
    "/trends": displayTrends,
    "/favorite": displayFavorite,
    "/addAlbum" : displayAddAlbum,
    "/albums": displayAlbum,
    "/error" : displayError,
    "/legalMentions" : displayLegalMentions
}

function router(){
    $(window).on("load", () => {
        pageToRender = routes[window.location.pathname];
        if (!getUserStorageData() && window.location.pathname != "/error") pageToRender = routes["/login"]; //if not connected => display login/register page
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