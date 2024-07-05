let date = crearDate();
let conteoId;
let clientes = 0;
let ventas = 0;
let totalVentas = 0;
let idCompra = 1;
let buyList = [];

let separador = "                 ";
let textTitulo = "VIVO FECHA: "
let hr = 0;
let seg = 0;
let min = 0;

function cargarInicial(){
    document.getElementById("panel").style.display = "none";
    document.getElementById("formCliente").style.display = "none";
    document.getElementById("stop").style.display = "none";
    document.getElementById("finish").style.display = "none";
    document.getElementById("titulo").textContent = textTitulo + date;
    actualizarTotales();
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
    let live = new LiveEntity(date, 100, totalVentas, ventas, clientes, date);
    let compras = construirCompras(live);
    let vivo = new VivoDto(live, compras);
    console.log(vivo);
    crearVivo(vivo);
}

class LiveEntity {
    constructor(liveDate, duration, totalAmount, totalBuy, totalClient, limitPayDate){
        this.liveDate = liveDate;
        this.duration = duration;
        this.totalAmount = totalAmount;
        this.totalBuy = totalBuy;
        this.totalClient = totalClient;
        this.limitPayDate = limitPayDate;
    }

}

class Cliente {

    constructor(name, account, phoneNumber, compras, total, status){
        this.name = name;
        this.account = account;
        this.phoneNumber = phoneNumber;
        this.compras = compras;
        this.total = total;
        this.status = status;
    }

}

class Compra{
    constructor(client, amount, codigo){
        this.client = client;
        this.amount = amount;
        this.codigo = codigo;
    }
}

class VivoDto {

    constructor(live, buyList){
        this.live = live;
        this.buyList = buyList;
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
