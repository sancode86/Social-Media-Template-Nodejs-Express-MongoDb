const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const datosEmpresaSchema = new Schema({
    _id: String,
    nombreEmpresa: String,
    direccionEmpresa: String,
    razonSocialEmpresa: String,
    cuilEmpresa: String,
    provinciaEmpresa: String,
    paisEmpresa : String,
    telefonoEmpresa: String,    
    descripcionEmpresa: String,

    createdAt: {
        type: Date,
        default: new Date()
        },
})

module.exports = mongoose.model('datosEmpresa',datosEmpresaSchema);