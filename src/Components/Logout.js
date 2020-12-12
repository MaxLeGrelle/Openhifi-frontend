const { removeAllDataStorage, getUserStorageData, getRecentlyDataStorage } = require("../Utils/storage");
const { redirectUrl } = require("./Router");
const jwt = require("jsonwebtoken")


function logout() {
    removeAllDataStorage();
    redirectUrl("/login")
}

export default logout;