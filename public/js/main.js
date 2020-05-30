/*
const url = "http://puzzle.mead.io/puzzle";

fetch(url).then((response) => {
    response.json().then((data) => {
        console.log(data);
    })    
})
*/

const weatherForm = document.querySelector('form');
const search = document.querySelector("input");
const resultLoading = document.getElementById("result-loading");
const resultCity = document.getElementById("result-city");
const resultLatitude = document.getElementById("result-latitude");
const resultLongitude = document.getElementById("result-longitude");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    const url = "/weather?address=" + location;
    resultLoading.innerHTML = "Loading";
    resultLoading.style.background = "yellow";
    resultLoading.style.display = "block";
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                resultLoading.innerHTML = data.error;
                resultLoading.style.background = "red";
                resultLoading.style.display = "block";
            } else {
                resultLoading.style.display = "none";

                resultCity.style.background = "aqua";
                resultCity.style.display = "block";
                resultCity.innerHTML = "City: " + data.geocode.City;

                resultLatitude.style.background = "aqua";
                resultLatitude.style.display = "block";
                resultLatitude.innerHTML = "Latitude: " + data.geocode.Latitude;

                resultLongitude.style.background = "aqua";
                resultLongitude.style.display = "block";
                resultLongitude.innerHTML = "Longitude: " + data.geocode.Longitude;
            }
        })
    });
})
