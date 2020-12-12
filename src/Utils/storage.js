const STORAGE_KEY_RECENTLY = "recently_listened";
const STORAGE_NAME = "user_connected";
const STORAGE_LIKED = "music_liked";

function setUserDataStorage(userData){
    localStorage.setItem(STORAGE_NAME, JSON.stringify(userData));
}

function removeAllDataStorage() {
    localStorage.removeItem(STORAGE_NAME);
    localStorage.removeItem(STORAGE_LIKED);
    localStorage.removeItem(STORAGE_KEY_RECENTLY);
}

function getUserStorageData ()  {
    const user = localStorage.getItem(STORAGE_NAME);
    if (!user) return;
    return JSON.parse(user);
};

function setRecentlyDataStorage(albumId){
    localStorage.setItem(STORAGE_KEY_RECENTLY, JSON.stringify(albumId));
}

function getRecentlyDataStorage(){
    const recentlyLocalStorage = localStorage.getItem(STORAGE_KEY_RECENTLY);
    if (!recentlyLocalStorage) return;
    return JSON.parse(recentlyLocalStorage);
}

function addAlbumToRecentlyDataStorage(albumId){
    let recentlyLocalStorage = getRecentlyDataStorage()
    if (recentlyLocalStorage.includes(albumId)) {
        const index = recentlyLocalStorage.findIndex((id) => id == albumId)
        recentlyLocalStorage.splice(index, 1)
    }else if (recentlyLocalStorage.length == 8) recentlyLocalStorage.pop()
    recentlyLocalStorage.unshift(albumId)
    setRecentlyDataStorage(recentlyLocalStorage)
}

function setMusicLikedDataStorage(musicData){
    localStorage.setItem(STORAGE_LIKED, JSON.stringify(musicData));
}
function getMusicLikedDataStorage(){
    const musics = localStorage.getItem(STORAGE_LIKED);
    if(!musics) return;
    return JSON.parse(musics) 
}
function addNewMusicLikedStorage(musicLiked){
    
    let tab = getMusicLikedDataStorage()
    console.log(tab)
    if(tab.includes(musicLiked.toString())){
        tab = tab.filter(item => item !== musicLiked.toString())
    }
    else{
        tab.push(musicLiked)
    }
    
    setMusicLikedDataStorage(tab)
    console.log(musicLiked)
}


export {setUserDataStorage, removeAllDataStorage, getUserStorageData, setRecentlyDataStorage, getRecentlyDataStorage, addAlbumToRecentlyDataStorage,setMusicLikedDataStorage,getMusicLikedDataStorage, addNewMusicLikedStorage};
