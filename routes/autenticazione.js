const Joi = require ("joi");
const bcrypt = require ("bcrypt");
const {Utente} = require ('../models/utente');
const express = require ("express");
const router = express.Router ();

router.post ("/", async (req, res) => {

    const { error } = valida (req.body);
    if (error) return res.status (400).send (error.details [0].message);

    let utente = await Utente.findOne ({ email: req.body.email });
    if (!utente) return res.status (400).send ("Email o password non validi.");

    const passwordValida = await bcrypt.compare (req.body.password, utente.password);
    if (!passwordValida) return res.status (400).send ("Email o password non validi.");

    const token = utente.generaAuthToken ();
    res.send (token);

});

function valida (req) {

    const schema = {

        email: Joi.string ().min (5).max (255).required ().email (),
        password: Joi.string ().min (5).max (255).required ()

    };

    return Joi.validate (req, schema);

}

module.exports = router;