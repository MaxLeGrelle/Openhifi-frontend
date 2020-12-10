const STORAGE_KEY_RECENTLY = "recently_listened";
const STORAGE_NAME = "user_connected";

function setUserDataStorage(userData){
    localStorage.setItem(STORAGE_NAME, JSON.stringify(userData));
}

function removeAllDataStorage() {
    localStorage.removeItem(STORAGE_NAME);
}

function getUserStorageData ()  {
    const user = localStorage.getItem(STORAGE_NAME);
    if (!user) return;
    return JSON.parse(user);
};

function setRecentlyStackDataStorage(albumData){
    localStorage.setItem(STORAGE_KEY_RECENTLY, JSON.stringify(albumData));
}

function getRecentlyStackStorageData(){
    const stackAlbumsRecently = localStorage.getItem(STORAGE_KEY_RECENTLY);
    if (!stackAlbumsRecently) return;
    return JSON.parse(stackAlbumsRecently);
}



export {setUserDataStorage, removeAllDataStorage, getUserStorageData, setRecentlyStackDataStorage, getRecentlyStackStorageData};