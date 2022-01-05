const express = require ('express');
const utenti = require ("../routes/utenti");
const autenticazione = require ("../routes/autenticazione");

module.exports = function (app) {

    app.use (express.json ());
    app.use ("/api/utenti", utenti);
    app.use ("/api/autenticazione", autenticazione);

}