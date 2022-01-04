const axios = require ("axios");
const {storeCrypto} = require ('../models/cryptocurrency');

module.exports = function () {

    setTimeout (async function () {

        const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

        try {

            //-------ricordati di mettere la api key nel file di configurazione!!!!!!!-------
            const response = await axios.get (url, { params: { "limit": "5000", "convert": "USD" }, headers: { "X-CMC_PRO_API_KEY": "90778e3c-0fe6-40ff-a026-f3959a8bb81c" }});

            for (let i = 0; i < response.data ["data"].length; i++) {

                await storeCrypto (response.data ["data"][i]);

            }

        } catch (ex) {

            console.log (ex);

        }

    }, 1000); //la funzione di callback viene eseguita ogni 2 ore (7200000 millisecondi).

}