
function comenzarReloj(){
    let btonStart = document.getElementById("start");
    let btonStop = document.getElementById("stop");
    let btonFinsh = document.getElementById("finish");
    btonStart.textContent = "Comenzar";
    btonStop.textContent = "Detener";
    btonFinsh.textContent = "Terminar";
    conteoId = setInterval(ticTac, 1000);
    document.getElementById("panelVivo").style.display = "none";
    document.getElementById("start").style.display = "none";
    document.getElementById("formCliente").style.display = "";
    document.getElementById("panel").style.display = "";
    document.getElementById("stop").style.display = "";
    document.getElementById("finish").style.display = "";
    document.getElementById("buscar").style.display = "";
    hr = 0;
    seg = 0;
    min = 0;
    clientes = 0;
    ventas = 0;
    totalVentas = 0;
    idCompra = 1;
    limpiarListaDeClientes();
    setearReloj(hr, min, seg);
    actualizarTotales();
}

function detener(){
    clearInterval(conteoId);
    document.getElementById("stop").style.display = "none";
    let btonStart = document.getElementById("start");
    btonStart.textContent = "Continuar";
    btonStart.setAttribute("onclick", "continuar()");
    document.getElementById("start").style.display = "";
}

function finalizar(){
    let btonStart = document.getElementById("start");
    let btonStop = document.getElementById("stop");
    let btonFinsh = document.getElementById("finish");
    btonStart.textContent = "Guardar";
    btonStop.textContent = "Reiniciar";
    btonFinsh.textContent = "Eliminar";
    btonStart.style.display = "";
    btonStop.style.display = "";
    btonStop.setAttribute("onclick", "comenzarReloj()");
    btonStart.setAttribute("onclick", "guardarVivo()");
    btonFinsh.setAttribute("onclick", "reiniciar()");
    document.getElementById("formCliente").style.display = "none";
    clearInterval(conteoId);
}

function ticTac(){
    if(seg == 59){
        seg = 0;
        if(min == 59){
            min = 0;
            hr = hr + 1;
        } else {
            min = min + 1;
        }
    } else {
        seg = seg + 1;
    }
    setearReloj(hr, min, seg)
}

function setearReloj(hr, min, seg){
    let hora = String(hr).padStart(2, "0");
    let minutos = String(min).padStart(2, "0");
    let segundos = String(seg).padStart(2, "0");

    let textoHora = hora + ":" + minutos + ":" + segundos;
    document.getElementById("reloj").textContent = textoHora;
}

function continuar(){
    document.getElementById("stop").style.display = "";
    document.getElementById("start").style.display = "none";
    conteoId = setInterval(ticTac, 1000);
}