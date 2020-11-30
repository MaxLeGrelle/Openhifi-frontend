const STORAGE_NAME = "user_connected";

function setUserDataStorage(userData){
    localStorage.setItem(STORAGE_NAME, JSON.stringify(userData));

}
export default setUserDataStorage;