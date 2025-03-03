let date = crearDate();
let conteoId;
let clientes = 0;
let ventas = 0;
let totalVentas = 0;
let buyList = [];

let separador = "                 ";
let textTitulo = "VIVO FECHA: "
let hr = 0;
let seg = 0;
let min = 0;

let clientList = [];
let compraList = [];

function cargarInicial(){
    document.getElementById("panel").style.display = "none";
    document.getElementById("formCliente").style.display = "none";
    document.getElementById("itemsClientes").style.display = "none";
    document.getElementById("stop").style.display = "none";
    document.getElementById("finish").style.display = "none";
    document.getElementById("titulo").textContent = textTitulo + date;
    actualizarTotales();
    clientList = [];
    compraList = [];
}

function actualizarTotales(){
    document.getElementById("ventas").textContent ="Ventas: "+ ventas;
    document.getElementById("totalVentas").textContent ="Total: "+ totalVentas + " $";
    document.getElementById("totalclientes").textContent ="Clientes: "+ clientes;
}

function limpiarInput(){
    document.getElementById("nombre").value = '';
    document.getElementById("cuenta").value = '';
    document.getElementById("telefono").value = '';
}

function guardarVivo(){
    if(verificarEstadoComprasTodosClientes()) {
        console.log(compraList);
        
        let live = new LiveEntity(date, 100, totalVentas, ventas, clientes, date);
        let vivo = new VivoDto(live, compraList);
        console.log(vivo);
        crearVivo(vivo);
    }
}

function actualizarVivo(id) {
    if(verificarEstadoComprasTodosClientes()) {
        console.log(id)  
        let live = new LiveEntity(date, 100, totalVentas, ventas, clientes, date, id);
        let vivo = new VivoDto(live, compraList);
        console.log(vivo);
        enviarActualizacionVivo(vivo);
    }
}

function reiniciar(){
    console.log("Reiniciando");
    location.reload()
}

function crearDate(){
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday;
}

function buildClient() {
    crearCliente(0,0)
}

function agregarCliente(client) {
    clientes += 1;
    clientList.push(client);
    
}

function agregarCompraCliente(nombre, idCompra, codigo, monto, origen) {
    compraList = compraList.filter(item => item.idCompra !== idCompra);
    
    for(client of clientList) {
        if(client.name == nombre) {
            console.log(client);
            compraList.push(new Compra(client,monto, codigo, idCompra));
        }
    }
}

function eliminarCompraCliente(idCompra) {
    compraList = compraList.filter(item => item.idCompra !== idCompra);
}

function actualizarEstadoCliente(nombre, estado) {
    console.log(nombre);
    
    clientList.forEach(cliente =>{
        if(cliente.name === nombre){
            cliente.status = estado;
        }
    })

    compraList.forEach(element => {
        if(element.client.name === nombre){
            element.client.status = estado;
        }
    });

    console.log(clientList);
    console.log(compraList);
}

function actualizarTotalesCliente(nombre, compras, total) {
    console.log(nombre+" "+ compras +" "+ total);
    for(client of clientList) {
        if(client.name == nombre) {
            client.compras = compras;
            client.total = total;
        } 
    }
}