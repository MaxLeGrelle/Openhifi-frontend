import {displayAccueil} from "./Home.js";
import displayLogin from "./Login.js";
import displayError from "./Error.js";
import logout from "./Logout.js";
import { getUserStorageData } from "../Utils/storage.js";
import displayProfil from "./Profil.js";
import displayTrends from "./Trends.js";
import displayFavorite from "./Favorite.js";

let pageToRender;

let navbar;
const routes = {
    "/": displayAccueil,
    "/login": displayLogin,
    "/logout" : logout,
    "/profil" : displayProfil,
    "/trends": displayTrends,
    "/favorite": displayFavorite,
    "/error" : displayError
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
    console.log(e.target);
    let url;
    if(e.target.tagName === "A" || e.target.tagName === "IMG"){
        
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