const mongoose = require ("mongoose");

const Crypto = mongoose.model ("Crypto", new mongoose.Schema ({

    name: {

        type: String,
        required: true

    },
    symbol: {

        type: String,
        required: true

    },
    price: {

        type: Number,
        required: true

    }

}));

async function storeCrypto (res) {

    let crypto = await Crypto.findOne ({ name: res ["name"] });

    if (!crypto) {

        crypto = new Crypto ({ name: res ["name"], symbol: res ["symbol"], price: res ["quote"]["USD"]["price"] });

    } else {

        crypto.set ({ name: res ["name"], symbol: res ["symbol"], price: res ["quote"]["USD"]["price"] });

    }

    await crypto.save ();

}

exports.storeCrypto = storeCrypto;