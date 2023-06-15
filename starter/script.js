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
class Workout {
 date=new Date();
 id=(Date.now()+'').slice(-10) 
 constructor(coords,distance,duration){
  this.distance=distance;
  this.coords=coords;
  this.duration=duration;
 }   
}


class Running extends Workout{
    constructor(coords,distance,duration,cadence){
    super(coords,distance,duration);
    this.cadence=cadence;
    this.calPace()  
}
calPace(){
    this.pace=this.duration /this.distance;
    return this.calPace
}
}


class Cycling extends Workout{
    constructor(coords,distance,duration,elevationGain){
    super(coords,distance,duration);
    this.elevationGain=elevationGain;  
    this.calcSpeed()
}
calcSpeed(){
this.speed=this.distance/(this.duration/60)
return this.speed
}
}
const r1=new Running([23,10],5.2,24,18)
const c1=new Cycling([23,10],5.2,24,18)
console.log(c1,r1)
/////////////////////////////////////////////////////////////////////
//application architeture
class App{
    #map;
    #mapEvent;
    constructor(){
        this._getPosition();
        form.addEventListener('submit',this._newWorkout.bind(this))
        inputType.addEventListener('change',this._toggleElevationField)
    }

    _getPosition(){
        if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition (this._loadMap.bind(this),function(){
                alert('soory we can not get your location')
            })
        }



    _loadMap(position){
            const {latitude}=position.coords;
            const {longitude}=position.coords;
            const cords=[latitude,longitude]
            console.log(latitude,longitude)
            console.log(`https://www.google.pt/maps/@${latitude},${longitude}`)
        
        
            this.#map = L.map('map').setView(cords, 13);
        
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);
        //add location to map on click
        this.#map.on('click',this._showForm.bind(this))}
        
        
      _showForm(mapE){
        this.#mapEvent=mapE;
        form.classList.remove('hidden')
        inputDistance.focus()
      }
        _toggleElevationField(){
            inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
            inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
        }
        _newWorkout(e)
        {
            e.preventDefault();
            //GET DATA FROM FORM
            const type=inputType.value;
            const distance=inputDistance.value;
            const duration=inputDuration.value;

            //check if the workout is running
if(type ==='running'){
    const cadence=inputCadence.value;
}

//check if the workout is cyling 
if(type ==='cycling'){
    const cadence=inputElevation.value;
}
    //clear the input feilds
    inputDistance.value=inputDuration.value=inputElevation.value=inputCadence.value='';
    const{lat,lng}=this.#mapEvent.latlng;
L.marker([lat,lng])
.addTo(this.#map)
.bindPopup(
    L.popup({
        maxWidth:250,
        minWidth:100,
        autoClose:false,
        closeOnClick:false,
        className:'running-popup',
        
    })
    )
    .setPopupContent('workout')
    .openPopup();
    
}

}
const app=new App()
//display marker 
form.addEventListener('submit',function(e){
    
})

