//let stevilkeglobal = []


const nakljucneStevilke = (min, max, times) => {
  const nakljucno = []

  for (let i = 0; i < times; i++) {
      nakljucno.push(Math.floor(Math.random() * (1000 - 1) + 1));
  }
  return nakljucno;
};

window.onload = function() {
  zgeneriraj();
  pStevila();

};

document.getElementById("gumb1").onclick = function(){
  zgeneriraj();
};

function zgeneriraj() {
  const stevilke = nakljucneStevilke(1, 1000, 5);
  const vseStevilke = document.getElementById("stevilke");
  vseStevilke.innerHTML = stevilke.join(", ");
};

document.getElementById("gumb2").onclick = function(){
  izbris();
};

function izbris() {
  const vsaSt = document.getElementById("stevilke");
  const prikSt = vsaSt.innerHTML;
  const stevilke = prikSt.split(", ").map(Number);

//random določi število
const rIzbris = Math.floor(Math.random() * stevilke.length);
stevilke.splice(rIzbris, 1);

vsaSt.innerHTML = stevilke.join(", ");
};


document.getElementById("gumb4").onclick = function(){
  eno_st();
}

function eno_st() {
  const vseStevilke = document.getElementById("stevilke");
  const pStevila = vseStevilke.innerHTML;
  const stevilke = nakljucneStevilke(1, 1000, 1);
  const novaStevila = stevilke.join(", ");
  if (pStevila) {
    const tStevila = pStevila.split(", ").lenght;


    vseStevilke.innerHTML = pStevila + ", " + novaStevila;
  } else {
    vseStevilke.innerHTML = novaStevila;
  }
};

document.getElementById("gumb3").onclick = function(){
  izbrisV();
};

//izbris vseh
function izbrisV() {
  const abc = document.getElementById("stevilke");
  abc.innerHTML = [];
};

//dodaj število
document.getElementById("gumb5").onclick = function(){
  const vns_st = prompt("Vnesi število");
  const stevilka = Number(vns_st);
  if (isNaN(stevilka)) {
    alert("Niste vnesli številke");
    return;
  }
  if (stevilka < 1 ){
    alert("Številka je manjša od 1");
    return;
  }
  if (stevilka > 1000){
    alert("Število je večje od 1000");
    return;
    }

    const elt = document.getElementById("stevilke");
    if (elt.innerHTML){
      const stevilke = elt.innerHTML.split(", ").map(Number);
      stevilke.push(stevilka);
      elt.innerHTML = stevilke.join(", ");
    }
    else {
      elt.innerHTML = stevilka;
    }

};

//api get 
function calculateXOR(numbers) {
  let xorValue = 0;

  numbers.forEach(function (number) {
    xorValue ^= number;
  });

  return xorValue;
}

function pStevila() {
  Promise.all([
    axios.get("http://localhost:5500/api/mediana/get"),
    axios.get("http://localhost:5500/api/mediana/avg")
  ])
  .then(function(responses) {
    const stevila = responses[0].data;
    const avgValue = responses[1].data;

    const stevilaB = document.getElementById("stevilaB");
    const stevilaC = document.getElementById("stevilaC");
    const stevilaD = document.getElementById("stevilaD");
    const stevilaE = document.getElementById("stevilaE");

    // Izračun XOR med "stevilo" in "avgValue" na vsakem mestu
    const xorValues = [];
    for (let i = 0; i < stevila.length && i < avgValue.length; i++) {
      const xorValue = calculateXOR([stevila[i], avgValue[i]]);
      xorValues.push(xorValue);
    }

    // Izpis vrednosti v ustrezne stolpce
    stevila.forEach(function(stevilo) {
      const rowB = document.createElement("tr");
      const rowC = document.createElement("tr");
      const cellB = document.createElement("td");
      const cellC = document.createElement("td");

      const stev = document.createTextNode(stevilo);
      cellB.appendChild(stev);
      rowB.appendChild(cellB);
      stevilaB.appendChild(rowB);

      const binarnoStevilo = stevilo.toString(2);
      const binarnoStev = document.createTextNode(binarnoStevilo);
      cellC.appendChild(binarnoStev);
      rowC.appendChild(cellC);
      stevilaC.appendChild(rowC);
    });

    avgValue.forEach(function(avgValue) {
      const rowD = document.createElement("tr");
      const cellD = document.createElement("td");
      const avgText = document.createTextNode(avgValue);
      cellD.appendChild(avgText);
      rowD.appendChild(cellD);
      stevilaD.appendChild(rowD);
    });

    xorValues.forEach(function(xorValue) {
      const rowE = document.createElement("tr");
      const cellE = document.createElement("td");
      const xorText = document.createTextNode(xorValue);
      cellE.appendChild(xorText);
      rowE.appendChild(cellE);
      stevilaE.appendChild(rowE);
    });
  })
  .catch(function(error) {
    console.error(error);
  });
}

//pStevila()

const btn = document.getElementById("post");

btn.addEventListener("click", () => {
  let stevilke = document.getElementById("stevilke").innerHTML;

  console.log("running")
  axios.post("http://localhost:5500/api/mediana/post", {
  stevilke: stevilke
  }, {headers: {"Content-Type": "application/json"} })
  .then((response) => {
  console.log(response.data);
  location.reload(); 
  })
  .catch((error) => {
  console.error(error);
  });
});


