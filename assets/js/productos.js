
const arrayProductos = [];

const arrayCarrito = JSON.parse(localStorage.getItem("carritoLocal")) || []; 

const arrayCompras = JSON.parse(localStorage.getItem("compras")) || [];

class Compra {
    constructor (id, nombre, apellido, mail, tel, formaPago, carrito) {
        this.id = id,
        this.nombre = nombre,
        this.apellido = apellido,
        this.mail = mail,
        this.tel = tel,
        this.formaPago = formaPago,
        this.carrito = carrito
    }
}

function compraAux () {
    const id = 0;
    const nombreCarrito = "aux";
    const apellidoCarrito = "aux";
    const mailCarrito = "aux@aux.com"
    const telCarrito = 3;
    const pagoCarrito = "pago";
    const carritoCompra = "arrayCarrito";

    const compraAux = new Compra (id, nombreCarrito, apellidoCarrito, mailCarrito, telCarrito, pagoCarrito, carritoCompra);
    arrayCompras.push (compraAux);
}

if (arrayCompras == 0) {
    compraAux();
    localStorage.setItem("compras", JSON.stringify(arrayCompras));
    location.reload();
}

console.log (arrayCompras);


const productosURL = "../assets/js/json/productos.json";

//cuerpo carrito
const contenedorCarrito = document.getElementById("contenedorCarrito");
const formularioCompra = document.getElementById("formularioCompra");

//botones
const comprarCarrito = document.getElementById ("comprarCarrito");
const limpiarCarrito = document.getElementById ("limpiarCarrito");
const finalizarCarrito = document.getElementById ("finalizarCarrito");
const volverCarrito = document.getElementById ("volverCarrito");

const totalCompra = document.getElementById ("totalCompra");

const calcularTotalCarrito = () => {
    let total = 0;
    arrayCarrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
    })
    totalCompra.innerHTML = total;
}



for (let element of arrayCarrito) {
    let itemCarrito = document.createElement ("div");
    itemCarrito.innerHTML = `
                            <div id="${element.id}" class="d-flex p-3">
                                <div class="col-3">
                                    <img class="img-fluid" src="${element.imagen}" alt="Azul">
                                </div>
                                <div class="col-8 d-flex flex-column align-items-end px-3">
                                    <h5>${element.nombre}</h5>
                                    <div class="d-flex col-12 justify-content-between">
                                        <div class="d-flex">
                                            <h5 onClick="restarCarrito(${element.id})" class="mx-1">-</h5>
                                            <h5 class="mx-1">${element.cantidad}</h5>
                                            <h5 onClick="agregarAlCarrito(${element.id})" class="mx-1">+</h5>
                                        </div>
                                        <div>
                                            <h5>$${element.precio}.-</h5>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-1">
                                <img onClick="borrarDelCarrito(${element.id})" class="img-fluid" src="../assets/img/tacho.png" alt="Borrar">
                                </div>
                            </div>
                            `
    contenedorCarrito.appendChild(itemCarrito);
    calcularTotalCarrito();
    carritoActual();

}

fetch(productosURL)
    .then(respuesta => respuesta.json())

    .then(datos => {
        datos.forEach ((element) => {
            arrayProductos.push(element)
        })
        datos.forEach (element => {
            carritoActual();
            let itemProducto = document.createElement ("div");
            itemProducto.innerHTML = `
                                        <div class="cardPintura my-5 mx-3 d-flex flex-column align-items-center">
                                            <div class="cardImg">
                                                <img src="${element.imagen}" alt="">
                                            </div>
                                            <div class="cardTexto p-2">
                                                        <h4 class="mb-0">${element.nombre}</h4>
                                                        <h5 class="col-12 text-end my-0">${element.tipo} - ${element.marca}</h5>
                                                    <p>${element.descripcion}</p>
                                                <div class="cardCosto d-flex justify-content-between">
                                                    <h5 class="ms-3">${element.litros} </h5>
                                                    <h4 class="me-2">$${element.precio}</h4>
                                                </div>
                                            </div>
                                            <div  class="mb-2">
                                                <button id="boton${element.id}" class="cardBtn p-1">Agregar</button>
                                            </div>
                                        </div>
                                    `
            contenedorProductos.appendChild(itemProducto);
        
            const boton = document.getElementById(`boton${element.id}`);
            boton.addEventListener ("click", () => {
                agregarAlCarrito (element.id); 
            });
        }
        )
    }

    
)

const agregarAlCarrito = (id) => {
    const producto = arrayProductos.find (arrayProductos => arrayProductos.id === id);
    const enCarrito = arrayCarrito.find (arrayCarrito => arrayCarrito.id === id);
    //simplificacion
    enCarrito ? enCarrito.cantidad ++ : arrayCarrito.push (producto);
    //
    carritoActual();
    //console.log (arrayCarrito);

    Toastify ({
        text: "Agregado al carrito",
        duration: 2000,
        gravity: "bottom",
        position: "right",
        backgroundColor: "#F19F4D",
        offset: {
            y: 30
        },
    }).showToast();
}

