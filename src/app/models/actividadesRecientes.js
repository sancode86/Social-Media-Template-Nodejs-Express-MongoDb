const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actividadesRecientesSchema = new Schema({

    responsable: String,
    icono: String,

    iconoActividadColor: String,
    textoActividadColor: String,

    asunto: String,
    descripcion: String,

    createdAt: {
        type: Date,
        default: new Date()
        },
})

module.exports = mongoose.model('actividadesRecientes',actividadesRecientesSchema);