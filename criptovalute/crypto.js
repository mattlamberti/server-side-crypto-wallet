const axios = require ("axios");

module.exports = function () {

    setInterval (async function () {

        const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";

        try {

            //richiesta HTTP di tipo GET per ottenere le inoformazioni relative alle criptovalute
            const response = await axios.get (url, {

                params: {

                    //"limit" rappresenta il numero di criptovalute da richiedere e "convert" indica la valuta con cui rappresentare le informazioni relative al prezzo per unità
                    "limit": "100",
                    "convert": "USD"

                },
                headers: {

                    //-------ricordati di mettere la api key nel file di configurazione!!!!!!!-------

                    //nell'header della richiesta va specificata la api key fornita da CoinMarketCap
                    "X-CMC_PRO_API_KEY": "90778e3c-0fe6-40ff-a026-f3959a8bb81c"

                }

            });

            //console.log ("Nome: " + response.data ["data"][i]["name"] + "\nSimbolo: " + response.data ["data"][i]["symbol"] + "\nPrezzo in USD: " + response.data ["data"][i]["quote"]["USD"]["price"]);
            console.log (JSON.stringify (response.data));

        } catch (ex) {

            console.log (ex);

        }

    }, 10000); //la funzione di callback viene eseguita ogni 2 ore (7200000 millisecondi).

}