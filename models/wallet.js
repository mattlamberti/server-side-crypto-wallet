const mongoose = require ("mongoose");
const Joi = require ("joi");
Joi.objectId = require ("joi-objectid") (Joi);

const schemaWallet = new mongoose.Schema ({

    utente: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "Utente",
        required: true

    },
    assets: [{

        nome: {

            type: String,
            required: true
    
        },
        simbolo: {

            type: String,
            required: true

        },
        quantita: {
    
            type: Number,
            required: true
            
        },
        prezzoPerUnita: {
    
            type: Number,
            required: true

        }

    }]

});

const Wallet = mongoose.model ("Wallet", schemaWallet);

function validaWallet (wallet) {

    const schema = {

        utente: Joi.objectId ().required (),
        nome: Joi.string ().required (),
        simbolo: Joi.string ().required (),
        quantita: Joi.number ().required (),
        prezzoPerUnita: Joi.number ().required ()

    };

    return Joi.validate (wallet, schema);

}

exports.Wallet = Wallet;
exports.valida = validaWallet;