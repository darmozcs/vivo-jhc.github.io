
function agregarCompra(cliente, idCompra){
    mostrarCompras(cliente);
    crearCompra(cliente, idCompra);
    idCompra += 1;
}


function editarCompra(cliente, idCompra){
    let monto = document.getElementById(cliente.getAttribute("id") +"-"+ idCompra +"-"+"monto");
    let nombre = document.getElementById(cliente.getAttribute("id") +"-"+ idCompra +"-"+"nombre");
    let btonGuardar = document.getElementById(cliente.getAttribute("id") +"-"+ idCompra +"-"+"guardar");
    let origen = document.getElementById(cliente.getAttribute("id") +"-"+ idCompra +"-"+"origen");
    btonGuardar.textContent = "Guardar";
    btonGuardar.setAttribute("onclick", "guardarCompra("+cliente.getAttribute("id")+","+idCompra+","+monto.valueAsNumber+")");
    monto.disabled = false;
    nombre.disabled = false;
    origen.disabled = false;
}

function guardarCompra(cliente, idCompra, montoActualizado) {
    let monto = document.getElementById(cliente.getAttribute("id") +"-"+ idCompra +"-"+"monto");
    if(monto.value != ""){
        console.log("Actulizando");
    let nombre = document.getElementById(cliente.getAttribute("id") +"-"+ idCompra +"-"+"nombre");
    let origen = document.getElementById(cliente.getAttribute("id") +"-"+ idCompra +"-"+"origen");
    let btonGuardar = document.getElementById(cliente.getAttribute("id") +"-"+ idCompra +"-"+"guardar");
    btonGuardar.textContent = "Editar";
    btonGuardar.setAttribute("onclick", "editarCompra("+cliente.getAttribute("id")+","+idCompra+")");
    monto.disabled = true;
    nombre.disabled = true;
    origen.disabled = true;

    if(montoActualizado == 0) {
    ventas += 1;
    }
    totalVentas += monto.valueAsNumber - montoActualizado;

    for(let elemt of cliente.children) {
        console.log(elemt);
        if(elemt.getAttribute("id") == cliente.getAttribute("id") + " encabezado") {
            for(let chil of elemt.children){
                if(chil.getAttribute("type") == "label" && montoActualizado == 0) {
                    let list = chil.textContent.split(' ');
                    list[28] = Number(list[28]) + 1;
                    chil.textContent = list.join(" ");
                }
                if(chil.getAttribute("type") == "label") {
                    let list = chil.textContent.split(' ');
                    list[31] = Number(list[31]) + monto.valueAsNumber - montoActualizado;
                    chil.textContent = list.join(" ");
                }
            }
        }
    }
    actualizarTotales();
    } else {
        alert("No se puede agregar un compra sin monto.");
    }
}

function eliminarCompra(cliente, idCompra) {
    let compra = document.getElementById(cliente.getAttribute("id") +"-"+ idCompra);
    let monto = document.getElementById(cliente.getAttribute("id") +"-"+ idCompra +"-"+"monto");
    let btonGuardar = document.getElementById(cliente.getAttribute("id") +"-"+ idCompra +"-"+"guardar");
    if(btonGuardar.textContent == "Editar") {
    ventas -= 1;
    totalVentas -= monto.valueAsNumber;
    for(let elemt of cliente.children) {
        if(elemt.getAttribute("id") == cliente.getAttribute("id") + "encabezado"){
            for(let chil of elemt.children){
                if(chil.getAttribute("type") == "label") {
                    let list = chil.textContent.split(' ');
                    list[28] = Number(list[28]) - 1;
                    chil.textContent = list.join(" ");
                }
                if(chil.getAttribute("type") == "label") {
                    let list = chil.textContent.split(' ');
                    list[31] = Number(list[31]) - monto.valueAsNumber;
                    chil.textContent = list.join(" ");
                }
            }
        }
    }
    actualizarTotales();
}
    cliente.removeChild(compra);
}

function ocultarCompras(cliente){
    let clientediv = document.getElementById(cliente.getAttribute("id"));
    for(let element of clientediv.children){
        if(element.getAttribute("class") == "compra" && element.style.display == ""){
            element.style.display = "none";
        } else if(element.getAttribute("class") == "compra" && element.style.display == "none"){
            element.style.display = "";
        }
    }
}

function mostrarCompras(cliente) {
    let clientediv = document.getElementById(cliente.getAttribute("id"));
    for(let element of clientediv.children){
        element.style.display = "";
    }
}

