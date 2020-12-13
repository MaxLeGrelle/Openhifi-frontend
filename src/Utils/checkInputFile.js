

/**
 * basic checking file type 
 * source : https://stackoverflow.com/questions/18299806/how-to-check-file-mime-type-with-javascript-before-upload
 * @param {*} file file to check
 * @param {*} type type = audio or image
 */
function verifyType(file, type) {
    let acceptTypes;
    if (type == "image") acceptTypes = RegExp("image/*")
    else acceptTypes = RegExp("audio/*")
    if (!acceptTypes.test(file.type)) return false;
    return verifyMIME(file, type)
    
}


/**
 * MIME type checking
 * source : https://stackoverflow.com/questions/18299806/how-to-check-file-mime-type-with-javascript-before-upload
 * @param {*} file file to check
 * @param {*} fileType fileType = image or audio
 */
function verifyMIME(file, fileType) {
    let blob = file;
    let type;
    let fileReader = new FileReader();
    fileReader.onloadend = function (e) {
        let arr = (new Uint8Array(e.target.result)).subarray(0, 4);
        let header = "";
        for (let i = 0; i < arr.length; i++) {
            header += arr[i].toString(16);
        }
        if (fileType == "image") type = imageMIMETypes(header)
        else type = audioMIMETypes(header)
    };
    fileReader.readAsArrayBuffer(blob);
    return type !== "unknown"
}

/**
 * Check the 4 first bytes of an image in order to determine which type is the file thanks to his header
 * source : https://stackoverflow.com/questions/18299806/how-to-check-file-mime-type-with-javascript-before-upload
 * @param {*} header header of the file
 */
function imageMIMETypes(header) {
    let type = "unknown";
    switch (header) {
        case "89504e47":
            type = "image/png";
            break;
        case "ffd8ffe0":
        case "ffd8ffe1":
        case "ffd8ffe2":
        case "ffd8ffe3":
        case "ffd8ffe8":
            type = "image/jpeg";
            break;
        case "00000100":
            type = "image/ico"
            break;
        default:
            type = "unknown";
            break;
    }
    return type;
}

/**
 * Check the 2/4 first bytes of an audio in order to determine which type is the file thanks to his header
 * source : https://stackoverflow.com/questions/18299806/how-to-check-file-mime-type-with-javascript-before-upload
 * @param {*} header header of the file
 */
function audioMIMETypes(header) {
    let type = "unknown";
    if (header.startsWith("fffb") 
        || header.startsWith("fff3")
        || header.startsWith("fff2")) 
            return "audio/mp3"
    switch (header) {
        case "464f524d":
            type = "audio/aif";
            break;
        case "664c6143":
            type = "audio/flac";
            break;
        case "4d546864":
            type = "audio/mid";
            break;
        case "52494646":
            type = "audio/wav"
            break;
        default:
            type = "unknown";
            break;
    }
    return type;
}

export {verifyType}