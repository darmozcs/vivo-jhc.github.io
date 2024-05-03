
let date = new Date().toLocaleDateString();
let conteoId;
let clientes = 0;
let ventas = 0;
let totalVentas = 0;

let textTitulo = "VIVO FECHA: "
let hr = 0;
let seg = 0;
let min = 0;

function cargarInicial(){
    document.getElementById("titulo").textContent = textTitulo + date;
    actualizarTotales();
}

function comenzarReloj(){
    conteoId = setInterval(ticTac, 1000);
}

function detener(){
    clearInterval(conteoId);
}

function finalizar(){
    clearInterval(conteoId);
    hr = 0;
    seg = 0;
    min = 0;
    let hora = String(hr).padStart(2, "0");
    let minutos = String(min).padStart(2, "0");
    let segundos = String(seg).padStart(2, "0");

    let textoHora = hora + ":" + minutos + ":" + segundos;
    document.getElementById("reloj").textContent = textoHora;
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
    let hora = String(hr).padStart(2, "0");
    let minutos = String(min).padStart(2, "0");
    let segundos = String(seg).padStart(2, "0");

    let textoHora = hora + ":" + minutos + ":" + segundos;
    document.getElementById("reloj").textContent = textoHora;
}

function actualizarTotales(){
    document.getElementById("ventas").textContent += ventas + " $";
    document.getElementById("totalVentas").textContent += totalVentas + " $";
    document.getElementById("totalclientes").textContent += clientes;
}

function crearCliente() {
    //encontrar contenedor por su id
    let elementoContenedor = document.getElementById(contenedorID);

    //loop para crear tantas tiendas como se pidan
    for(let conteoTiendas=1; conteoTiendas<=cantidadTiendas; conteoTiendas++) {

        //crear el texto de label para poder llamar a la funcion
        let textoEtiqueta = "Tienda " + conteoTiendas;

        //crear tiendas con crearParrafoTienda
        let parrafoTienda = crearParrafotienda(textoEtiqueta, min);

        //agregar el parrafo al contenedor
        elementoContenedor.appendChild(parrafoTienda);
    }
}
