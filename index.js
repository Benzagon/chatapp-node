require('dotenv').config();

const express = require("express");
const app = express();
const mysql = require("mysql2");

app.use(express.json());
const port = process.env.PORT;

console.log("HOLA")

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user:  process.env.DATABASE_USERNAME,
    password:  process.env.DATABASE_PASSWORD,
    database:  process.env.DATABASE,
    ssl: {
        rejectUnauthorized: false,
    },
});

connection.connect((err) => {
    if(err) {
        console.error("Error conectándose: " + err)
        return;
    }
    
    console.log("Db connected");
});

app.get("/", (req, res) => {
    res.send("Api running OK...");
});

app.get("/users", (req, res) => {
    connection.query("SELECT * FROM users", (err, rows) => {
        if(err){
            console.error("Error consultando: " + err); 
        }

        console.log(rows);
        res.send(rows);
    })
})

app.listen(port, () => {
    console.log(`> app listening on port ${port}`)
})