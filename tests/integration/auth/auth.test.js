const { Utente } = require ("../../../models/utente");
const request = require ("supertest"); //libreria a supporto per inviare richieste HTTP in modo automatico senza l'ausilio di tool come Postman.

describe ("Middleware per l'autorizzazione", () => {

    let token;

    beforeEach (() => {

        server = require ("../../../index");
        token = new Utente ().generaAuthToken ();

    });

    afterEach (async () => {

        server.close ();

    });

    const exec = () => {

        return request (server)
            .post ("/api/wallets")
            .set ("x-auth-token", token)
            .send ({ utente: "61d5b52730c7b16122afef87", nome: "Bitcoin", simbolo: "BTC", quantita: 10, prezzoPerUnita: 10 });

    }

    it ("Dovrebbe ritornare un errore con status code 401 se nessun JWT è fornito.", async () => {

        token = ""; 

        const risposta = await exec ();

        expect (risposta.status).toBe (401);

    });

    it ("Dovrebbe ritornare un errore con status code 400 se il JWT fornito non è valido.", async () => {

        token = "a"; 

        const risposta = await exec ();

        expect (risposta.status).toBe (400);

    });

    it ("Dovrebbe ritornare senza errori con status code 200 se il JWT fornito è valido.", async () => {

        const risposta = await exec ();

        expect (risposta.status).toBe (200);

    });

});