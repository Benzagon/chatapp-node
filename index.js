require('dotenv').config();

const express = require("express");
const app = express();
const mysql = require("mysql2");

app.use(express.json());
const port = process.env.PORT;

// const connection = mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user:  process.env.DATABASE_USERNAME,
//     password:  process.env.DATABASE_PASSWORD,
//     database:  process.env.DATABASE,
//     ssl: {
//         rejectUnauthorized: false,
//     },
// });

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

app.listen(port, () => {
    console.log(`> app listening on port ${port}`)
});