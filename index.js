// Elementos Interfaz
const pantalla = document.querySelector("#pantalla");
const start = document.querySelector("#start");
const pause = document.querySelector("#pause");
const stop = document.querySelector("#stop");
const speed = document.querySelector("#speed");
const textarea = document.querySelector("#textarea");
const pasteButton = document.querySelector("#btnPegar");
const themeInput = document.querySelector("#temas");
const html = document.querySelector("html");
const themes = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
];

themes.forEach((theme) => {
  let option = document.createElement("option");
  option.value = theme;
  option.text = theme;
  themeInput.appendChild(option);
});

// inicializar
pause.style = "display:none";
// Cargar el ultimo tema elegido
html.setAttribute("data-theme", localStorage.getItem("theme"));
themeInput.value = localStorage.getItem("theme");

// Variables de texto
const exampleTest = "Type or paste a text above to get started";
let textArray = exampleTest.split(" ");
let isWorking = false;
const min = 150;
const max = 750;

let speedTime = min;

speed.value = 100;

hide("pause");

// Bucle
let escritor;
let aux = 0;

start.addEventListener("click", () => {
  hide("start");
  if (textarea.value) textArray = textarea.value.split(/\s+|\n/);
  escritor = setInterval(() => {
    pantalla.innerHTML = paintTheCenter(textArray[aux]);
    aux++;
    if (aux >= textArray.length) {
      hide("pause");
      clearInterval(escritor);
      aux = 0;
    }
  }, speedTime);
});

function paintTheCenter(param) {
  let largo = param.length;
  let middle = [];

  // Calcula el índice del centro o los índices del centro si la longitud es par
  if (largo % 2 === 0) {
    middle.push(largo / 2 - 1);
    middle.push(largo / 2);
  } else {
    middle.push(Math.floor(largo / 2));
  }

  // Crea un arreglo de caracteres
  let arrString = param.split("");

  // Itera sobre cada caracter y aplica estilos al centro
  return arrString.reduce((acc, letter, index) => {
    if (middle.includes(index)) {
      return (acc += "<span class='text-error'>" + letter + "</span>");
    } else {
      return (acc += letter);
    }
  }, "");
}

pause.addEventListener("click", () => {
  hide("pause");
  clearInterval(escritor);
});

stop.addEventListener("click", () => {
  hide("pause");
  aux = 0;
  pantalla.innerHTML = "";
  clearInterval(escritor);
});

speed.addEventListener("change", () => {
  clearInterval(escritor);
  const porcentaje = speed.value;
  const valorMilisegundos = min + ((100 - porcentaje) / 100) * (max - min);
  speedTime = valorMilisegundos;
  if (isWorking) start.click();
});

pasteButton.addEventListener("click", function () {
  navigator.clipboard
    .readText()
    .then((text) => {
      document.getElementById("textarea").value = text;
    })
    .catch((err) => {
      console.error("Error al leer el portapapeles: ", err);
    });
});

function hide(param) {
  if (param == "pause") {
    pause.style = "display:none";
    start.style = "display:block";
    isWorking = false;
  } else if ((param = "start")) {
    start.style = "display:none";
    pause.style = "display:block";
    isWorking = true;
  }
}

themeInput.addEventListener("change", () => {
  let tema = themeInput.value;
  localStorage.setItem("theme", tema);
  html.setAttribute("data-theme", tema);
});

document.querySelector("#fullscreenBtn").addEventListener('click', () => {
    let pantalla = document.querySelector(".fullScreen");
    if (pantalla.requestFullscreen) {
        pantalla.requestFullscreen();
    } else if (pantalla.mozRequestFullScreen) { /* Firefox */
        pantalla.mozRequestFullScreen();
    } else if (pantalla.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        pantalla.webkitRequestFullscreen();
    } else if (pantalla.msRequestFullscreen) { /* IE/Edge */
        pantalla.msRequestFullscreen();
    }
});