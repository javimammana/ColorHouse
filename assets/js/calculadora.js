const arrayParedes = [];
const arrayClientesPotenciales = [];
const arrayRendimiento = [];

function recuperarClientePotencial () {
    if(localStorage.getItem("clientePotenciales")) {
        let clientePotencialJSON = JSON.parse(localStorage.getItem("clientePotenciales"))
        for (let i = 0; i < clientePotencialJSON.length; i++) {
            arrayClientesPotenciales.push(clientePotencialJSON[i]);
        }
    }
}
recuperarClientePotencial();

class PotencialCliente {
    constructor (id, nombre, email, tipoPintura, cantPintura) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.tipoPintura = tipoPintura;
        this.cantPintura = cantPintura;
    }
}
class Medidas {
    constructor (id, altoPared, anchoPared, altoPuerta, anchoPuerta, altoVentana, anchoVentana) {
        this.id = id;
        this.altoPared = altoPared || 0;
        this.anchoPared = anchoPared || 0;
        this.m2pared = altoPared*anchoPared;
        this.altoPuerta = altoPuerta || 0;
        this.anchoPuerta = anchoPuerta || 0;
        this.m2puerta = altoPuerta*anchoPuerta;
        this.altoVentana = altoVentana || 0;
        this.anchoVentana = anchoVentana || 0;
        this.m2ventana = altoVentana*anchoVentana;
        this.m2averturas = this.m2puerta + this.m2ventana;
        this.m2total = this.m2pared - this.m2averturas;
    }
}

class Rendimiento {
    constructor (pintura, cubre) {
        this.pintura = pintura;
        this.cubre = cubre;
    }
}

const latex = new Rendimiento ("latex", 10);
arrayRendimiento.push (latex);

alAgua = new Rendimiento ("alAgua", 13);
arrayRendimiento.push (alAgua);

acrilica = new Rendimiento ("acrilica", 8);
arrayRendimiento.push (acrilica);

sintetica = new Rendimiento ("sintetica", 11);
arrayRendimiento.push (sintetica);

const inicioSimulador = document.getElementById ("inicioSimulador");

function mostrarForm () {
    document.getElementById("btnInicioCalculadora").classList.add("d-none");
    document.getElementById("contenedorSimulador").classList.add("d-flex");
}

const btnCalcular = document.getElementById ("btnCalcular");


function calcularFn () {
    document.getElementById("contenedorSimulador").classList.remove("d-flex");
    document.getElementById ("resultadoCalculadora").classList.add("d-flex");
}


const btnCaptura = document.getElementById ("btnCaptura");
const formuPared = document.getElementById ("formuPared");
const formuPuerta = document.getElementById ("formuPuerta");
const formuVentana = document.getElementById ("formuVentana");
const btnBorrar = document.getElementById ("btnBorrar");
const listaParedes = document.getElementById("listaParedes");



function capturar() {
    const idPared = (arrayParedes.length + 1);
    const altoPared = document.getElementById ("altoPared").value;
    const anchoPared = document.getElementById("anchoPared").value;
    if (altoPared != 0 && anchoPared != 0) {
        const altoPuerta = document.getElementById ("altoPuerta").value;
        const anchoPuerta = document.getElementById ("anchoPuerta").value;

        const altoVentana = document.getElementById ("altoVentana").value;
        const anchoVentana = document.getElementById ("anchoVentana").value;
        

        nuevaPared = new Medidas (idPared, altoPared, anchoPared, altoPuerta, anchoPuerta, altoVentana, anchoVentana);   
        arrayParedes.push (nuevaPared);  
        console.log(arrayParedes.length);
    }
    formuPared.reset();
    formuPuerta.reset();
    formuVentana.reset();
}

function agregarParedes() {
    listaParedes.innerHTML = "";
    arrayParedes.forEach( arrayParedes => {
        const div = document.createElement ("div");
        div.innerHTML = `<div class="paredCalcu my-2 pb-2" id="${arrayParedes.id}">
                            <h5 class="px-3">Pared: ${arrayParedes.id}</h5>
                            <div class="d-flex px-3">
                                <h5 class="col-11">A cubrir ${(arrayParedes.m2total).toFixed(2)}Mts2.-</h5>
                                <div class="col-1">
                                    <img class="img-fluid" onClick = "borrarPared(${arrayParedes.id})" src="./assets/img/tacho.png" alt="Borrar">
                                </div>
                            </div>
                        </div>
                        `
    listaParedes.appendChild(div);
    })
}

const borrarPared = (id) => {
    const pared = arrayParedes.find(arrayParedes => arrayParedes.id === id);
    arrayParedes.splice(arrayParedes.indexOf(pared),1);
    agregarParedes();
}

function calcular() {
    
    const id = arrayClientesPotenciales.length;
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const seleccionDePintura = document.getElementById("seleccionDePintura").value;
    const m2resultado = arrayParedes.reduce ((acumulador, elemento) => acumulador + elemento.m2total, 0).toFixed(2);
    
    const buscarPintura = arrayRendimiento.find (rendi => rendi.pintura === seleccionDePintura);
    const cubreLitros = buscarPintura.cubre

    const rendiLitros = (m2resultado / cubreLitros).toFixed(2);

    console.log (rendiLitros);


    const cliente = new PotencialCliente (id, nombre, email, seleccionDePintura, m2resultado);
    arrayClientesPotenciales.push (cliente);
    localStorage.setItem("clientePotenciales", JSON.stringify(arrayClientesPotenciales));

    console.log (arrayClientesPotenciales);

    const resultadoCalculadoraMensaje = document.getElementById("resultadoCalculadoraMensaje");
    resultadoCalculadoraMensaje.innerHTML = "";
    const div = document.createElement ("div");
        div.innerHTML = `<div class="d-flex justify-content-center col-12">
                            <p class="txtInicioCalculadora col-8 text-center">Hola ${nombre}! Para tu proyecto tenes que cubrir una superficie de ${m2resultado} Mts2, usando pintura ${seleccionDePintura} vas a necesitar ${rendiLitros}Lts. de Pintura.-  </p>
                        </div>
                        `
        resultadoCalculadoraMensaje.appendChild(div);
        
    console.log (m2resultado);
}


refresh1.addEventListener('click', () => {
    location.reload();
});


refresh2.addEventListener('click', () => {
    location.reload();
});

btnCaptura.addEventListener (`click`, () => {
    capturar();
    agregarParedes();
    console.log (arrayParedes);
});

btnCalcular.addEventListener("click", (e) => {
    e.preventDefault();
    capturar();
    agregarParedes();
    calcular();
});
