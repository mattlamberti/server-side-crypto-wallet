const mongoose = require('mongoose');

module.exports = function () {
  
    mongoose.connect ("mongodb://localhost/mattlamberti")
        .then (() => console.log ("Connessione a MongoDB..."))
        .catch (err => console.error ("Impossibile connettersi a MongoDB..."));

}