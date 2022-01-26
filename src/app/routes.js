const colors = require("colors");
const nodemailer = require("nodemailer");
const usuarios = require("../app/models/user");
const articulos = require("../app/models/articulos");
// const Task = require("../app/models/task");
const empresa = require("../app/models/datosEmpresa");
const actividadesRecientes = require("../app/models/actividadesRecientes");
// Lo necesito para poder hace el updateMany:
// var bodyParser = require("body-parser");
// Lo necesito para poder especificar un _id
const mongoose = require("mongoose");
// var ObjectId = mongoose.Types.ObjectId;
module.exports = (app, passport) => {
  // #########################################################################################
  //Rutas DASHBOARD ó RESUMENES
  // #########################################################################################

  //Rutas Dashboard Analisis Informacion Consultas varias
  app.get("/panel", isLoggedIn, async (req, res) => {
    const empresaDatos = await empresa.find();
    let user_id = req.user.id;
    const posteos = await articulos.find({usuarioCreador: user_id}).sort({ _id: -1 });;
    console.log(posteos)
    const actividadesRecientesobj = await actividadesRecientes
      .find({})
      .sort({ _id: -1 });
    res.render("panel", {
      user: req.user,
      actividadesRecientesobj,
      empresaDatos,
      posteos
    });
  });
  app.get("/crear-post", isLoggedIn, async (req, res) => {
    const articulosobj = await articulos.find();
    const empresaDatos = await empresa.find();
    return res.render("crear-post", {
      user: req.user,
      articulosobj,
      empresaDatos,
    });
  });
  app.post("/crear-post", isLoggedIn, async (req, res) => {
    let user_id = req.user.id;
    const articulosobj = new articulos({      
      _id: req.body._id,
      usuarioCreador: user_id,   
      usuarioCreadorNombre: req.user.nombreUsuario + " " +  req.user.apellidoUsuario,
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      tipoPost: req.body.tipoPost,
      imgartUrl: req.body.imgartUrl
    });

    await articulosobj.save(function (err) {
      if (err) {
        console.log("ERROR EN CARGA");
        console.log(err);
        return res.redirect("/upss");
      } else {
        const actividadesRecientesobj = new actividadesRecientes(req.body);        
        actividadesRecientesobj.save();   
        res.redirect("/panel");
      }
    });
  }); 
  app.get("/upss", isLoggedIn, async (req, res) => {
    const empresaDatos = await empresa.find();
    res.render("upss", {
      user: req.user,
      empresaDatos,
    });
  });
  // Para cambiar el estado habilitado de un articulo
  app.get("/estado-post/:id", async (req, res) => {
    const { id } = req.params;
    const articulosobj = await articulos.findById(id);
    articulosobj.habilitado = !articulosobj.habilitado;
    await articulosobj.save();
    res.redirect("/panel");
  });
  //Editar un articulo
  app.get("/editar-post/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const articulosobj = await articulos.findById(id);
    res.render("editar-post", {
      user: req.user,
      articulosobj,
    });
  });

  app.post("/editar-post/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await articulos.updateOne({ _id: id }, req.body);
    const actividadesRecientesobj = new actividadesRecientes(req.body);
    await actividadesRecientesobj.save();
    return res.redirect("/panel");
  });

  //Rutas Consulta de Articulos
  app.get("/mis-posts", isLoggedIn, async (req, res) => {
    const empresaDatos = await empresa.find(); 
    let user_id = req.user.id;
    const posteos = await articulos.find({usuarioCreador: user_id}).sort({ _id: -1 });;
    return res.render("mis-posts", {
      user: req.user,   
      empresaDatos,
      posteos
    });
  });

  app.get("/borrar-post/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await articulos.deleteOne({ _id: id });
    res.redirect("/panel");
  });

  app.get("/borrar-usuario/:id", isAdmin, async (req, res) => {
    const { id } = req.params;
    await usuarios.deleteOne({ _id: id });
    res.redirect("/admin");
  });

  app.get(
    "/estado-post/:id",
    isLoggedIn,
    async (req, res) => {
      const { id } = req.params;
      const articulosobj = await articulos.findById(id);
      articulosobj.habilitado = !articulosobj.habilitado;
      await articulosobj.save();
      res.redirect("/");
    }
  );

  //Para poder hacer POST y volver a la misma página
  app.get("/volver", isLoggedIn, async (req, res) => {
    res.render("volver", {
      user: req.user,
    });
  });

  // // #########################################################################################
  // //Enviar mail consulta
  // // #########################################################################################

  app.post("/enviar-consulta", async (req, res) => {
    const { name, email, telefono, mensaje } = req.body;

    contentHTML = `
        <h1>Mensaje desde formulario WEB</h1>
        <p>Nombre: ${name}</p></br>
        <p>E-Mail: ${email}</p></br>
        <p>Teléfono: ${telefono}</p></br>
        <p>Mensaje: ${mensaje}</p>
        `;
    console.log(contentHTML);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: "123@gmail.com",
        pass: "",
      },
    });

    const info = await transporter.sendMail({
      from: "'App sancode86'",
      to: "123@gmail.com",
      subject: "Mensaje Sistema",
      html: contentHTML,
    });

    console.log("mensaje enviado", info.messageId);
    res.redirect("/consulta-enviada");
  });

  app.get("/consulta-enviada", isLoggedIn, async (req, res) => {
    res.render("consulta-enviada", {
      user: req.user,
    });
  });

  // FIN enviar mail consulta

  //Rutas de Login y Signup

  app.get("/", async (req, res) => {
    const articulosobj = await articulos.find();
    return res.render("index", {   
      articulosobj,
    });
    // res.redirect("/index");
  });

  app.get("/login", async (req, res) => {
    // const empresaDatos = await empresa.find();
    res.render("login", {
      // empresaDatos,
      message: req.flash("loginMessage"),
    });
  });

  app.post(
    "/login",
    passport.authenticate("local-login", {
      successRedirect: "/interface",
      failureRedirect: "/login",
      failureFlash: true,
    })
  );

  app.get("/signup", (req, res) => {
    res.render("signup", {
      message: req.flash("signupMessage"),
    }); 
  });

  app.post(
    "/signup",
    passport.authenticate("local-signup", {
      successRedirect: "/panel",
      failureRedirect: "/signup",
      failureFlash: true,
    })
  );

  app.post("/add", isAdmin, async (req, res) => {
    console.log(new Task(req.body));
    const task = new Task(req.body);
    await task.save();
    res.redirect("/admin");
  });

  app.post("/modificar-datos-empresa", isAdmin, async (req, res) => {
    const empresaDatos = new empresa(req.body);
    //borrar informacion anterior
    await empresaDatos.deleteOne({ upsert: true });
    //Volver a escribir la info
    await empresaDatos.save({ upsert: true });

    res.redirect("/admin");
  });

  //Esto esta mal y lo sé. Pero me gusta el concepto de que la peticion aceptada de un login
  //sea redirigida a una interfaz que redireccione al usuario segun ROL. A mejorar !!
  app.get("/interface", (req, res) => {
    console.log(colors.bold("* Interface reached *"));
    if (req.isAuthenticated() && req.user.rol == 1) {
      return res.redirect("/panel");
    }
    return res.redirect("/panel");
  });

  app.get("/perfil", isLoggedIn, async (req, res) => {  
    res.render("perfil", {
      user: req.user,
    });
  });

  //Verifica si es administrador antes de redireccionar al panel admin
  app.get("/admin", isAdmin, async (req, res) => {
    const users = await usuarios.find();
    // const empresaDatos = await empresa.find();
    const actividadesRecientesobj = await actividadesRecientes
      .find({})
      .sort({ _id: -1 });
    var tiempo = new Date();
    console.log(colors.green("--------------------------"));
    console.log(colors.green("Admin conectado!"));
    console.log(tiempo.toLocaleDateString("es-AR"));
    console.log(tiempo.toLocaleTimeString());
    console.log(colors.green("--------------------------"));
    //console.log(users);
    res.render("admin", {
      user: req.user,
      users,   
      // empresaDatos,
      actividadesRecientesobj,
    });
  });

  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect("/");
  }

  //isAdmin una funcion hardcodeada, que machea con la BD si el rol corresponde a 1. Es decir
  //"1" estaria siendo el rol "admin". A Mejorar!!!
  function isAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.rol == 1) {
      // console.log("rol", req.user.rol);
      return next();
    }
    return res.redirect("/");
  }
}; //Fin Module Exports
