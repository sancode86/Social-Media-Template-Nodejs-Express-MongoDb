const express = require("express");
const app = express();

const colors = require("colors");
var tiempo = new Date();
const os = require("os");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const multer = require("multer");
const nodemailer = require("nodemailer");

// Para manejar las imagenes subidas
const storageImagen = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    // Crear nombre unico para carga de imagen, igual que en pantalla de carga
    cb(null, (Date.now() / 10000).toFixed(0) + file.originalname);
  },
});

const { url } = require("./config/database");
const { appendFileSync } = require("fs");
const { timeStamp } = require("console");

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

require("./config/passport")(passport);

//settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Middlewares
app.use(morgan("dev"));
app.use(cookieParser());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    secret: "jhb234fn942n249jwf99999323nf33a",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(
  multer({
    storage: storageImagen,
    dest: path.join(__dirname, "public/uploads"),
  }).single("imagenarticulo")
);

//Routes
require("./app/routes")(app, passport);

//Static Files
app.use(express.static(path.join(__dirname, "public")));

//Listen
app.listen(app.get("port"), () => {
  console.log(colors.green("Server Start 😃")); 
  console.log("Nombre Equipo:", os.hostname());
  console.log("Sistema Operativo:", os.type());
  console.log("-------------------------------------------------------"); 
  console.log("                                    __     ____  _____");
  console.log("   _________ _____  _________  ____/ /__  ( __ )/ ___/");
  console.log("  / ___/ __ `/ __ \\/ ___/ __ \\/ __  / _ \\/ __  / __ \\ ");
  console.log(" (__  ) /_/ / / / / /__/ /_/ / /_/ /  __/ /_/ / /_/ / ");
  console.log("/____/\\__,_/_/ /_/\\___/\\____/\\__,_/\\___/\\____/\\____/  ");
  console.log("");                
  console.log("------------https://github.com/sancode86---------------");                                     
  console.log("");
  console.log("Fecha Inicio:", tiempo.toLocaleDateString("es-AR"));
  console.log("Hora Inicio:", tiempo.toLocaleTimeString());
  console.log(colors.green("Server on port"), app.get("port"));
});
