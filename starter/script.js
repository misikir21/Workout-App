'use strict';

// prettier-ignore


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
 _setDescription(){
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
        months[this.date.getMonth()]
      } ${this.date.getDate()}`;
}

}

class Running extends Workout{
    type='running'
    constructor(coords,distance,duration,cadence){
    super(coords,distance,duration);
    this.cadence=cadence;
    this.calPace()
    this._setDescription()
}
calPace(){
    this.pace=this.duration /this.distance;
    return this.calPace
}
}


class Cycling extends Workout{
    type ='cycling'
    constructor(coords,distance,duration,elevationGain){
    super(coords,distance,duration);
    this.elevationGain=elevationGain;  
    this.calcSpeed()
    this._setDescription()

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
    #zoomlevel=13;
    #workouts=[];
    constructor(){
        this._getPosition();
        form.addEventListener('submit',this._newWorkout.bind(this))
        inputType.addEventListener('change',this._toggleElevationField)
        containerWorkouts.addEventListener('click',this._movetopopup.bind(this));

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
        
        
            this.#map = L.map('map').setView(cords, this.#zoomlevel);
        
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

    _hideform(){
        inputDistance.value=inputDuration.value=inputElevation.value=inputCadence.value='';
        form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);

    }
        _toggleElevationField(){
inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
            inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
        }
        _newWorkout(e){
            const validInputs = (...inputs) =>
            inputs.every(inp => Number.isFinite(inp));
            const allPositive = (...inputs) => inputs.every(inp => inp > 0);
            e.preventDefault();
            //GET DATA FROM FORM
            const type=inputType.value;
            const distance=+inputDistance.value;
            const duration=+inputDuration.value;
            const{lat,lng}=this.#mapEvent.latlng;
            let workout;

            //check if the workout is running
if(type ==='running'){
    const cadence=+inputCadence.value;
    if(
    !validInputs(distance,duration,cadence) ||
    !allPositive(distance,duration,cadence))
    return alert("inputs should have to be a postive numbers")
     workout=new Running([lat,lng],distance,duration,cadence);
}

//check if the workout is cyling 
if (type === 'cycling') {
    const elevation = +inputElevation.value;

    if (
      !validInputs(distance, duration, elevation) ||
      !allPositive(distance, duration)
    )
      return alert('Inputs have to be positive numbers!');

    workout = new Cycling([lat, lng], distance, duration, elevation);
  }

//add newwork out to workouts array
this.#workouts.push(workout);
console.log(workout)

this._renderworkoutmarker(workout)
    //clear the input feilds


    //render workout on sidebar
    this._renderworkout(workout);
    this._hideform();
}
_renderworkoutmarker(workout){
    L.marker(workout.coords)
.addTo(this.#map)
.bindPopup(
    L.popup({
        maxWidth:250,
        minWidth:100,
        autoClose:false,
        closeOnClick:false,
        className:`${workout.type}-popup`,
        
    })
    )
    .setPopupContent(`${workout.type ==='running' ?'🏃‍♂️':'🚴‍♀️'} ${workout.description}`)
    .openPopup();
    
}
_renderworkout(workout){
    let html=`<li class="workout workout--${workout.type}" data-id="${workout.id}">
    <h2 class="workout__title">${workout.description}</h2>
    <div class="workout__details">
      <span class="workout__icon">${workout.type ==='running' ?'🏃‍♂️':'🚴‍♀️'}</span>
      <span class="workout__value">${workout.distance}</span>
      <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duration}</span>
      <span class="workout__unit">min</span>
    </div>`

if (workout.type === 'running')
html += `
  <div class="workout__details">
    <span class="workout__icon">⚡️</span>
    <span class="workout__value">${workout.pace.toFixed(1)}</span>
    <span class="workout__unit">min/km</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">🦶🏼</span>
    <span class="workout__value">${workout.cadence}</span>
    <span class="workout__unit">spm</span>
  </div>
</li>
`;

if (workout.type === 'cycling')
html += `
  <div class="workout__details">
    <span class="workout__icon">⚡️</span>
    <span class="workout__value">${workout.speed.toFixed(1)}</span>
    <span class="workout__unit">km/h</span>
  </div>
  <div class="workout__details">
    <span class="workout__icon">⛰</span>
    <span class="workout__value">${workout.elevationGain}</span>
    <span class="workout__unit">m</span>
  </div>
</li>
`;

form.insertAdjacentHTML('afterend', html);
//display marker 
}
_movetopopup(e)
{
const workoute1=e.target.closest('.workout');
console.log(workoute1)
if(!workoute1) return;
const workout=this.#workouts.find(work =>work.id ===workoute1.dataset.id);
console.log(workout)
this.#map.setView(workout.coords,this.#zoomlevel,{
  animate:true,
  pan:
  {
    duration:1
  }
})
}
}

 
const app=new App()