require('dotenv').config();

const express = require("express");
const app = express();
const cors = require('cors');

app.use(express.json());
const port = process.env.PORT;

// https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/
const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}

app.use(cors({
    corsOptions
}));

const { PrismaClient } = require('@prisma/client') 
const prisma = new  PrismaClient()

async function createUser(name, email, password){
    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: password
        }
    });
};

async function deleteUser(id){
    const deletedUser = await prisma.user.delete({
        where: {
            id: id
        }
    });
    return ("Deleted user " + id)
};

async function getUsers() {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true
        }
    });
    return users;
};

//createUser("Nai", "nai@gmail.com", "nailope").then((a) => console.log("Created user")).catch((e) => console.error(e));

//deleteUser(2).then((a) => console.log(a)).catch((e) => console.error(e));

//getUsers().then((a) => console.log(a)).catch((e) => console.error(e));

app.get("/", (req, res) => {
    res.send("Api running OK...");
});

app.get("/users", (req, res) => {
    getUsers().then((a) => res.send(a)).catch((e) => console.error(e));
});

app.post("/signup", (req, res) => {
    console.log(req.body.user);
    
    const user = req.body.user;
    
    const name = user.map((e) => e.name)[0];
    const email = user.map((e) => e.email)[0];
    const password = user.map((e) => e.password)[0];
    
    createUser(name, email, password).then((a) => {
        console.log("Created user");
        res.json({msg: "User created"});

    }).catch((e) => {
        console.error(e);
        res.status(500);
        res.json({msg: "Error creating user"});
        
    });
});

app.listen(port, () => {
    console.log(`> app listening on port ${port}`)
});