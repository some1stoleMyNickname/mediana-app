const express = require("express");
const app = express();
const PORT = 5500;
app.use(express.static("public"));
app.use(express.json()); 
// Povezava z bazo
require("dotenv").config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

async function testPovezava() {
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}

const connectionDB = testPovezava()

const mediana_tabelas = require('./models/medianaTabela')(sequelize, Sequelize);
mediana_tabelas.sync()

app.get("/api/mediana/get", async (req, res) => {
  try {
    const result = await mediana_tabelas.findAll({
      attributes: ['MEDIANA', 'AVERAGE'],
      order: [['CREATED_AT', 'DESC']],
      limit: 25
    });

    const medianaValues = result.map(row => row.MEDIANA);
    const averageValues = result.map(row => row.AVERAGE);

      res.json({ mediana: medianaValues, average: averageValues});
  } catch (err) {
    console.error("Napaka pri izvajanju poizvedbe: ", err);
    res.status(500).send("Napaka pri izvajanju poizvedbe");
  }
});


app.post("/api/mediana/calculate", async (req, res) => {
  console.log(req.body);
  const stevilke = req.body.stevilke;
  const timestamp = new Date();

  if (!stevilke) {
    res.status(400).send("Ni podanih števil");
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
   
      const result = Math.round(median(vseStevilke));

      console.log('Mediana:', result);
      console.log('Sredina:', result1);

      try {
        const newRecord = await mediana_tabelas.create({
          CREATED_AT: timestamp,
          MEDIANA: result,
          AVERAGE: result1
        });

      console.log("Podatki uspešno vstavljeni:", newRecord);

        res.status(200).send("Podatki uspešno vstavljeni");
      } catch (err) {
        console.error("Napaka pri vstavljanju podatkov: ", err);
        res.status(500).send("Napaka pri vstavljanju podatkov");
      }
    }
});

app.listen(PORT, () => {
  console.log(`Strežnik je pognan na http://localhost:${PORT}`);
});