/* 
 * WeatherStack API calls
 */

const request = require('request');

const weatherstack = ({latitude, longitude} = {}, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=9055feb066d6dda0ba96f1984e1eab2a&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude);
    //console.log("url weatherstack: " + url);
    request({ url, json: true }, (error, {body}) => { 
        if (error) {
            callback("Problem connecting to Weather Service API", undefined);
        } else if (body.error) {
            const msg = "Error Message from  Weather API: " + body.error;
            callback(msg, undefined);
        } else {
            const currentWeather = body.current;
            const data = {
                city: body.location.name,
                temperature: currentWeather.temperature,
                observation_time: currentWeather.observation_time
            }
            callback(undefined, data);
        }
    })

}

module.exports = weatherstack; 

/*
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNote: listNote,
    readNote: readNote
}*/