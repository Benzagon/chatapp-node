const express = require("express");
const app = express();
const mysql = require("mysql2");

app.use(express.json());

const connection = mysql.createConnection({
    host: "",
    user: "",
    password1: "",
    database: "",
});

connection.connect((err) => {
    if(err) {
        console.err("Error conectándose: " + err)
        return;
    }
    
    console.log("DB connected");
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`)
})