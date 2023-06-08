const iconCDN = 'https://openweathermap.org/img/wn/';

class Wind {
    // properties
    speed;
    deg;
    gust;

    constructor(windLiteral) {
        this.speed = windLiteral.speed;
        this.deg = windLiteral.deg;
        this.gust = windLiteral.gust;
    }

    getDirections(degrees) {
        const directions = [ 'N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', 'N']
        const index = Math.round(degrees / 22.5);
        return directions[index];
    }

    getDom() {
        const wind = document.createElement('div');
        wind.innerHTML = `
        <div class="d-flex flex-column">
            <div class="d-flex align-items-center">
                <i class="bi bi-speedometer mx-2"></i>
                <span> Vitesse : ${Math.floor(this.speed * 3.6)} km/h</span>
            </div>
            <div class="d-flex align-items-center">
                <i class="bi bi-compass mx-2"></i>
                <span> Direction : ${this.getDirections(this.deg)}</span>
            </div>
        </div>
        `

        // si il y a des gust on les affiche
        if (this.gust) {
            const gust = document.createElement('div');
            gust.innerHTML = `
            <div class="d-flex flex-column">
                <div class="d-flex align-items-center">
                    <i class="bi bi-wind mx-2"></i>
                    <span> Rafales : ${Math.floor(this.gust * 3.6)} km/h</span>
                </div>
            </div>`
            
            wind.append(gust);
        }
        return wind;  
    }
}
export default Wind;