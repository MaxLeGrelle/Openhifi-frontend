const { removeAllDataStorage} = require("../Utils/storage");
const { redirectUrl } = require("./Router");

//redirect to login page and logout the currrent user
function logout() {
    removeAllDataStorage();
    redirectUrl("/login")
}

export default logout;