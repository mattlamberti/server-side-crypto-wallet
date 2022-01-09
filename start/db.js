const mongoose = require ("mongoose");
const config = require ("config");

//"mongodb://localhost/mattlamberti"
//config.get ("db") + "?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }

module.exports = function () {

    mongoose.connect (config.get ("db") + "?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
        .then (() => console.log ("Connessione a MongoDB..."))
        .catch (err => console.error ("Impossibile connettersi a MongoDB..." + err));

}