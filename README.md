# Simple Social Media Template | Nodejs - Express- MongoDb

Social Media Template I made using NodeJs and Express. I like a lot MongoDb, so I choose it. Using EJS for templating and passport to authenticate the users 🙂
## Features
![text](src/readmeImgs/prin.png)

- Login & Signup using passport authentication.
- View post from all users in Home page.
- Create post with basic info and upload an image.
- Basic profile view.
- Send mails to users with NodeMailer
Customize email data:
```
    contentHTML = `
        <h1>Mensaje desde formulario WEB</h1>
        <p>Nombre: ${name}</p></br>
        <p>E-Mail: ${email}</p></br>
        <p>Teléfono: ${telefono}</p></br>
        <p>Mensaje: ${mensaje}</p>
        `;   
```
Add you email credentials:
```
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: "123@gmail.com",
        pass: "",
      },
    });
```
- Manage your posts, edit or delete them from general view or use the detailed table.

![text](src/readmeImgs/posts.png)

## Admin panel

 - Manage users from admin panel.

![text](src/readmeImgs/admin.png)

## Improvements

You could easily implement a comment system by adding corresponding field to the 'post' model;
for example, an array that stores the user and the comment made for each 'post'. Like button also could be done
in a similar way.

Lots of stuff can be done with this basic setup. It's a good starting point for a project. Of course you must improve security. This repo is very easy to customise!

Have a nice day.