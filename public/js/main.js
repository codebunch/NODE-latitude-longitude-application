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
const result = document.getElementById("result-loc");

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;
    const url = "http://localhost:3000/weather?address=" + location;
    result.innerHTML = "Loading";
    result.style.background = "yellow";
    result.style.display = "block";
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                result.innerHTML = data.error;
                result.style.background = "red";
                result.style.display = "block";
            } else {
                result.innerHTML = data.geocode.City;
                result.style.background = "aqua";
                result.style.display = "block";
            }
        })
    });
})