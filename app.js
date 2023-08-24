"use strict"

// const filenames = ["Data.png", "Creaticle expired.png", "Contest desc section.png"];


// const multipleImages = async (filenames) => {
//     for (let filename of filenames) {
        
//         const response = await fetch(filename);
//         const blob = await response.blob();
//         // const imgUrl = URL.createObjectURL(blob);
//         document.querySelector("#pic").src = URL.createObjectURL(blob);
//         // imgEl.src = imgUrl;
//         // console.log(imgEl)
//     }
// }
// multipleImages(filenames)
// .then(response => {console.log("nice")})
// .catch(error => {console.error(error)})

const timeArr = [];
const hourlyTemp = [];
// let latitude = "";
// let longitude = 0;
let timeZone = 0;
let weatherData;



const getWeather = async function () {
    try {
        let response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=6.4541&longitude=3.3947&hourly=temperature_2m");
        let data = await response.json();
        return data
        weatherData = data;
        console.log(data);
        const {latitude, longitude, time} = data;
        console.log(longitude);
        console.log()
        // console.log(data.longitude);
        timeArr.push(data.hourly.time)
        hourlyTemp.push(data.hourly.temperature_2m)
        // latitude = data.latitude;
        // longitude = data.longitude;
        // timeZone = data.timezone;
    } catch (error) {
        console.log(error);
    }
    // return data
}



getWeather()
    .then(data => {
        weatherData = data;
        console.log(data);
        // ... process the data further
    })
    .catch(error => {
        // Handle errors here
        console.log(error);
    });
console.log(weatherData)
// console.log(longitude)
// console.log(latitude)
// console.log(timeZone);

// Example API date string: "2023-08-23T14:30:00Z"


// fetch("https://api.open-meteo.com/v1/forecast?latitude=6.4541&longitude=3.3947&hourly=temperature_2m")
// .then((response) => {return response.json()})
// .then((data) => {
//     const timeArr = data.hourly.time;
//     timeArr.forEach((time) => {
//         // console.log(time);
//        console.log(timeConverter(time))
        
//     })
//     // console.log(timeArr)
// });

// const humanReadableDate = apiDate.toLocaleDateString('en-US', options)

// function timeConverter(timeStr) {
//     // const humanReadableDate;
//     const apiDate = new Date(timeStr);
//     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZoneName: 'short' };
//     const humanReadableDate = apiDate.toLocaleDateString('en-US', options);
//     console.log(humanReadableDate);
//     return humanReadableDate
// }

// console.log(humanReadableDate)

// const apiDateString = "2023-08-23T14:30:00Z";


// console.log(humanReadableDate);
//     .catch((errro) => {console.log("Error: Something happened" + error)})