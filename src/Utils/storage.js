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
export {setUserDataStorage, removeAllDataStorage, getUserStorageData};