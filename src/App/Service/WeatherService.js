import HttpUtils from '../Tools/HttpUtils';
import ServiceResponse from './ServiceResponse';


class WeatherService {
    // on va déclarer les propriétés
    apiKey;
    options;

    constructor(apiKey, userOptions = {}) {
        this.apiKey = apiKey;
        // option par défaut à chaque appels de service
        this.options = {
            units: 'metric',
            lang: 'fr',
        }

        // on fusionne les options par défaut avec les options de l'utilisateur
        Object.assign(this.options, {appid : apiKey}, userOptions);
    }

    getCurrent(coords) {
        const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
        // on va fusionner les options avec les coordonées pour construire l'url
        Object.assign(this.options, coords);

        // on va construire l'url
        const url = HttpUtils.buildUrl(baseUrl, this.options);
        // this.options = {
            // appid : '
            // units : 'metric'
            // lang : 'fr';
            // lat : 48.321
            // lon: '2.5414
            // q: 'Paris'
        // }

        // on va faire un appel à l'API
        return new Promise(resolve => {
            fetch(url)
            .then(response => response.json())
            .then(data => {
                // on check le code de retour de l'API
                // code 400 = erreur de requête
                // code 404 = ville non trouvée
                if (data.cod === 400 || data.cod === 404) {
                    resolve(new ServiceResponse(false, data.message, null));
                } 
                resolve(new ServiceResponse(true, null, data));
            })
            // on catch les erreurs de l'appel
            .catch(error => {
                resolve(new ServiceResponse(false, error.message, null));
            });
        })
    }
}

export default WeatherService;