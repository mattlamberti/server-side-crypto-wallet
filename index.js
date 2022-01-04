const express = require ("express");
const app = express ();

require('./start/db') ();
require("./start/crypto") ();
app.use (express.json ());

app.get ("/", (req, res) => {

    res.send ("Hello word");

});

const porta = process.env.PORT || 3000;
app.listen (porta, () => console.log (`Server in ascolto sulla porta ${porta}...`));