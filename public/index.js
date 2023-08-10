//
const nakljucneStevilke = (min, max, times) => {
  const oneRandomNumber = []

  for (let i = 0; i < times; i++) {
      oneRandomNumber.push(Math.floor(Math.random() * (1000 - 1) + 1));
  }
  return oneRandomNumber;
};

//funkcije ki se sprožijo ob nalaganju okna
window.onload = function() {
  generateRandomNumbers();
  pStevila();
};

//generiraj 5 random števil
document.getElementById("generateRandomNumbers").onclick = function(){
  generateRandomNumbers();
};

function generateRandomNumbers() {
  const stevilke = nakljucneStevilke(1, 1000, 5);
  const vseStevilke = document.getElementById("stevilke");
  vseStevilke.innerHTML = stevilke.join(", ");
};

//izbris enega naključno izbranega števila
document.getElementById("izbris1").onclick = function(){
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

//eno naključno generirano število
document.getElementById("enoStNakljucno").onclick = function(){
  eno_st();
}

function eno_st() {
  const vseStevilke = document.getElementById("stevilke");
  const pStevila = vseStevilke.innerHTML;
  const stevilke = nakljucneStevilke(1, 1000, 1);
  const novaStevila = stevilke.join(", ");
  if (pStevila) {
    const tStevila = pStevila.split(", ").length;
    vseStevilke.innerHTML = pStevila + ", " + novaStevila;
  } else {
    vseStevilke.innerHTML = novaStevila;
  }
};

//izbris vseh
document.getElementById("izbrisVse").onclick = function(){
  izbrisV();
};

function izbrisV() {
  const abc = document.getElementById("stevilke");
  abc.innerHTML = [];
};


function formSubmit(){
  var form = document.forms["selectNumberSlider"];
  var inputValue = form["amountInput"].value;

console.log(inputValue)
}

//dodaj število
function formSubmit(){
  const form = document.forms["selectNumberSlider"];
  const inputValue = form["amountInput"].value;

  const addNumber = document.getElementById("stevilke")
  
  if (addNumber.innerHTML){
    const stevilke = addNumber.innerHTML.split(", ").map(Number);
    stevilke.push(inputValue);
    addNumber.innerHTML = stevilke.join(", ");
  }
  else {
    const stevilke = [inputValue];
    addNumber.innerHTML = stevilke.join(", ");
  }
};

function calculateXOR(stevilke) {
  let xorValue = 0;

  stevilke.forEach(function (number) {
    xorValue ^= number;
  });

  return xorValue;
}

function pStevila() {
  Promise.all([
    axios.get("http://localhost:5500/api/mediana/get"),
    axios.get("http://localhost:5500/api/arithmetic/get")
  ])
  .then(function(responses) {
    const stevila = responses[0].data;
    const avgValue = responses[1].data;

    const stevilaB = document.getElementById("stevilaB");
    const stevilaC = document.getElementById("stevilaC");
    const stevilaD = document.getElementById("stevilaD");
    const stevilaE = document.getElementById("stevilaE");
    const stevilaF = document.getElementById("stevilaF");

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

    avgValue.forEach(function(avgValu) {
      const rowD = document.createElement("tr");
      const rowF = document.createElement("tr");
      const cellD = document.createElement("td");
      const cellF = document.createElement("td");
      
      const avgText = document.createTextNode(avgValu);
      cellD.appendChild(avgText);
      rowD.appendChild(cellD);
      stevilaD.appendChild(rowD);
      
      const binarnostevilo1 = avgValu.toString(2);
      const binarnoStev1 = document.createTextNode(binarnostevilo1);
      cellF.appendChild(binarnoStev1);
      rowF.appendChild(cellF);
      stevilaF.appendChild(rowF);
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
  axios.post("http://localhost:5500/api/mediana/calculate", {
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

function oninput(elem) {
  let a = elem.value;
console.log(a);
}
