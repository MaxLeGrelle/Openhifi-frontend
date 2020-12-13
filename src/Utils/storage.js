const STORAGE_KEY_RECENTLY = "recently_listened";
const STORAGE_NAME = "user_connected";
const STORAGE_LIKED = "music_liked";

/**
 * Set the user's data in the local storage when he's logged on
 * @param {*} userData data of the user
 */
function setUserDataStorage(userData){
    localStorage.setItem(STORAGE_NAME, JSON.stringify(userData));
}

/**
 * Remove all the content in the local storage
 */
function removeAllDataStorage() {
    localStorage.removeItem(STORAGE_NAME);
    localStorage.removeItem(STORAGE_LIKED);
    localStorage.removeItem(STORAGE_KEY_RECENTLY);
}

/**
 * Retrieve user's data from the storage
 */
function getUserStorageData ()  {
    const user = localStorage.getItem(STORAGE_NAME);
    if (!user) return;
    return JSON.parse(user);
};


/**
 * Set the recently listened album's data in the local storage
 * @param {*} albumId albumId
 */
function setRecentlyDataStorage(albumId){
    localStorage.setItem(STORAGE_KEY_RECENTLY, JSON.stringify(albumId));
}

/**
 * Retrieve recently listened albums from local storage
 */
function getRecentlyDataStorage(){
    const recentlyLocalStorage = localStorage.getItem(STORAGE_KEY_RECENTLY);
    if (!recentlyLocalStorage) return;
    return JSON.parse(recentlyLocalStorage);
}

/**
 * add the album's id in the local storage. It will contains only 8 id and it works as a file (FIFO)
 * @param {*} albumId album's id
 */
function addAlbumToRecentlyDataStorage(albumId){
    let recentlyLocalStorage = getRecentlyDataStorage()
    if (recentlyLocalStorage.includes(albumId)) {
        const index = recentlyLocalStorage.findIndex((id) => id == albumId)
        recentlyLocalStorage.splice(index, 1)
    }else if (recentlyLocalStorage.length == 8) recentlyLocalStorage.pop()
    recentlyLocalStorage.unshift(albumId)
    setRecentlyDataStorage(recentlyLocalStorage)
}

/**
 * Set the musics liked id in the local storage
 * @param {*} musicId music's id
 */
function setMusicLikedDataStorage(musicId){
    localStorage.setItem(STORAGE_LIKED, JSON.stringify(musicId));
}

/**
 * Retrieve the list of musics liked from the local storage
 */
function getMusicLikedDataStorage(){
    const musics = localStorage.getItem(STORAGE_LIKED);
    if(!musics) return;
    return JSON.parse(musics) 
}

/**
 * Add a music's id in the local storage
 * @param {*} musicId music's id 
 */
function addNewMusicLikedStorage(musicId){
    let tab = getMusicLikedDataStorage()
    if(tab.includes(musicId.toString())){
        tab = tab.filter(item => item !== musicId.toString())
    }
    else{
        tab.push(musicId)
    }
    setMusicLikedDataStorage(tab)
}


export {setUserDataStorage, removeAllDataStorage, getUserStorageData, setRecentlyDataStorage, getRecentlyDataStorage, addAlbumToRecentlyDataStorage,setMusicLikedDataStorage,getMusicLikedDataStorage, addNewMusicLikedStorage};
