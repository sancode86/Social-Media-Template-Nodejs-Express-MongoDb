const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articulosSchema = new Schema({
    
    codigoArticulo: {
        type: String,
        required: true,
        unique: true
    },
    
    nombre: {
        type: String,
        required: true
    }, 

    codbarra: String,
    
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
    
    stockMinimo: {
        type: Number,
        default: 0
        },

    stockMaximo: {
        type: Number,
        default: 0
        },

    stockActual: {
        type: Number,
        default: 0
        },    

    costoProduccion: {
        type: Number,
        default: 0
        }, 

    costoProduccionmoneda: {
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
    
    usadoEnCirugia: {
        type: String,
        default: "no"
    }

    // imgNombre:{
    //     type: String
    //     },  

    // imgNombreExt:{
    //     type: String
    //     },  


})


module.exports = mongoose.model('articulos', articulosSchema);



