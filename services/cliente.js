var estadosCompra = ["Abierta", "Cerrada", "Cancelada", "Informada", "Pagada", "Entregada"];

function crearCliente(compras, total) {
    let inputNombre = document.getElementById("nombre").value;
    let inputCuenta = document.getElementById("cuenta").value;
    let inputtelefono = document.getElementById("telefono").value;

    //validacion de los input
    let resultado = validarContenido(inputNombre);
    if(resultado){
    //elementos que componen al cliente***********************************************
    return generarCliente(0, inputNombre, compras, total, inputCuenta, inputtelefono, "Abierta");
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
    let contenedorCliente = document.getElementById("itemsClientes");
    //contendor completo
    for(let item of contenedorCliente.children){
        console.log(item);
        //cliente
        for(let cliente of item.children){
            //elementos de la cabecera del cliente
            for(let elemt of cliente.children) {
                if(elemt.getAttribute("type") == "checkbox" && elemt.checked){
                    clientes -= 1;
                    contenedorCliente.removeChild(item);
                }
            }
        }
    }
    actualizarTotales();
}

function editarCliente(){
    let inputNombre = document.getElementById("nombre");
    let inputCuenta = document.getElementById("cuenta");
    let inputtelefono = document.getElementById("telefono");
    let contenedorCliente = document.getElementById("itemsClientes");
    let btonCrear = document.getElementById("crear");
    let btonEliminar = document.getElementById("eliminar");
    let btonModificar = document.getElementById("editar");

    if(btonCrear.style.display == ''){
        btonCrear.style.display = "none";
        btonEliminar.style.display = "none";
        btonModificar.textContent = "Guardar";

    //contendor completo
    for(let item of contenedorCliente.children){
        //cliente
        for(let cliente of item.children){
            let name;
            let cuenta;
            let telefono;
            let select = false;
            //elementos de la cabecera del cliente
            for(let elemt of cliente.children) {
                if(elemt.getAttribute("type") == "label" && select){
                    let list = elemt.textContent.split(' ');
                    console.log(list);
                    inputNombre.value = list[2];
                    inputCuenta.value = list[5];
                    inputtelefono.value = list[8];
                }
                if(elemt.getAttribute("type") == "checkbox" && elemt.checked){
                    select = true;
                }

            }
        }
    }
    } else {
        btonCrear.style.display = '';
        btonEliminar.style.display = '';
        btonModificar.textContent = "Editar";
    //contendor completo
    for(let item of contenedorCliente.children){
        //cliente
        for(let cliente of item.children){
            let name;
            let cuenta;
            let telefono;
            let select = false;
            //elementos de la cabecera del cliente
            for(let elemt of cliente.children) {
                if(elemt.getAttribute("type") == "label" && select){
                    let list = elemt.textContent.split(' ');
                    console.log(list);
                    list[2] = inputNombre.value;
                    list[5] = inputCuenta.value;
                    list[8] = inputtelefono.value;
                    elemt.textContent = list.join(" ");
                }
                if(elemt.getAttribute("type") == "checkbox" && elemt.checked){
                    select = true;
                }

            }
        }

    }
    limpiarInput()
    }
}

function limpiarListaDeClientes(){
    let contenedorCliente = document.getElementById("itemsClientes");
    while (contenedorCliente.firstChild){
        console.log(contenedorCliente.firstChild);
        contenedorCliente.removeChild(contenedorCliente.firstChild);
      };
}

document.addEventListener("keyup",e =>{
    if(e.target.matches("#buscador")){
        for(let element of document.getElementById("itemsClientes").children) {
            element.getAttribute("id").toLowerCase().includes(e.target.value.toLowerCase())
            ? element.classList.remove("filtro")
            : element.classList.add("filtro");
        }
    }
})

document.addEventListener("change", e => 
    {
    let contenedorCliente = document.getElementById("itemsClientes");
    
    for(let cliente of contenedorCliente.children){
        for(let elemt of cliente.children) {
            if(elemt.getAttribute("id").includes("encabezado")) {
                for(let chil of elemt.children) {
                    isThis = false;
                    if(e.target.matches("#" + chil.getAttribute("id"))) {
                        const seleccionado = e.target.value;
                        if(seleccionado == "Abierta") {
                            habilitarCompras(cliente);
                            editarSelect(seleccionado, chil);
                        } else {
                            if(verificarEstadoComprasCliente(cliente)) {
                                inhabilitarCompras(cliente);
                                editarSelect(seleccionado, chil);
                            } else {
                                e.target.value = "Abierta"
                            }
                        }
                        actualizarEstadoCliente(getNameFormClient(cliente), e.target.value);
                    }
                }
            }
        
        }
    }
})

function editarSelect(seleccionado, chil){
    for(let opt of chil){
        switch(seleccionado){
            case "Cancelada":
                if(opt.value == "Informada" || opt.value == "Abierta"){
                    opt.style.display = ""; 
                } else {
                    opt.style.display = "none";
                }
            break;
            case "Informada":
                if(opt.value == "Pagada" || opt.value == "Entregada" || opt.value == "Abierta"){
                    opt.style.display = "";
                } else {
                    opt.style.display = "none"; 
                }
            break;
            case "Pagada":
                if(opt.value == "Entregada"){
                    opt.style.display = "";
                } else {
                    opt.style.display = "none"; 
                }
            break;
            case "Entregada":
                opt.style.display = "none";
            break;
            default:
                opt.style.display = "";
            break;
        }
    }
}

function crearEncabezadoCliente(id, nombre, cuenta, telefono, cantCompras, total, estado){
    console.log(nombre, cuenta, telefono, cantCompras, total, estado);
    return generarCliente(id, nombre, cantCompras, total, cuenta, telefono, estado);
}

function generarCliente(id, nombre, compras, total, cuenta, telefono, estado) {
    client = new Cliente(nombre, cuenta, telefono, compras, total, estado, id);
    console.log(client);
    idName = nombre.toString().replace(" ", "");
    let contenedorCliente = document.getElementById("itemsClientes");
    let elementoCliente = document.createElement("div");
    let elementoEncabezado = document.createElement("div");
    let elementoLabel = document.createElement("label");
    let elementoInput = document.createElement("input");
    let statusElement = document.createElement("select");


    //botones de eliminar y crear compras
    let btonagregarCompra = document.createElement("button");
    let eliminarCompra = document.createElement("button");
    let mostrarCompra = document.createElement("button");
    btonagregarCompra.textContent = "+";
    eliminarCompra.textContent = "-";
    mostrarCompra.textContent = "\/";
    btonagregarCompra.setAttribute("id", "btnAgregarCompra");
    eliminarCompra.setAttribute("id", "btnEliminarCompra");
    mostrarCompra.setAttribute("id", "btnMostrarCompra");
    //btonagregarCompra.addEventListener("onclick", agregarCompra(client));
    btonagregarCompra.setAttribute("onclick", "agregarCompra("+ idName +")");
    mostrarCompra.setAttribute("onclick", "ocultarCompras("+ idName +")")
    //texto y checkbox del cliente
    let totales = separador + " - Compras: " + compras + " - Total: " + total + " ";  
    elementoLabel.textContent = " Nombre: " + nombre +" - Cuenta: "+ cuenta +" - Telefono: "+ telefono + totales;
    elementoLabel.setAttribute("id", idName + "label");
    elementoLabel.setAttribute("class", "cliente");
    elementoLabel.setAttribute("type", "label");
    elementoInput.setAttribute("type", "checkbox");
    elementoInput.setAttribute("id", idName + "check");

    for(var i=0 ; i < estadosCompra.length ; i++){
        statusElement.options[i] = new Option(estadosCompra[i]);
    }

    //crear boton de cliente
    statusElement.setAttribute("id","selectStatus-"+  idName);
    statusElement.setAttribute("class","selectStatus");
    elementoEncabezado.setAttribute("id", idName + " " + "encabezado");
    elementoEncabezado.appendChild(elementoInput);
    elementoEncabezado.appendChild(elementoLabel);
    elementoEncabezado.appendChild(btonagregarCompra);
    elementoEncabezado.appendChild(eliminarCompra);
    elementoEncabezado.appendChild(mostrarCompra);
    elementoEncabezado.appendChild(statusElement);
    
    //div contenedor de cada cliente
    elementoCliente.appendChild(elementoEncabezado);
    elementoCliente.setAttribute("id", idName);

    //contenedor de todos los clientes
    if(contenedorCliente.firstChild) {
    contenedorCliente.insertBefore(elementoCliente, contenedorCliente.firstChild);
    } else {
        contenedorCliente.appendChild(elementoCliente);
    }

    if(!!estado){
        statusElement.value = estado;
        editarSelect(estado, statusElement);
    }
    
    agregarCliente(client);
    limpiarInput();
    actualizarTotales();
    window.scrollTo(0,0);
    return elementoCliente;
}

function getNameFormClient(cliente) {
    
    for(let element of cliente.children) {
        if(element.getAttribute("id").includes("encabezado")) {
            for(let elemt of element.children) { 
                console.log(elemt); 
                if(elemt.getAttribute("type") == "label") {
                    return elemt.getAttribute("id").replace("label", "");
                }
            }
        }
    }
}
