const { Wallet, valida } = require ("../models/wallet");
const express = require ("express");
const auth = require ("../middleware/auth");
const router = express.Router ();

router.post ("/", auth, async (req, res) => {

    const { error } = valida (req.body);
    if (error) return res.status (400).send (error.details [0].message);

    let wallet = await Wallet.findOne ({ utente: req.body.utente });
    if (!wallet) wallet = new Wallet ({ utente: req.body.utente });

    for (let i = 0; i < wallet.assets.length; i++) {

        if (wallet.assets [i].simbolo == req.body.simbolo) return res.status (403).send ("L'utente selezionato ha già questa criptovaluta in portafoglio.");

    }

    wallet.assets.push ({ nome: req.body.nome, simbolo: req.body.simbolo, quantita: req.body.quantita, prezzoPerUnita: req.body.prezzoPerUnita });

    await wallet.save ();

    res.send (req.body);

});

router.get ("/:id", auth, async (req, res) => {

    const wallet = await Wallet.findOne ({ utente: req.params.id });
    if (!wallet) return res.status (404).send ("Il portafoglio relativo all'ID desiderato non esiste.");

    res.send (wallet.assets);

});

router.delete ("/:id/:simbolo", auth, async (req, res) => {

    const wallet = await Wallet.findOne ({ utente: req.params.id });
    if (!wallet) return res.status (404).send ("Il portafoglio relativo all'ID desiderato non esiste.");

    let assets = [];

    for (let i = 0; i < wallet.assets.length; i++) {

        if (wallet.assets [i].simbolo != req.params.simbolo) {

            assets [i] = wallet.assets [i];

        }

    }

    wallet.assets = assets;

    await wallet.save ();

    res.send (wallet.assets);

});

module.exports = router;