const express = require ("express");
const crypto = require ("./criptovalute/crypto");
const app = express ();

app.use (express.json ());
crypto ();

app.get ("/", (req, res) => {

    res.send ("Hello word");

});



const porta = process.env.PORT || 3000;
app.listen (porta, () => console.log (`Server in ascolto sulla porta ${porta}...`));