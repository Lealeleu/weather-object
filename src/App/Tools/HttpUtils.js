// cette classe va contenir des méthodes utilitaires pour gérer les requêtes http
class HttpUtils {
    // créer une méthode qui permet de construire une URL à partir d'une URL de base et de paramètres

    static buildUrl(baseUrl, params = {}) {
        // baseUrl = "http://localhost:3000/api"
        // params = {
            // nom: 'toto",
            // age: 25,
            // ville: 'Paris'
        // }
        // => http://localhost:3000/api?nom=toto&age=25&ville=Paris
        // on récupère les clés de l'object params
        let paramsKeys = Object.keys(params);
        // paramsKeys = ['nom', 'age', 'ville']

        // si je n'ai pas de paramètres, je retourne l'url de base
        if(paramsKeys.length <= 0) return baseUrl;

        // je crée un tableau quiva contenir les paramètres
        let paramsArray = [];

        // je parcours les clés de l'object params dans une boucle
        for (let key in params) {
            // pour trouver la valeur d'une propriétés on peut: 
            // 1 - si on connait le nom de la clé: ojt.maClé
            // 2 - si on connait le nom de la clé est une chaine : obj['maClé]
            let pairedParam = `${key}=${params[key]}`;
            // pairedParam = 'nom=toto'
            paramsArray.push(pairedParam);
            // paramsArray = ['nom=toto' 'age=25' 'ville=Paris']
        }
        return `${baseUrl}?${paramsArray.join('&')}`;
        // return 'http://localhost:3000/api?nom=toto&age=25&ville=Paris'
    }
}

export default HttpUtils;