import Main from "./Main";
import Sun from "./Sun";
import Weather from "./Weather";
import Wind from "./Wind";

const inconCDN = 'httpq://openweathermap.org/img/wn/';

class MainWeather {
    // déclarer mes propriétés
    clouds;
    country;
    dt;
    locationName;
    main;
    rain;
    snow;
    sun;
    visibility;
    weather;
    wind;

    constructor(MainWeatherLiteral) {
        this.clouds = MainWeatherLiteral.clouds.all;
        this.country = MainWeatherLiteral.sys.country;
        this.dt = MainWeatherLiteral.dt;
        this.locationName = MainWeatherLiteral.name;
        this.main = new Main(MainWeatherLiteral.main);
        // si j'ai des données de pluie je les récupère
        if(MainWeatherLiteral.hasOwnProperty('rain')) {
            this.rain = MainWeatherLiteral.rain ['1h'];
        }

        // si j'ai des données de neige je les récupère
        if(MainWeatherLiteral.hasOwnProperty('snow')) {
            this.snow = MainWeatherLiteral.snow ['1h'];
        }

        this.sun = new Sun ({
            sunset: MainWeatherLiteral.sys.sunset,
            sunrise: MainWeatherLiteral.sys.sunrise
        })

        // équivalent
        // this.sun = new Sun (mainWeatherLiteral.sys)
        this.visibility = MainWeatherLiteral.visibility;

        this.weather = new Weather(MainWeatherLiteral.weather[0]);
    
        this.wind = new Wind (MainWeatherLiteral.wind);



    }

    getDom() {
        const result = document.getElementById('result');

        // créer les éléments pour les onglets
        const tab1 = document.createElement('div');
        tab1.className = "tab-pane fade show active";
        tab1.id = "tab1";
        tab1.setAttribute('role', 'tabpanel');
        tab1.setAttribute('aria-labelledby', 'tab1-tab');
        tab1.innerHTML = `
            <h5 class="card-title">Information générales</h5>
          
           
            <div class="d-flex md-6">
                <p class="card-title">${this.locationName}</p>
                <p class="card-text ms-2 color_country">${this.country}</p>
            </div>
        `;

        tab1.append(this.weather.getDom());



        // créer les éléments pour les onglets
        const tab2 = document.createElement('div');
        tab2.className = "tab-pane fade";
        tab2.id = "tab2";
        tab2.setAttribute('role', 'tabpanel');
        tab2.setAttribute('aria-labelledby', 'tab2-tab');
        tab2.innerHTML = `
            <h5 class="card-title">Températures</h5>
        `;
        
        tab2.append(this.main.getDom());


        const tab3 = document.createElement('div');
        tab3.className = "tab-pane fade";
        tab3.id = "tab3";
        tab3.setAttribute('role', 'tabpanel');
        tab3.setAttribute('aria-labelledby', 'tab3-tab');
        tab3.innerHTML = `
            <h5 class="card-title">Informations vent</h5>
        `;
        
        tab3.append(this.wind.getDom());


        const tab4 = document.createElement('div');
        tab4.className = "tab-pane fade";
        tab4.id = "tab4";
        tab4.setAttribute('role', 'tabpanel');
        tab4.setAttribute('aria-labelledby', 'tab4-tab');
        tab4.innerHTML = `
            <h5 class="card-title">Ensoleillement</h5>
        `;
        
        tab4.append(this.sun.getDom());

        // créer l'élément pour la liste des onglets
        const tabList = document.createElement('ul');
        tabList.className = "nav nav-tabs card-header-tabs ms-0";
        tabList.id = "myTabs";
        tabList.setAttribute('role', 'tablist');
        tabList.innerHTML = `
            <li class="nav-item" role="présentation">
                <a class="nav-link active" id="tab1-tab" data-bs-toggle="tab" href="#tab1" role="tab" aria-controls="tab1" aria-selected="true">Général</a>
            </li>

            <li class="nav-item" role="présentation">
                <a class="nav-link" id="tab2-tab" data-bs-toggle="tab" href="#tab2" role="tab" aria-controls="tab2" aria-selected="false">Températures</a>
            </li>

            <li class="nav-item" role="présentation">
                <a class="nav-link" id="tab3-tab" data-bs-toggle="tab" href="#tab3" role="tab" aria-controls="tab3" aria-selected="false">Vent</a>
            </li>

            <li class="nav-item" role="présentation">
                <a class="nav-link" id="tab4-tab" data-bs-toggle="tab" href="#tab4" role="tab" aria-controls="tab4" aria-selected="false">Soleil</a>
            </li>
        `;

        // créer l'élément pour le contenu de la carte
        const cardBody = document.createElement('div');
        cardBody.className = "card-body";
        cardBody.innerHTML = `
            <div class="tab-content" id="myTabContent">
                ${tab1.outerHTML}
                ${tab2.outerHTML}
                ${tab3.outerHTML}
                ${tab4.outerHTML}
            </div>
        `;

        // créer l'élément pour la carte
        const card = document.createElement('div');
        card.className = "card";
        card.append(tabList, cardBody);

        // créer l'élément pour le conteneur de la carte
        const cardContainer = document.createElement('div');
        cardContainer.className = "card-container mt-4";
        cardContainer.append(card);
    
        result.innerHTML = '';
        result.appendChild(cardContainer);
        return cardContainer;
    }
}

export default MainWeather;