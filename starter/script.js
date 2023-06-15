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
    #workouts=[];
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
        _newWorkout(e){
        const validinputs=(...inputs)=>
        inputs.every(inp=>Number.isFinite(inp));
        const allpostive=(...inputs)=>inputs.every(inp =>inp >0)
        {

            e.preventDefault();
    //clear the input feilds
    //get data from form
    const type=inputType.value;
    const distance=+inputDistance.value;
    const duration=+inputDuration.value;
    const{lat,lng}=this.#mapEvent.latlng;
    let workout;


    //if workout is running ,create a running object
    if(type ==='running'){
        const cadence=inputCadence.value;
        

        //check if the data is a valid one
        if(
            // !Number.isFinite(distance) ||
            // !Number.isFinite(duration) ||
            // !Number.isFinite(cadence) 
            !validinputs(duration,distance,cadence) || !allpostive(distance,duration,cadence)
        )
            return alert('inputs have to be postive numbers!');
        }

         workout=new Running([lat,lng],distance,duration,cadence);
     //if workout is cycling ,create a cycling object
     if(type ==='cycling'){
        const elevation=inputElevation.value;
        if(
            // !Number.isFinite(distance) ||
            // !Number.isFinite(duration) ||
            // !Number.isFinite(cadence) 
            !validinputs(duration,distance,elevation)|| !allpostive(distance,duration)
        )
        return alert('inputs have to be postive numbers!');
        workout=new Cycling([lat,lng],distance,duration,elevation);
    }
    inputDistance.value=inputDuration.value=inputElevation.value=inputCadence.value='';
   
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
}
const app=new App()
//display marker 
form.addEventListener('submit',function(e){
    
})

