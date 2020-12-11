
function displayError(err){
    $("#navbar").empty();
    $("#menu").empty();
    $("#footer").empty();
    if(!err) $("#page").html(`<p class ="alert alert-danger"> oups, il y a eu une erreur <h1> (╬▔皿▔)╯ </h1> </p>`);
    else if (!err.message)  $("#page").html(`<p class ="alert alert-danger" > ${err} <h1> (╬▔皿▔)╯ </h1></p>`)
    else  $("#page").html(`<p class ="alert alert-danger"> ${err.message}  <h1 id="error"> (╬▔皿▔)╯ </h1></p>`);
}

export default displayError;
