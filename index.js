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

let speedTime = max;

hide("pause");

// Bucle
let escritor;
let aux = 0;
// 1000 es un segundo 60000 es un minuto
// si dividimos las palabras por 60000 sacaremos las palabras por minuto

// 400 palabras / 60000 = 15 palabras por segundo
// 15 palabras por minuto

start.addEventListener("click", ()=>{
    hide("start");
    if(textarea.value) textArray = textarea.value.split(/\s+|\n/);    
    escritor = setInterval(()=>{                
            pantalla.innerHTML = textArray[aux];
            aux++;
            if(aux >= textArray.length) {
                hide("pause");
                clearInterval(escritor);
                aux = 0;
            }
    }    
    , speedTime);
})

pause.addEventListener("click", ()=>{
    hide("pause");
    clearInterval(escritor);    
})

stop.addEventListener("click", ()=>{
    hide("pause");
    aux = 0;
    pantalla.innerHTML = "";
    clearInterval(escritor);
})

speed.addEventListener("change", ()=>{
    clearInterval(escritor);
    const porcentaje = speed.value;  
    const valorMilisegundos = min + ((100 - porcentaje) / 100) * (max-min);
    speedTime = valorMilisegundos;
    if(isWorking) start.click();
})

function hide(param){
    if(param == "pause"){
        pause.style = "display:none"
        start.style = "display:block"
        isWorking = false;
    }else if(param = "start"){
        start.style = "display:none"
        pause.style = "display:block"
        isWorking = true;
    }
}