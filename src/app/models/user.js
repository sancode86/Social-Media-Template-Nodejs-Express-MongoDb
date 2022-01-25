const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const userSchema = new mongoose.Schema({
  email: String,
  nombreUsuario: String,
  apellidoUsuario: String,
  descripcionUsuario: String,
  password: String,
  rol: {
    type: String,
    default: "Basico", //No admin
  },

  //Preferencias de colores y visualizacion

  preferencia: {
    type: String,
    default: "",
  },
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model("User", userSchema);