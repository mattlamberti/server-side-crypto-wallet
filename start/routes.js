const express = require ("express");
const utenti = require ("../routes/utenti");
const autenticazione = require ("../routes/autenticazione");
const wallets = require ("../routes/wallets");

module.exports = function (app) {

    app.use (express.json ());
    app.use ("/api/utenti", utenti);
    app.use ("/api/autenticazione", autenticazione);
    app.use ("/api/wallets", wallets);

}