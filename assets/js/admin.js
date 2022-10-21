
/****LOGIN****/

const loguinBody = document.getElementById("loguinBody");
const login = document.getElementById("login");
function go(){

    if (document.form.password.value=='admin' && document.form.login.value=='admin'){ 
            accede(); 
        } 
        else{ 
            //alert("Porfavor ingrese, nombre de usuario y contraseña correctos."); 
            Swal.fire({
                icon: 'error',
                text: 'Usuario o Contraseña INCORRECTOS!',
                confirmButtonText: 'Intentar otra vez',
                confirmButtonColor: '#4484CE',
                })
        } 
    } 

function accede () {
    document.getElementById ("loguinBody").classList.remove("d-none");
    document.getElementById ("login").classList.add("d-none");
}


/****Potenciales clientes****/

const contenderoPotencialesClientes = document.getElementById("contenderoPotencialesClientes");

function potencialClienteActual () {
    contenderoPotencialesClientes.innerHTML = "";
    let itemPotencialclienteActual = document.createElement ("div");
    arrayClientesPotenciales.forEach(element => {
        itemPotencialclienteActual.innerHTML += `
                                                <div class="adminBoxItem d-flex px-5 me-5 py-2 my-4 justify-content-between align-items-center">
                                                    <div>
                                                        <div class="d-flex flex-column justify-content-between">
                                                            <h5 class="adminContactoNombre">${element.nombre}</h5>
                                                            <h5 class="">${element.email}</h5>
                                                        </div>
                                                        <p class="me-2">Presupuesto cubrir ${element.cantPintura} Mts2 con Pintura ${element.tipoPintura}</p>
                                                    </div>
                                                    <div>
                                                        <img onClick="borrarPotencialCliente(${element.id})" src="../assets/img/tacho.png" alt="borrar">
                                                    </div>
                                                </div>
                                                `
    });
    contenderoPotencialesClientes.appendChild(itemPotencialclienteActual);
    localStorage.setItem("clientePotenciales", JSON.stringify(arrayClientesPotenciales));
}

potencialClienteActual ();

const borrarPotencialCliente = (id) => {
    const itemPotencialCliente = arrayClientesPotenciales.find(arrayClientesPotenciales => arrayClientesPotenciales.id === id);
    arrayClientesPotenciales.splice(arrayClientesPotenciales.indexOf(itemPotencialCliente),1);
    console.log (arrayClientesPotenciales);
    potencialClienteActual();
}

/****Compras****/

const contenedorCompras = document.getElementById("contenedorCompras");

function comprasAdmin () {

    contenedorCompras.innerHTML = ``;
for (let element of arrayCompras) {

    const arrayProductosComprados = element.carrito;
    

        let total = 0;
        arrayProductosComprados.forEach(prod => {
            total += prod.precio * prod.cantidad;
        })
        //console.log (total);
        const montoCompra = total;
    

    let itemCompra = document.createElement ("div");
    itemCompra.innerHTML = `
                            <div class="adminBoxItem d-flex px-5 me-5 py-4 my-4 justify-content-between align-items-center">
                                <div class="col-3">
                                    <h5>Pedido # ${element.id} </h5>
                                    <h5 class="personaCompra">${element.apellido} ${element.nombre}</h5>
                                    <h5 class="personaCompra">${element.mail}</h5>
                                    <h5 class="personaCompra">${element.tel}</h5>
                                    <h5 class="personaCompra">${element.formaPago} </h5>
                                </div>
                                <div class="col-8">
                                    <div class="detalleCompra col-11 d-flex justify-content-between">
                                        <h5>Monto de compra</h5>
                                        <h5>$${montoCompra}.-</h5>
                                    </div>
                                    <div>
                                        <ul id="detalleCompra${element.id}">

                                        </ul>
                                    </div>
                                </div>
                                <div class="adminImgConsulta">
                                    <img class="" onClick="borrarCompra(${element.id})" src="../assets/img/tacho.png" alt="borrar">
                                </div>
                            </div>
                            `
    contenedorCompras.appendChild(itemCompra);
    
    const detalleCompra = document.getElementById(`detalleCompra${element.id}`);

    for (let e of arrayProductosComprados) {
        
        let itemDetalleCompra = document.createElement ("li");
        itemDetalleCompra.innerHTML += `
                                    <div class="detalleCompra d-flex justify-content-between me-5 my-3">
                                        <div class="col-8">
                                            <h3>${e.tipoDeProducto} ${e.marca} ${e.tipo}</h3>
                                            <div class="d-flex justify-content-between">
                                                <h5>detalle: ${e.nombre}</h5>
                                                <h5>cant ${e.cantidad} x $${e.precio} c/u</h5>
                                            </div>
                                        </div>
                                        <div>
                                            <h4>$${e.precio*e.cantidad}.-</h4>
                                        </div>

                                    </div>
                                        `
        detalleCompra.appendChild(itemDetalleCompra);
    }
} 

}

const borrarCompra = (id) => {
    const itemCompra = arrayCompras.find (arrayCompras => arrayCompras.id === id);
    arrayCompras.splice(arrayCompras.indexOf(itemCompra),1);
    localStorage.setItem("compras", JSON.stringify(arrayCompras));
    comprasAdmin();
    console.log(arrayCompras);
}

comprasAdmin();

for (let elem of arrayCompras) {
    let compraId = elem.id;

    if (compraId === 0) {
        borrarCompra(0);
    }
}

/****Contultas****/

const contenedorConsultas = document.getElementById('contenedorConsultas');

function consultasAdmin () {
    contenedorConsultas.innerHTML = "";
    let itemConsultas = document.createElement ("div");
    arrayConsultas.forEach(element => {
        itemConsultas.innerHTML += `
                                    <div class="adminBoxItem d-flex px-5 me-5 py-2 my-4 justify-content-between align-items-center">
                                        <div class="col-11">
                                            <div>
                                                <h5>${element.apellido}, ${element.nombre}</h5>
                                            </div>
                                            <div>
                                                <p>${element.consulta} </p>
                                            </div>
                                            <div class="d-flex justify-content-between">
                                                <h5 class="col-5">${element.mail}</h5>
                                                <h5 class="col-5">${element.telefono}</h5>
                                            </div>
                                        </div>
                                        <div>
                                            <img onClick="borrarConsulta(${element.id})" src="../assets/img/tacho.png" alt="borrar">
                                        </div>
                                    </div>
                                    `
    });
    contenedorConsultas.appendChild(itemConsultas);
    localStorage.setItem("consultas", JSON.stringify(arrayConsultas));
}

consultasAdmin ();

const borrarConsulta = (id) => {
    const itemConsulta = arrayConsultas.find (arrayConsultas => arrayConsultas.id === id);
    arrayConsultas.splice(arrayConsultas.indexOf(itemConsulta),1);
    consultasAdmin();
}

