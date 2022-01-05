const config = require ("config");

module.exports = function () {

    if (!config.get ("jwtPrivateKey")) {

        throw new Error ("ERRORE: jwtPrivateKey non è definita.");

    }

}