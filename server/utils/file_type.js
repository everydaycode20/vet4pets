const FileType = require('file-type');

/**
 * 
 * checks file mime type
 * 
 */

exports.readFileType = async function (file)  {
    try {
        const mime = await FileType.fromBuffer(file);

        return mime;
    } catch (error) {
        return error;
    }
    
}