const { Utente } = require ("../../../models/utente");
const jwt = require ("jsonwebtoken");
const config = require ("config");
const mongoose = require ("mongoose");

describe ("user.generateAuthToken", () => {

    it ("Dovrebbe ritornare un JWT valido.", () => {

        const payload = {

            _id: new mongoose.Types.ObjectId ()

        };

        const utente = new Utente (payload);
        const token = utente.generaAuthToken ();
        const tokenDecodificato = jwt.verify (token, config.get ("jwtPrivateKey"));
        expect (tokenDecodificato).toMatchObject (payload);

    });

});