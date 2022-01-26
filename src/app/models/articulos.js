const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articulosSchema = new Schema({
    
    titulo: {
        type: String,
        required: true     
    },
    
    descripcion: {
        type: String,
        required: true
    },   
    
    tipoPost: {
        type: String,
        required: true
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
    usuarioCreador: String,
    
    usuarioCreadorNombre: String

})


module.exports = mongoose.model('articulos', articulosSchema);



