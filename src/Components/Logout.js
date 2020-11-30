const { removeAllDataStorage } = require("../Utils/storage");
const { redirectUrl } = require("./Router");

function logout() {
    removeAllDataStorage();
    redirectUrl("/login")
}

export default logout;