const colors = require("colors");
const nodemailer = require("nodemailer");
const usuarios = require("../app/models/user");
const articulos = require("../app/models/articulos");
const Task = require("../app/models/task");
const set = require("../app/models/set");
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
    const actividadesRecientesobj = await actividadesRecientes
      .find({})
      .sort({ _id: -1 });
    res.render("panel", {
      user: req.user,
      actividadesRecientesobj,
      empresaDatos,
    });
  });
  //FIN Rutas Dashboard Analisis Informacion Consultas varias

  // #########################################################################################
  //Rutas Carga de sets
  // #########################################################################################

  // app.get("/carga-de-set", isLoggedIn, async (req, res) => {
  //   const articulosobj = await articulos.find();
  //   const empresaDatos = await empresa.find();
  //   return res.render("carga-de-set", {
  //     user: req.user,
  //     articulosobj,
  //     empresaDatos,
  //   });
  // });

  // app.post("/agregar-set", isLoggedIn, async (req, res) => {
  //   console.log(new articulos(req.body));
  //   const setObj = new set(req.body);
  //   // Te presento mi humilde error handler
  //   await setObj.save(function (err) {
  //     if (err) {
  //       console.log("CARGA DE SETS --> SET ya existente");
  //       console.log(err);
  //       return res.redirect("/carga-de-set-ya-existe");
  //     } else {
  //       const actividadesRecientesobj = new actividadesRecientes(req.body);
  //       actividadesRecientesobj.save();
  //       console.log(req.file);
  //       res.redirect("/consulta-set");
  //     }
  //   });
  // });

  // app.get("/carga-de-set-ya-existe", isLoggedIn, async (req, res) => {
  //   const empresaDatos = await empresa.find();
  //   res.render("carga-de-set-ya-existe", {
  //     user: req.user,
  //     empresaDatos,
  //   });
  // });

  // app.get("/consulta-set", isLoggedIn, async (req, res) => {
  //   const empresaDatos = await empresa.find();
  //   const articulosobj = await set.find();
  //   return res.render("consulta-set", {
  //     user: req.user,
  //     articulosobj,
  //     empresaDatos,
  //   });
  // });

  // app.get("/borrar-set/:id", isLoggedIn, async (req, res) => {
  //   const { id } = req.params;
  //   await set.deleteOne({ _id: id });
  //   res.redirect("/consulta-set");
  // });

  // app.get("/estado-habilitado-set/:id", async (req, res) => {
  //   const { id } = req.params;
  //   const articulosobj = await set.findById(id);
  //   articulosobj.habilitado = !articulosobj.habilitado;
  //   await articulosobj.save();
  //   res.redirect("/consulta-set");
  // });

  // #########################################################################################
  //Rutas Carga de Articulos
  // #########################################################################################

  app.get("/carga-de-articulos", isLoggedIn, async (req, res) => {
    const articulosobj = await articulos.find();
    const empresaDatos = await empresa.find();
    return res.render("carga-de-articulos", {
      user: req.user,
      articulosobj,
      empresaDatos,
    });
  });

  app.post("/agregar-articulos", isLoggedIn, async (req, res) => {
    console.log(new articulos(req.body));
    const articulosobj = new articulos(req.body);
    // Te presento mi humilde error handler
    await articulosobj.save(function (err) {
      if (err) {
        console.log("CARGA DE ARTICULOS --> Articulo ya existente");
        console.log(err);
        return res.redirect("/carga-de-articulos-ya-existe");
      } else {
        const actividadesRecientesobj = new actividadesRecientes(req.body);
        actividadesRecientesobj.save();
        console.log(req.file);
        res.redirect("/consulta-articulos");
      }
    });
  });

  // para redireccion del "error handler casero" a página :
  app.get("/carga-de-articulos-ya-existe", isLoggedIn, async (req, res) => {
    const empresaDatos = await empresa.find();
    res.render("carga-de-articulos-ya-existe", {
      user: req.user,
      empresaDatos,
    });
  });

  // Para cambiar el estado habilitado de un articulo
  app.get("/estado-habilitado-art/:id", async (req, res) => {
    const { id } = req.params;
    const articulosobj = await articulos.findById(id);
    articulosobj.habilitado = !articulosobj.habilitado;
    await articulosobj.save();
    res.redirect("/consulta-articulos");
  });

  //Editar un articulo
  app.get("/editar-articulos/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const articulosobj = await articulos.findById(id);
    res.render("editar-articulos", {
      user: req.user,
      articulosobj,
    });
  });

  app.post("/editar-articulos/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await articulos.updateOne({ _id: id }, req.body);
    const actividadesRecientesobj = new actividadesRecientes(req.body);
    await actividadesRecientesobj.save();
    return res.redirect("/consulta-articulos");
  });

  //FIN Rutas Carga de Articulos

  //Rutas Consulta de Articulos
  app.get("/consulta-articulos", isLoggedIn, async (req, res) => {
    const empresaDatos = await empresa.find();
    const articulosobj = await articulos.find();
    return res.render("consulta-articulos", {
      user: req.user,
      articulosobj,
      empresaDatos,
    });
  });

  app.get("/borrar-articulo/:id", isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await articulos.deleteOne({ _id: id });
    res.redirect("/consulta-articulos");
  });

  app.get(
    "/cambiar-estado-habilitado-articulo/:id",
    isLoggedIn,
    async (req, res) => {
      const { id } = req.params;
      const articulosobj = await articulos.findById(id);
      articulosobj.habilitado = !articulosobj.habilitado;
      await articulosobj.save();
      res.redirect("/");
    }
  );

  //FIN Rutas Consulta de Articulos

  // #########################################################################################
  //Rutas DEPOSITO
  // #########################################################################################

  // //Rutas Consulta de depositos
  // app.get("/impresion-etiquetas", isLoggedIn, async (req, res) => {
  //   const articulosobj = await articulos.find();
  //   const setobj = await set.find();
  //   const empresaDatos = await empresa.find();
  //   return res.render("impresion-etiquetas", {
  //     user: req.user,
  //     setobj,
  //     empresaDatos,
  //     articulosobj,
  //   });
  // });

  // // #########################################################################################
  // //Rutas PREFERENCIAS DE USUARIO
  // // #########################################################################################
  // //Guardar Preferencias de colores y estilo
  // app.post(
  //   "/guardar-preferencias-usuario/:id",
  //   isLoggedIn,
  //   async (req, res) => {
  //     const { id } = req.params;
  //     await usuarios.updateOne({ _id: id }, req.body);
  //     console.log(usuarios(req.body));
  //     return res.redirect("/volver");
  //   }
  // );
  // //FIN Guardar Preferencias de colores y estilo

  //Para poder hacer POST y volver a la misma página
  app.get("/volver", isLoggedIn, async (req, res) => {
    res.render("volver", {
      user: req.user,
    });
  });

  // //ruta del o la instrumentadora o el que sea que lleva
  // //la caja del poder
  // app.get("/pantalla-carga-inst", isLoggedIn, async (req, res) => {
  //   const articulosobj = await articulos.find();
  //   const setobj = await set.find();
  //   const empresaDatos = await empresa.find();
  //   return res.render("pantalla-carga-inst", {
  //     user: req.user,
  //     articulosobj,
  //     empresaDatos,
  //     setobj,
  //   });
  // });

  //ENVIAR INFO APP

  // app.post("/enviar-info-app", async (req, res) => {
  //   const { informacion } = req.body;

  //   contentHTML = `
  //     <h1>Enviado desde la APP (Sin acomodar) </h1>
  //     <p>Informacion: ${informacion}</p></br>   
  //     `;
  //   console.log(contentHTML);

  //   const transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     secure: false,
  //     auth: {
  //       user: "123@gmail.com",
  //       pass: "",
  //     },
  //   });

  //   const info = await transporter.sendMail({
  //     from: "'App Instrumentacion'",
  //     to: "123@gmail.com",
  //     subject: "Mensaje Sistema",
  //     html: contentHTML,
  //   });
  //   console.log("mensaje enviado", info.messageId);
  //   res.redirect("/");
  // });

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
      from: "'App Instrumentacion'",
      to: "laputaquelospario@gmail.com",
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

  app.get("/", (req, res) => {
    res.render("index");
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

  app.get("/profile", isLoggedIn, async (req, res) => {
    const tasks = await Task.find();
    res.render("profile", {
      user: req.user,
      tasks,
    });
  });

  // app.get("/edit/:id", isAdmin, async (req, res) => {
  //   const { id } = req.params;
  //   const task = await Task.findById(id);
  //   res.render("edit", {
  //     task,
  //   });
  // });

  // app.post("/edit/:id", isAdmin, async (req, res) => {
  //   const { id } = req.params;
  //   await Task.updateOne({ _id: id }, req.body);
  //   res.redirect("/admin");
  // });

  // app.get("/delete/:id", isAdmin, async (req, res) => {
  //   const { id } = req.params;
  //   await Task.deleteOne({ _id: id });
  //   res.redirect("/admin");
  // });

  //Verifica si es administrador antes de redireccionar al panel admin
  app.get("/admin", isAdmin, async (req, res) => {
    const users = await usuarios.find();
    const tasks = await Task.find();
    // const empresaDatos = await empresa.find();
    const actividadesRecientesobj = await actividadesRecientes
      .find({})
      .sort({ _id: -1 });
    var tiempo = new Date();
    console.log(colors.green("--------------------------"));
    console.log(colors.green("Admin Connected"));
    console.log(tiempo.toLocaleDateString("es-AR"));
    console.log(tiempo.toLocaleTimeString());
    console.log(colors.green("--------------------------"));
    //console.log(users);
    res.render("admin", {
      user: req.user,
      users,
      tasks,
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