function inhabilitarCompras(cliente){
    for(let element of cliente.children){
        if(element.getAttribute("class") == "compra"){
            for(let item of element.children){
                if(item.getAttribute("type") == "button"){
                    item.style.display = "none";
                }
            }
        } else{
            for(let item of element.children){
                if(item.getAttribute("id") == "btnAgregarCompra" || item.getAttribute("id") == "btnEliminarCompra"){
                    item.style.display = "none";
                }
            }
        }
    }
}


function habilitarCompras(cliente){
    for(let element of cliente.children){
        if(element.getAttribute("class") == "compra"){
            for(let item of element.children){
                if(item.getAttribute("type") == "button"){
                    item.style.display = "";
                    console.log(item);
                }
            }
        } else{
            for(let item of element.children){
                if(item.getAttribute("id") == "btnAgregarCompra" || item.getAttribute("id") == "btnEliminarCompra"){
                    item.style.display = "";
                    console.log(item);
                }
            }
        }
    }
}

function construirCompras(live){
    console.log(live);
    let list;
    let status;
    let client;
    let listaCompras = [];
    let contenedorCliente = document.getElementById("itemsClientes");
    for(let cliente of contenedorCliente.children) {
        for(let elemt of cliente.children) {
            if(elemt.getAttribute("id").includes("encabezado")){
                
                for(let cont of elemt.children){
                    console.log(cont);
                    if(cont.getAttribute("type") == "label"){
                        list = cont.textContent.split(' ');
                    }
                    if(cont.getAttribute("class") == "selectStatus"){
                        status = cont.value;
                    }
                }
                client = new Cliente(list[2], list[5], list[8], list[28], list[31], status);
            } else {
                let monto;
                let nombre;
                for(let cont of elemt.children) {
                    console.log(cont);
                    if(cont.getAttribute("id") != null && cont.getAttribute("id").includes("monto")) {
                        monto = cont.valueAsNumber;
                    }
                    if(cont.getAttribute("id") != null && cont.getAttribute("id").includes("nombre")) {
                        nombre = cont.value;
                    }
                }
                listaCompras.push(new Compra(client,monto, nombre));
            }
        
        }
    }
    return listaCompras;
}

function crearCompra(cliente, idCompra, nombre, monto, origen){

    let atrbIdCompra = cliente.getAttribute("id") + "-" + idCompra;
    let divCompra = document.createElement("div");
    let labelNombre = document.createElement("label");
    let inputNombre = document.createElement("input");
    let labelMonto = document.createElement("label");
    let inputMonto = document.createElement("input");
    let labelOrigen = document.createElement("label");
    let inputOrigen = document.createElement("input");
    let btonGuardar = document.createElement("button");
    let btonEliminar = document.createElement("button");

    divCompra.setAttribute("id", atrbIdCompra);
    divCompra.setAttribute("class", "compra");
    labelNombre.textContent = " Código: ";
    labelMonto.textContent = " Monto: ";
    btonGuardar.textContent = " Guardar";
    labelOrigen.textContent = " Dueño: ";
    btonGuardar.setAttribute("onclick", "guardarCompra("+cliente.getAttribute("id")+","+idCompra+","+ 0 +")");
    btonEliminar.setAttribute("onclick", "eliminarCompra("+cliente.getAttribute("id")+","+idCompra+")");
    btonEliminar.textContent = " Eliminar";
    btonGuardar.setAttribute("type", "button");
    btonEliminar.setAttribute("type", "button");
    
    btonGuardar.setAttribute("id", atrbIdCompra + "-" +"guardar");
    inputNombre.setAttribute("id", atrbIdCompra + "-" +"nombre");
    inputMonto.setAttribute("id", atrbIdCompra + "-" +"monto");
    inputOrigen.setAttribute("id", atrbIdCompra + "-" +"origen");
    inputMonto.setAttribute("type", "number");
    if(monto != "" && monto != null) {
        inputNombre.value = nombre;
        inputMonto.value = monto;
        inputOrigen.value = origen;
    }
    divCompra.appendChild(labelNombre);
    divCompra.appendChild(inputNombre);
    divCompra.appendChild(labelMonto);
    divCompra.appendChild(inputMonto);
    divCompra.appendChild(labelOrigen);
    divCompra.appendChild(inputOrigen);
    divCompra.appendChild(btonGuardar);
    divCompra.appendChild(btonEliminar);
    cliente.appendChild(divCompra);
}