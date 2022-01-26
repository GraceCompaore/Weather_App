
const daysOfWeek = ["lundi", "Mardi", "Mercredi", "Jeudi","Vendredi","Samedi", "Dimanche"]

let today = new Date();
let options = {weekday: 'long'};
let currentDay = today.toLocaleDateString('fr-FR', options);
//console.log(currentDay, today);

currentDay = currentDay.charAt(0).toUpperCase() + currentDay.slice(1);

let tabDaysOrdored = daysOfWeek.slice(daysOfWeek.indexOf(currentDay)).concat(daysOfWeek.slice(0, daysOfWeek.indexOf(currentDay)));
 // console.log(tabDaysOrdored);

 export default tabDaysOrdored;