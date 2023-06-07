class ServiceResponse{
    ok; // boolean => renvoi true si la réponse est "OK"
    error; // si ok est false, renvoi un object error
    data; // si ok est true, renvoi un object data (la réponse de l'API)

    constructor(ok, error, data){
        this.ok = ok;
        this.error = error;
        this.data = data;
    }
}

export default ServiceResponse;