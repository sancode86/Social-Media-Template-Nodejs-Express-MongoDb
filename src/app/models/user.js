const mongoose= require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = new mongoose.Schema({

    email: String,
    password: String,
    rol: {
        type: String,
        default: 'Basico' //No admin
    },  
    
    
    //Preferencias de colores y visualizacion    
    
    varColorModoClaro: {
        type: String,
        default: ''
    },  
    varColorModoOscuro: {
        type: String,
        default: 'disabled' 
    },  
    barraIzqTema: {
        type: String,
        default: 'dark' 
    },  
    barraCompact: {
        type: String,
        default: 'fixed' 
    }
  


});


userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validatePassword = function (password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', userSchema);