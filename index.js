const express = require ("express");
const app = express ();

require ("./start/db") ();
require ("./start/crypto") ();
require ("./start/config") ();
require ("./start/routes") (app);

const porta = process.env.PORT || 3000;
app.listen (porta, () => console.log (`Server in ascolto sulla porta ${porta}...`));