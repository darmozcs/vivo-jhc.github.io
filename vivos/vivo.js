let vivoList;

async function buscarVivo(){
    let contenedorCliente = document.getElementById("itemsClientes");
    while (contenedorCliente.firstChild){
        console.log(contenedorCliente.firstChild);
        contenedorCliente.removeChild(contenedorCliente.firstChild);
      };
    document.getElementById("panel").style.display = "";
    document.getElementById("buscar").style.display = "none";
    let from = document.getElementById("desde").value;
    let to = document.getElementById("hasta").value;
    vivoList = await getVivo(from, to);
    console.log(vivoList);
    crearListaVivos(vivoList);
}

function crearListaVivos(vivoList){

    let divVivos = document.getElementById("itemsClientes");
    
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

function mostarVivo(id){
    
    for(let vivo of vivoList) {
        if(vivo.live.id == id){
            console.log(vivo.live.id);
            for(let it of vivo.clientList){
                cliente = crearEncabezadoCliente(it.client.name, it.client.account, it.client.phoneNumber, it.total.totalBuy, it.total.totalAmount, it.status);
                for(let compra of it.buyList) {
                    crearCompra(cliente, compra.id, compra.codigo, compra.amount, );
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