const restarCarrito = (id) => {
    const enCarrito = arrayCarrito.find (arrayCarrito => arrayCarrito.id === id);
    //simplificacion
    enCarrito.cantidad > 1 ? enCarrito.cantidad -- : borrarDelCarrito(id);
    //
    carritoActual();
    //console.log (arrayCarrito);
}

function carritoActual () {
    contenedorCarrito.innerHTML = "";
    let itemCarrito = document.createElement ("div");
    arrayCarrito.forEach(element => {
        itemCarrito.innerHTML += `
                                    <div id="${element.id}" class="cardCarrito d-flex p-3 align-items-center">
                                        <div class="col-3">
                                            <img class="" src="${element.imagen}" alt="${element.nombre}">
                                        </div>
                                        <div class="col-8 d-flex flex-column align-items-end px-3">
                                            <h5>${element.nombre}</h5>
                                            <div class="d-flex col-12 justify-content-between">
                                                <div class="d-flex">
                                                    <h5 onClick="restarCarrito(${element.id})" class="mx-1">-</h5>
                                                    <h5 class="mx-1">${element.cantidad}</h5>
                                                    <h5 onClick="agregarAlCarrito(${element.id})" class="mx-1">+</h5>
                                                </div>
                                                <div>
                                                    <h5>$${element.precio}.-</h5>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-1">
                                        <img onClick="borrarDelCarrito(${element.id})" class="img-fluid" src="../assets/img/tacho.png" alt="Borrar">
                                        </div>
                                    </div>
                                    `
    });
    contenedorCarrito.appendChild(itemCarrito);
    calcularTotalCarrito();
    localStorage.setItem("carritoLocal", JSON.stringify(arrayCarrito));

    const totalProductos = arrayCarrito.reduce((acumulador, elemento) => acumulador + elemento.cantidad, 0);
    //console.log(totalProductos);

    const idCantidadCarrito = document.getElementById("idCantidadCarrito");
    idCantidadCarrito.innerHTML = "";
    let cantCarrito = document.createElement ("div");
        cantCarrito.innerHTML = `
                                <h5>${totalProductos}</h5>
                                `
                                idCantidadCarrito.appendChild(cantCarrito);

    arrayCarrito.length === 0 && (contenedorCarrito.innerHTML = "Carrito Vacio.-");
    arrayCarrito.length !== 0 && document.getElementById("totalCarrito").classList.remove("d-none");

} 


function borrarDelCarrito(id) {
    const itemCarrito = arrayCarrito.find(arrayCarrito => arrayCarrito.id === id);
    itemCarrito.cantidad = 1;
    arrayCarrito.splice(arrayCarrito.indexOf(itemCarrito), 1);
    carritoActual();
}


function borrarCarrito () {
    arrayCarrito.splice (0, arrayCarrito.length);
    carritoActual();
    document.getElementById("totalCarrito").classList.add("d-none")
}

limpiarCarrito.addEventListener ("click", () => {
    borrarCarrito ();
});

function nuevaCompra () {

    let mapId = arrayCompras.map((arrayCompras)=> arrayCompras.id);

    let max = Math.max(...mapId);

    const id = max + 1;
    const nombreCarrito = document.getElementById("nombreCarrito").value;
    const apellidoCarrito = document.getElementById("apellidoCarrito").value;
    const mailCarrito = document.getElementById("mailCarrito").value;
    const telCarrito = document.getElementById("telCarrito").value;
    const pagoCarrito = document.querySelector('input[type=radio][name=formaDePago]:checked').value;
    const carritoCompra = arrayCarrito;

    const compra = new Compra (id, nombreCarrito, apellidoCarrito, mailCarrito, telCarrito, pagoCarrito, carritoCompra);
    arrayCompras.push (compra);
    localStorage.setItem("compras", JSON.stringify(arrayCompras));

}


function volverACarrito () {
    document.getElementById("contenedorCarrito").classList.remove("d-none");
    document.getElementById("formularioCompra").classList.add("d-none");
    document.getElementById("comprarCarrito").classList.remove("d-none");
    document.getElementById("finalizarCarrito").classList.add("d-none");
    document.getElementById("limpiarCarrito").classList.remove("d-none");
    document.getElementById("volverCarrito").classList.add("d-none");
}

function pasoACompra () {
    document.getElementById("contenedorCarrito").classList.add("d-none");
    document.getElementById("formularioCompra").classList.remove("d-none");
    document.getElementById("comprarCarrito").classList.add("d-none");
    document.getElementById("finalizarCarrito").classList.remove("d-none");
    document.getElementById("limpiarCarrito").classList.add("d-none");
    document.getElementById("volverCarrito").classList.remove("d-none");
}

volverCarrito.addEventListener ("click", () => {
    volverACarrito ();
});

comprarCarrito.addEventListener ("click", () => {
    pasoACompra ();
});

finalizarCarrito.addEventListener ("click", () => {
    nuevaCompra ();
    borrarCarrito ();
    volverACarrito ();
    formCompra.reset();
    Swal.fire({
        title: "Reservamos tus productos!",
        text: "Vas a recibir un link de pago en tu correo para finalizar la compra.",
        icon: "success",
        showConfirmButton: false,
        backdrop: "#60616399"
    })
    setTimeout(() => {
        location.reload();
    }, 2000);
});
