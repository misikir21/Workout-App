'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
/////////////////////////////////////////////////////////////////////
//add location
let map,mapevent;

class App{
    constructor(){
        this._getposition()
    }

    _getposition(){

    }

    _loaddata(){
         
    }
}   




navigator.geolocation.getCurrentPosition(function(position){
    const {latitude}=position.coords;
    const {longitude}=position.coords;
    const cords=[latitude,longitude]
    console.log(latitude,longitude)
    console.log(`https://www.google.pt/maps/@${latitude},${longitude}`)


    const map = L.map('map').setView(cords, 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.on('click',function(mapevent){
    form.classList.remove('hidden');
    //     console.log(mapevent)
    //     const{lat,lng}=mapevent.latlng;

    //     L.marker([lat,lng]).addTo(map)
    // .bindPopup(L.popup({
    //     maxWidth:250,
    //     minWidth:100,
    //     autoClose:false,
    //     closeOnClick:false,
    //     className:'running-popup',
    // })
    // )
    // .setPopupContent('Workout')
    // .openPopup();
    })
},
function(){
        alert('soory we can not get your location')
    }
)

//get data from form

const type=inputType.value;
const distance=+inputDistance.value;
const duration=+inputDuration.value;



//check if data is valid




//if workout running ,create a running object
if(type ==='running'){
    const cadence=+inputCadence.value;
}





//if workout cycling ,create a cycling object
if(type ==='cycling'){
    const cadence=+inputElevation.value;
}