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

//dodaj število
function formSubmit() {
  const form = document.forms["selectNumberSlider"];
  const inputValue = form["amountInput"].value;

  if (inputValue >= 1 && inputValue <= 1000) {
    const addNumber = document.getElementById("stevilke");

    if (addNumber.innerHTML) {
      const stevilke = addNumber.innerHTML.split(", ").map(Number);
      stevilke.push(inputValue);
      addNumber.innerHTML = stevilke.join(", ");
    } else {
      const stevilke = [inputValue];
      addNumber.innerHTML = stevilke.join(", ");
    }
  } else {
    alert("Vnesite veljavno število med 1 in 1000.");
  }
}

function calculateXOR(stevilke) {
  let xorValue = 0;

  stevilke.forEach(function (number) {
    xorValue ^= number;
  });

  return xorValue;
}

//podatki za tabelo
function pStevila() {
  axios.get("http://localhost:5500/api/mediana/get")
    .then(function(response) {
      const data = response.data;
      const medianaValues = data.mediana;
      const averageValues = data.average;
      const xorValues = [];

      const tbody = document.querySelector("#TabelaSt tbody");

      // Izračun XOR med stevilo in avgValue na vsakem mestu
      for (let i = 0; i < medianaValues.length && i < averageValues.length; i++) {
        const xorValue = calculateXOR([medianaValues[i], averageValues[i]]);
        xorValues.push(xorValue);
      }

      function addLeadingZeros(value, length) {
        const binaryString = value.toString(2);
        const zerosToAdd = length - binaryString.length;
        return "0".repeat(zerosToAdd) + binaryString;
      }

      // Izpis vrednosti v ustrezne celice
      for (let i = 0; i < medianaValues.length; i++) {
        const row = document.createElement("tr");

        const iCell = document.createElement("td");
        iCell.textContent = i + 1; 
        row.appendChild(iCell);

        // Mediana
        const medianaCell = document.createElement("td");
        medianaCell.textContent = medianaValues[i];
        row.appendChild(medianaCell);

        // Aritmetična sredina
        const aritmeticnaSredinaCell = document.createElement("td");
        aritmeticnaSredinaCell.textContent = averageValues[i];
        row.appendChild(aritmeticnaSredinaCell);

        // XOR število
        const xorCell = document.createElement("td");
        xorCell.textContent = xorValues[i];
        row.appendChild(xorCell);

        // Binarna mediana
        const binarnaMedianaCell = document.createElement("td");
        binarnaMedianaCell.textContent = addLeadingZeros(medianaValues[i], 10);
        row.appendChild(binarnaMedianaCell);
        
        // Binarna aritmetična
        const binarnaAritmeticnaCell = document.createElement("td");
        binarnaAritmeticnaCell.textContent = addLeadingZeros(averageValues[i], 10);
        row.appendChild(binarnaAritmeticnaCell);

        // Binarno XOR
        const binarnoXorCell = document.createElement("td");
        binarnoXorCell.textContent = addLeadingZeros(xorValues[i], 10);
        row.appendChild(binarnoXorCell);

        tbody.appendChild(row);
      }
      izrisGrafa(medianaValues, averageValues, xorValues);
    })
    .catch(function(error) {
      console.error(error);
    });
}

function izrisGrafa(medianaValues, averageValues, xorValues) {
  // Izris grafa


  const ctx = document.getElementById('myChart').getContext('2d');

  const labels = medianaValues.map((_, i) => (i + 1).toString()); 

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Mediana',
        data: medianaValues.slice(-25),
        borderColor: 'red',
        backgroundColor: 'transparent',
      },
      {
        label: 'Aritmetična sredina',
        data: averageValues.slice(-25),
        borderColor: 'blue',
        backgroundColor: 'transparent',
      },
      {
        label: 'XOR število',
        data: xorValues.slice(-25),
        borderColor: 'green',
        backgroundColor: 'transparent',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true, // Postavi y-os na začetek pri vrednosti 0
      },
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: false,
      },
    },
  };
  
  const myChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
      responsive: false
      },
  });
}

const btn = document.getElementById("post");

btn.addEventListener("click", () => {
  let stevilke = document.getElementById("stevilke").innerHTML;
  if (stevilke.trim() === "") {
    alert("Ni podanih števil!");}
  else {
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
}
});