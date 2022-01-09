const express = require ("express");
const app = express ();

require ("./start/db") ();
require ("./start/config") ();
require ("./start/routes") (app);

const porta = process.env.PORT || 3000;
const server = app.listen (porta, () => console.log (`Server in ascolto sulla porta ${porta}...`));

module.exports = server; //aggiunta questa linea di codice in quanto l'integration test per testare il middleware di autorizzazione necessita di effettuare richieste HTTP.