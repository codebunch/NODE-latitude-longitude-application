/* 
 * Map BOX API calls
 */

const request = require('request');

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoic2F0aGlzaHZlbCIsImEiOiJja2FxNnZ1MTgybWY5MnRzMDFtZzFjMjhxIn0.HisoApwWHfwDuJWUFZiEdA&limit=1";
    //console.log("url mapbox: " + url);
    request({ url, json: true }, (error, {body}) => { 
        if (error) {
            callback("Problem connecting to Map BOX API", undefined);
        } else if (body.message) {
            const msg = "Error message from API: " + body.message;
            callback(msg, undefined);
        } else {
            const data = {
                city: body.features[0].text,
                latitude: body.features[0].bbox[1],
                longitude: body.features[0].bbox[0]
            }
            callback(undefined, data);
        }
    })

}

module.exports = geocode; 

/*
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}*/