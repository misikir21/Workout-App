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
let map,mapEvent;
class App{
    #map;
    #mapEvent;
    constructor(){
        this._getPosition();
        form.addEventListener('submit',this._newWorkout.bind(this))
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
        // _toggleElevationField(){}
        _newWorkout(e)
        {
            e.preventDefault();
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

inputType.addEventListener('change',function(){
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
})