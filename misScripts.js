
let date = new Date().toLocaleDateString();
let conteoId;
let clientes = 0;
let ventas = 0;
let totalVentas = 0;

let separador = "                 ";
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
    setearReloj(hr, min, seg)
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

function actualizarTotales(){
    document.getElementById("ventas").textContent ="Ventas: "+ ventas + " $";
    document.getElementById("totalVentas").textContent ="Total: "+ totalVentas + " $";
    document.getElementById("totalclientes").textContent ="Clientes: "+ clientes;
}

function crearCliente() {
    let compras = 0;
    let total = 0;
    let contenedorCliente = document.getElementById("itemsClientes");
    let inputNombre = document.getElementById("nombre").value;
    let inputCuenta = document.getElementById("cuenta").value;
    let inputtelefono = document.getElementById("telefono").value;

    //validacion de los input
    let resultado = validarContenido(inputNombre);
    if(resultado){
    clientes += 1;
    //elementos que componen al cliente
    let elementoCliente = document.createElement("div");
    let elementoEncabezado = document.createElement("button");
    let elementoLabel = document.createElement("label");
    let elementoInput = document.createElement("input");

    //botones de eliminar y crear compras
    let agregarCompra = document.createElement("button");
    let eliminarCompra = document.createElement("button");
    let mostrarCompra = document.createElement("button");
    agregarCompra.textContent = "+";
    eliminarCompra.textContent = "-";
    mostrarCompra.textContent = "\/";
    agregarCompra.setAttribute("id", "btnAgregarCompra");
    eliminarCompra.setAttribute("id", "btnEliminarCompra");
    mostrarCompra.setAttribute("id", "btnMostrarCompra");
    //texto y checkbox del cliente
    let totales = separador + " - Compras: " + compras + " - Total: " + total + " ";  
    elementoLabel.textContent = " Nombre: " + inputNombre +" - Cuenta: "+ inputCuenta +" - Telefono: "+ inputtelefono + totales;
    elementoLabel.setAttribute("id", inputNombre);
    elementoInput.setAttribute("type", "checkbox");
    elementoInput.setAttribute("id", inputNombre);

    //crear boton de cliente
    elementoEncabezado.setAttribute("id", "clienteRow");
    elementoEncabezado.appendChild(elementoInput);
    elementoEncabezado.appendChild(elementoLabel);
    elementoEncabezado.appendChild(agregarCompra);
    elementoEncabezado.appendChild(eliminarCompra);
    elementoEncabezado.appendChild(mostrarCompra);
    
    //div contenedor de cada cliente
    elementoCliente.appendChild(elementoEncabezado);
    //contenedor de todos los clientes
    contenedorCliente.appendChild(elementoCliente);
    actualizarTotales();
    }
}

function validarContenido(inputNombre){

    if(inputNombre === ""){
        alert("El campo nombre es obligatorio.")
        return false;
    } else {
        return true;
    }
}

function eliminarCliente() {
    clientes -= 1;
    actualizarTotales();
}
