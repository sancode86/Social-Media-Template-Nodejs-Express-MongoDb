const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const setSchema = new Schema({
    
    codigoSet: {
        type: String,
        required: true,
        unique: true
    },
    
    nombreSet: {
        type: String,
        required: true
    }, 

    codbarraSet: String,
    
    medida: {
        type: Number,
        default: 0
        },
  
    medidaUnidad: {
        type: String,
        default: "Sin Especificar"
    },

    peso: {
        type: Number,
        default: 0
        },
   
    pesoUnidad: {
        type: String,
        default: "Sin Especificar"
    },    

    precioVenta: {
        type: Number,
        default: 0
        }, 

    precioVentaMoneda: {
        type: String,
        default: "Sin Especificar"
    },

    origen: {
        type: String,
        default: "Sin Especificar"
    },   

    tipoArticulo: {
        type: String,
        default: "Sin Especificar"
    },

    imgartUrl:{
        type: String
        },  

    createdAt: {
        type: Date,
        default: new Date()
        },

    habilitado: {
        type: Boolean,
        default: true
    },
    componentesSet: String


})


module.exports = mongoose.model('set', setSchema);



