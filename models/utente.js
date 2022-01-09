const config = require ("config");
const jwt = require ("jsonwebtoken");
const Joi = require ("joi");
const mongoose = require ("mongoose");

const schemaUtente = new mongoose.Schema ({

    nome: {

        type: String,
        required: true,
        minlength: 5,
        maxlength: 50

    },
    email: {

        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true

    },
    password: {

        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024

    }

});

//aggiunta di un "instance method" che sarà disponibile per tutti gli oggetti della classe Utente
schemaUtente.methods.generaAuthToken = function () {

    const token = jwt.sign ({ _id: this._id, nome: this.nome, email: this.email }, config.get ("jwtPrivateKey"));
    return token;

}

const Utente = mongoose.model ("Utente", schemaUtente);

function validaUtente (utente) {

    const schema = {

        nome: Joi.string ().min (5).max (50).required (),
        email: Joi.string ().min (5).max (255).required ().email (),
        password: Joi.string ().min (5).max (255).required ()

    };

    return Joi.validate (utente, schema);

}

exports.Utente = Utente;
exports.valida = validaUtente;