const bcrypt = require ("bcrypt");
const { Utente, valida } = require ("../models/utente");
const express = require ("express");
const router = express.Router ();

router.post ("/", async (req, res) => {

    const { error } = valida (req.body);
    if (error) return res.status (400).send (error.details [0].message);

    let utente = await Utente.findOne ({ email: req.body.email });
    if (utente) return res.status (400).send ("Utente già registrato.");

    utente = new Utente ({ nome: req.body.nome, email: req.body.email, password: req.body.password });
    const sale = await bcrypt.genSalt (10);
    utente.password = await bcrypt.hash (utente.password, sale);
    await utente.save ();

    const token = utente.generaAuthToken ();
    res.header ("x-auth-token", token).send ({ _id: utente._id, nome: utente.nome, email: utente.email });

});

module.exports = router;