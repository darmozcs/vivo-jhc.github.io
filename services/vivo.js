let vivoList;

async function buscarVivo() {
    cargarInicial();
    let contenedorCliente = document.getElementById("itemsVivos");
    while (contenedorCliente.firstChild) {
        console.log(contenedorCliente.firstChild);
        contenedorCliente.removeChild(contenedorCliente.firstChild);
      };
    document.getElementById("panel").style.display = "";
    document.getElementById("buscar").style.display = "none";
    document.getElementById("itemsVivos").style.display = "";
    let from = document.getElementById("desde").value;
    let to = document.getElementById("hasta").value;
    vivoList = await getVivo(from, to);
    console.log(vivoList);
    crearListaVivos(vivoList);
}

function crearListaVivos(vivoList) {
    let divVivos = document.getElementById("itemsVivos");

    for(let vivo of vivoList) {
        console.log(vivo);
        let divVivo = document.createElement("div");
        let btonVivo = document.createElement("button");
        btonVivo.setAttribute("onclick", "mostarVivo("+vivo.live.id+")");
        btonVivo.textContent = vivo.live.id + " " +vivo.live.liveDate;
        divVivo.appendChild(btonVivo)
        divVivos.appendChild(divVivo);
    }
}

function mostarVivo(id) {
    decidirFromBuscarVivo(id);
    document.getElementById("buscar").style.display = "";
    document.getElementById("itemsVivos").style.display = "none";
    document.getElementById("itemsClientes").style.display = "";

    for(let vivo of vivoList) {
        if(vivo.live.id == id) {
            console.log(vivo.live.id);
            for(let it of vivo.clientList){
                cliente = crearEncabezadoCliente(it.client.id, it.client.name, it.client.account, it.client.phoneNumber, 0, 0, it.status);
                for(let compra of it.buyList) {
                    crearCompra(cliente, compra.id, compra.codigo, compra.amount, );
                    guardarCompra(cliente, compra.id, 0);
                }
                if(it.status == "Abierta") {
                    habilitarCompras(cliente);
                } else {
                    inhabilitarCompras(cliente);
                }
            }
        }
    }
}