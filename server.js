const express = require("express");
const app = express();
const PORT = 5500;
const mysql = require('mysql');
require("dotenv").config();
app.use(express.static("public"));
app.use(express.json()); 
// Povezava z bazo
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error('Napaka pri povezavi z bazo: ', err);
    return;
  }
  console.log('Povezava z bazo je vzpostavljena');
  connection.query("CREATE TABLE IF NOT EXISTS tabela (ID INT AUTO_INCREMENT PRIMARY KEY, CREATED_AT DATETIME, MEDIANA INT, AVERAGE INT)", (err, result) => {
    if (err) {
    console.error("Napaka pri ustvarjanju tabele: ", err);
    return;
    } 
    console.log("Ustvarjena tabela");
  });
});

// Endpoints
app.get("/api/mediana/get", (req, res) => {
  const query = "SELECT MEDIANA FROM tabela ORDER BY CREATED_AT DESC LIMIT 25";

  connection.query(query, (err, result) => {
    if (err) {
    console.error("Napaka pri izvajanju poizvedbe: ", err);
    res.status(500).send("Napaka pri izvajanju poizvedbe");
    return;
    }

    res.json(result.map(row => row.MEDIANA));
  });
});
// ...
app.get("/api/arithmetic/get", (req, res) => {
  const query = "SELECT AVERAGE FROM tabela ORDER BY CREATED_AT DESC LIMIT 25";

  connection.query(query, (err, result) => {
    if (err) {
    console.error("Napaka pri izvajanju poizvedbe: ", err);
    res.status(500).send("Napaka pri izvajanju poizvedbe");
    return;
    }

    res.json(result.map(row => row.AVERAGE));
  });
});


app.post("/api/mediana/calculate", (req, res) => {
  console.log(req.body);
  const stevilke = req.body.stevilke;
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

  if (!stevilke) {
    res.status(400).send(alert("Ni podanih števil"));
    return;
  } else {
    const vseStevilke = stevilke.split(',').map(Number);
    
    //izračun matematične sredine
    function getAvg(stevilke) {
    const average = stevilke.reduce((acc, c) => acc + c, 0);
    return average / stevilke.length;
    }
    const result1 = Math.round(getAvg(vseStevilke));
    
    //izračun mediane
    function median(stevilke) {
    const sorted = Array.from(stevilke).sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    return sorted[middle];
    }


    const result = median(vseStevilke);
    console.log('Mediana:', result);
    console.log('Sredina:', result1);

    const query = `INSERT INTO tabela (CREATED_AT, MEDIANA, AVERAGE) VALUES ('${timestamp}', ${result}, ${result1})`; 

    connection.query(query, (err, result) => {
    if (err) {
    console.error("Napaka pri izvajanju poizvedbe: ", err);
    res.status(500).send("Napaka pri izvajanju poizvedbe");
    return;
    }

    res.status(200).send("Podatki uspešno vstavljeni"); 
  });
 }
});

app.listen(PORT, () => {
console.log(`Strežnik je pognan na http://localhost:${PORT}`);
});
