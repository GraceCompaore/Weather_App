
const keyAPI = '32c031b8cd8765bb691ffbb251522776'; 
let resultsAPI; 
const time = document.querySelector('.time');
const temperature = document.querySelector('.temperature');
const localisation = document.querySelector('.localisation');
const hour= document.querySelectorAll('.hour-forecasting-name');
const tempForHour = document.querySelectorAll('.hour-forecasting-value')


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


    })
        
}
