async function crearVivo(vivo){
    try{
        let respuesta = await fetch("http://localhost:8081/liveshop/fullcreate",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vivo)
        })
        if(respuesta.ok) {
            console.log("Vivo guardado con exito.");
            alert("Vivo guardado con exito.")
        } else {
            console.error(respuesta);
        }
    } catch(error) {
        console.error("Error al crearVivo:", error);
    }
}

async function getVivo(from, to){
    try{
        let respuesta = await fetch("http://localhost:8081/liveshop/between",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: from,
                to: to,
            })
        })
        if(respuesta.ok) {
            console.log("Busqueda exitosa.");
            let data = await respuesta.json();
            console.log(data);
            return data;
        } else {
            console.error("Busqueda no exitosa.");
        }
    } catch(error) {
        console.error("Error al buscarVivo:", error);
    }
}

async function enviarActualizacionVivo(vivo){
    try{
        let respuesta = await fetch("http://localhost:8081/liveshop",{
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(vivo)
        })
        if(respuesta.ok) {
            console.log("Vivo guardado con exito.");
            alert("Vivo guardado con exito.")
        } else {
            console.error(respuesta);
        }
    } catch(error) {
        console.error("Error al crearVivo:", error);
    }
}