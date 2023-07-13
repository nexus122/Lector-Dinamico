// Elementos Interfaz
let pantalla = document.querySelector("#pantalla");
let start = document.querySelector("#start");
let pause = document.querySelector("#pause");
let stop = document.querySelector("#stop");
let speed = document.querySelector("#speed");
let textarea = document.querySelector("#textarea")

// inicializar
pause.style = "display:none"
// Variables de texto
let textArray = ["Escribe", "un", "texto", "arriba", "para", "empezar."];
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
    }
        , speedTime);
})

function paintTheCenter(param) {

    let largo = param.length;    
    let arrString = param.split("");
    let middle = [];

    middle.push(Math.ceil(largo / 2));
    if (largo % 2 == 0) middle.push((largo / 2) + 1);

    return arrString.reduce((acc, letter, index) => {
        if (middle.includes(index+1)) return acc += "<span class='text-red-600'>" + letter + "</span>";
        else return acc += letter;
    }, "");    

}

pause.addEventListener("click", () => {
    hide("pause");
    clearInterval(escritor);
})

stop.addEventListener("click", () => {
    hide("pause");
    aux = 0;
    pantalla.innerHTML = "";
    clearInterval(escritor);
})

speed.addEventListener("change", () => {
    clearInterval(escritor);
    const porcentaje = speed.value;
    const valorMilisegundos = min + ((100 - porcentaje) / 100) * (max - min);
    speedTime = valorMilisegundos;
    if (isWorking) start.click();
})

function hide(param) {
    if (param == "pause") {
        pause.style = "display:none"
        start.style = "display:block"
        isWorking = false;
    } else if (param = "start") {
        start.style = "display:none"
        pause.style = "display:block"
        isWorking = true;
    }
}