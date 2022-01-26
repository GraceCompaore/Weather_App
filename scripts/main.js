import tabDaysOrdored from "./utilities/timeManagement.js";


const keyAPI = '32c031b8cd8765bb691ffbb251522776'; 
let resultsAPI; 
const time = document.querySelector('.time');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const hour= document.querySelectorAll('.hour-forecasting-name');
const tempForHour = document.querySelectorAll('.hour-forecasting-value')
const dayDiv = document.querySelectorAll('.day-forecasting-name');
const tempDayDiv = document.querySelectorAll('.day-forecasting-temp');
const imgIcon = document.querySelector('.logo-weather');
const loadingContainer = document.querySelector('.overlay-icon-loading');

if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position =>{
        //console.log(position);
        let long = position.coords.longitude;
        let lat = position.coords.latitude;
        
        callAPI(long, lat);

    }, ()=> {
        alert(`Vous avez refusé la géolocalisation, donc l'application ne peut pas foncitonner.Veuillez l'activer.`)
    })
}

function callAPI(long, lat){
   
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=minutely&units=metric&lang=fr&appid=${keyAPI}`)
    .then((response)=> 
    {
        return response.json();
    })
    .then((data) =>
    {
        console.log(data)
        resultsAPI=data;
        time.innerText = resultsAPI.current.weather[0].description;
        temperature.innerText = `${Math.trunc(resultsAPI.current.temp)}°`;
        localisation.innerText = resultsAPI.timezone;

        //les heures par intervalle de 3 et les températures

        let currentHour = new Date().getHours();

        for (let i = 0; i<hour.length; i++){
            let hourIncr = currentHour + i*3;

            if(hourIncr >24){
                hour[i].innerText = `${hourIncr - 24}h`;
            }
            else if( hourIncr === 24){
                hour[i].innerText = "00 h"

            }
            else {
                hour[i].innerText = `${hourIncr} h`
            }
        }

        // les températures par intervalle de 3h

        for (let j=0; j< tempForHour.length; j++){
            tempForHour[j].innerText = `${Math.trunc(resultsAPI.hourly[j*3].temp)}°`
        }

        // les 3 premières lettres du jour

        for (let k=0; k< tabDaysOrdored.length; k++){
dayDiv[k].innerText = tabDaysOrdored[k].slice(0,3);
        }
        // temperature pour chaque jour

    for(let m = 0; m<7 ; m++){
        tempDayDiv[m].innerText = `${Math.trunc(resultsAPI.daily[m + 1].temp.day)}°`
    }

    // Icone dynamique 
    if(currentHour >= 6 &&  currentHour < 21) {
        imgIcon.src = `ressources/day/${resultsAPI.current.weather[0].icon}.svg`
    } else  {
       imgIcon.src = `ressources/night/${resultsAPI.current.weather[0].icon}.svg`
    }
    loadingContainer.classList.add('disparition');

    })
    
        
}
