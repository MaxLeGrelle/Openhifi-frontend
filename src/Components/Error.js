import {removeLoadingAnimation} from "../Utils/animations.js"

/**
 * Displays the error page
 * @param {*} err Error, if it contains a message, it will be shown
 */ 
function displayError(err){
    if(!err) $("#page").html(`<p class ="alert alert-danger"> oups, il y a eu une erreur <h1> (╬▔皿▔)╯ </h1> </p>`);
    else if (!err.message)  $("#page").html(`<p class ="alert alert-danger" > ${err} <h1> (╬▔皿▔)╯ </h1></p>`)
    else  $("#page").html(`<p class ="alert alert-danger"> ${err.message}  <h1 id="error"> (╬▔皿▔)╯ </h1></p>`);
    removeLoadingAnimation()
}

export default displayError;
