const STORAGE_KEY_RECENTLY = "recently_listened";
const STORAGE_NAME = "user_connected";
const STORAGE_LIKED = "music_liked";

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


export {setUserDataStorage, removeAllDataStorage, getUserStorageData, setRecentlyStackDataStorage, getRecentlyStackStorageData,setMusicLikedDataStorage,getMusicLikedDataStorage, addNewMusicLikedStorage};
