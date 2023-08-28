"use strict"

const timeEl = document.querySelector("#time");
const tempEl = document.querySelector("#day_temperature");
let latEl = document.querySelector("#lat");
let lonEl = document.querySelector("#lon");

const searchBarEl = document.querySelector("#search_bar");
const searchSubmitBtnEl = document.querySelector("#search_submit_btn");




const todaysDate = new Date();
const currentHour = todaysDate.getHours();
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';
 

// gets weather information and updates user interface

const getWeather = async function (coordinates) {
    const queryParams = new URLSearchParams({
        latitude: coordinates.lat,
        longitude: coordinates.lon,
        hourly: 'temperature_2m',
        forecast_days: 1
    });

    const url = `${BASE_URL}?${queryParams}`;

    try {
        // fetch data from API
        const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
        const data = await response.json();

        const temperature = data.hourly.temperature_2m;
        
        // checks if current time in hours is equak to its index and sets currentHour to time element in the UI. Des the same for the temperature. This works because both time and temperature from API have the same indexes in their respective arrays.
        temperature.find((temp, index) => {
            if (currentHour === index) {
                currentHour < 11 ? timeEl.innerText = `Current time: ${currentHour}:00am` : timeEl.innerText = `Current time: ${currentHour}:00pm`;
                
                tempEl.innerText = `Current temperature: ${temp}${data.hourly_units.temperature_2m}`;
            } else {
                return 0
            }
        })

        latEl.innerText = `Latitude: ${data.latitude}`;
        lonEl.innerText = `Longitude: ${data.longitude}`;

        // sets map to location from API
        let map = L.map('map').setView([data.latitude, data.longitude], 8);

        // Uses OpenStreetMap tiles
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
        }).addTo(map);

        // sets initial marker to 0, then sets it to latitude and longitude received from API
        let marker = L.marker([0, 0]).addTo(map);
        marker.setLatLng([data.latitude, data.longitude]);
    } catch (error) {
        console.log(error);
    }
}


// converts location string from user to coordinates using geocode and then calls getWeather function

const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';
const USER_AGENT = 'SnowWeatherApp'; 

async function getCoordinatesFromLocation(location) {
    const queryParams = new URLSearchParams({
        q: location,
        format: 'json'
    });

    const url = `${NOMINATIM_API_URL}?${queryParams}`;

    try {
        const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } });
        if (response.ok) {
            const data = await response.json();
            if (data.length > 0) {
                const coordinates = {
                    lat: parseFloat(data[0].lat),
                    lon: parseFloat(data[0].lon)
                };
                console.log(coordinates)
                return coordinates;
            }
        }
        throw new Error('Unable to geocode location');
    } catch (error) {
        console.error('Error geocoding location:', error);
        return null;
    }
}


// gets location from user input and calls getCoordinatesFromLocation function
const getLocations = async (e) => {
    e.preventDefault();
    const userLocationStr = searchBarEl.value.toLowerCase();
    console.log(userLocationStr);
    // console.log(userLocationStr);
    const coordinates = await getCoordinatesFromLocation(userLocationStr);
    // console.log(coordinates);
    
    if (coordinates) {
        getWeather(coordinates);
        const latitude = coordinates.lat;
        const longitude = coordinates.lon;
    } else {
        console.log('Coordinates not available');
    }
}

searchSubmitBtnEl.addEventListener("click", getLocations);