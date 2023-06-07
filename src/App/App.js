import 'bootstrap/dist/css/bootstrap.min.css'
// importer les scripts de bootstrap
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// importer les icones de bootstrap
import 'bootstrap-icons/font/bootstrap-icons.css'

import WeatherService from './Service/WeatherService';

const apiKey = '46649de7b444f6715a37d32d10968c50'
// on déclare notre clé d'API
// LA VOTRE !!!
class App {

    // on déclare des propriétés
    // élément du DOM
    elInputNewLon;
    elInputNewLat;
    elInputNewCity;
    // pour le rendu de la méteo
    elResultDiv;
    // pour les different services suivant la localisation
    weatherServiceFr;
    weatherServiceUk;
    weatherServiceUs;

    constructor() {
        // service pour la france 
        this.weatherServiceFr = new WeatherService(apiKey);
        // service pour la UK
        this.weatherServiceUk = new WeatherService(apiKey, {lang: 'en'});
        // service pour la US
        this.weatherServiceUs = new WeatherService(apiKey, {lang: 'en', units:'imperial'});
    }



    start() {
        console.log( 'App démarrée...');
        this.loadDom();
    }

    // méthode qui affiche le formulaire de saisie des coordonnées et ville
    loadDom() {

        // div container
        const elDivContainer = document.createElement('div');
        elDivContainer.className = 'container mt-5';

        // h1
        // <h1>Appli météo</h1>
        const elH1 = document.createElement('h1');
        elH1.textContent = 'Appli météo';
        elDivContainer.appendChild(elH1);

        // h4 latitude longitude
        // <h4 class="mt-5">Entrer les coordonnées géographiques (latitude et longitude) :</h4>
        const elH4 = document.createElement('h4');
        elH4.textContent = 'Entrer les coordonnées géographiques (latitude et longitude) :';
        elH4.className ='mt-5';
        elDivContainer.appendChild(elH4);

        // div for latitude
        // <div class="form-group"></div>
        const elDivFormGroup = document.createElement('div');
        elDivFormGroup.className = 'form-group';


        // label for latitude
        // <label for="latitude">Latitude:</label>
        const elLabelForLatitude = document.createElement('label');
        elLabelForLatitude.for = 'latitude';
        elLabelForLatitude.textContent = 'Latitude :';
        elDivFormGroup.appendChild(elLabelForLatitude);

        // input for latitude
        // <input type="text" id="latitude" class="form-control"></input>
        this.elInputNewLat = document.createElement('input');
        this.elInputNewLat.type = 'text';
        this.elInputNewLat.id = 'latitude';
        this.elInputNewLat.className = 'form-control';
        elDivFormGroup.appendChild(this.elInputNewLat);

        elDivContainer.appendChild(elDivFormGroup);

        // div for longitude
        // <div class="form-group mt-5"></div>
        const elDivFormGroup2 = document.createElement('div');
        elDivFormGroup2.className = 'form-group mt-3';

        // label for longitude
        // <label for="longitude">Longitude:</label>
        const elLabelForLongitude = document.createElement('label');
        elLabelForLongitude.for = 'longitude';
        elLabelForLongitude.textContent = 'Longitude :';
        elDivFormGroup2.appendChild(elLabelForLongitude);

        // input for longitude
        // <input type="text" id="longitude" class="form-control"></input>
        this.elInputNewLon = document.createElement('input');
        this.elInputNewLon.type = 'text';
        this.elInputNewLon.id = 'longitude';
        this.elInputNewLon.className = 'form-control';
        elDivFormGroup2.appendChild(this.elInputNewLon);

        elDivContainer.appendChild(elDivFormGroup2);

        // h4 for city
        // <h4 class="mt-5">Entrez le nom de la vile :</h4>
        const elH4ForCity = document.createElement('h4');
        elH4ForCity.textContent = 'Entrez le nom de la vile :';
        elH4ForCity.className = 'mt-5';

        // div for city
        // <div class="form-group"></div>
        const elDivFormGroup3 = document.createElement('div');
        elDivFormGroup3.className = 'form-group';
        elDivContainer.appendChild(elDivFormGroup3);

        // label for city
        // <label for="city">Ville :</label>
        const elLabelForCity = document.createElement('label');
        elLabelForCity.for = 'city';
        elLabelForCity.textContent = 'Ville :';
        elDivFormGroup3.appendChild(elLabelForCity);

        // input for city
        // <input type="text" id="city" class="form-control"></input>
        this.elInputNewCity = document.createElement('input');
        this.elInputNewCity.type = 'text';
        this.elInputNewCity.id = 'city';
        this.elInputNewCity.className = 'form-control';
        elDivFormGroup3.appendChild(this.elInputNewCity);

        // button to get weather
        // <button class="btn btn-primary my-3 form-control" onclick="getWeather()">Afficher la météo</button>
        const elButton = document.createElement('button');
        elButton.className = 'btn btn-primary my-3 form-control';
        elButton.addEventListener('click', this.getWeather.bind(this));
        elButton.textContent = 'Afficher la météo';
        elDivContainer.appendChild(elButton);

        // div for result
        // <div id="result" class="mt-3"></div>
        this.elDivResult = document.createElement('div');
        this.elDivResult.id ='result';
        this.elDivResult.className ='mt-3';
        elDivContainer.appendChild(this.elDivResult);

        // on met la div container dans le body
        document.body.appendChild(elDivContainer);
    }

    // méthode qui affiche la météo
    getWeather() {
        // on récupère les valeurs des inputs
        const newLatitude = this.elInputNewLat.value.trim();
        const newLongitude = this.elInputNewLon.value.trim();
        const newCity = this.elInputNewCity.value.trim();

        //TODO: faire appel au service pour récupérer la météo
        const newWeatherLiteral = {
            lon: newLongitude,
            lat: newLatitude,
            q: newCity
        }

        // on appelle le service 
        this.weatherServiceFr
        .getCurrent(newWeatherLiteral) 
        .then(this.handleServiceResponse.bind(this))

    }

    handleServiceResponse(serviceResponse) {
        console.log( 'service', serviceResponse);
    }

}

const app = new App();

export default app;