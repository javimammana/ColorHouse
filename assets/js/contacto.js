
const arrayConsultas = [];

function recuperarConsultas () {
    if(localStorage.getItem("consultas")) {
        let consultasJSON = JSON.parse(localStorage.getItem("consultas"))
        for (let i = 0; i < consultasJSON.length; i++) {
            arrayConsultas.push(consultasJSON[i]);
        }
    }
}

recuperarConsultas();

class NuevaConsulta {
    constructor (id, nombre, apellido, mail, telefono, consulta) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.mail = mail;
        this.telefono = telefono;
        this.consulta = consulta;
    }
}

const formContacto = document.getElementById("formContacto");

formContacto.addEventListener ("submit", (e) => {
    e.preventDefault();

    const id = arrayConsultas.length;
    const nombreContacto = document.getElementById ("nombreContacto").value;
    const apellidoContacto = document.getElementById ("apellidoContacto").value;
    const mailContacto = document.getElementById ("mailContacto").value;
    const telefonoContacto = document.getElementById ("telefonoContacto").value;
    const consultaContacto = document.getElementById ("consultaContacto").value;

    const consulta = new NuevaConsulta (id, nombreContacto, apellidoContacto, mailContacto, telefonoContacto, consultaContacto);
    arrayConsultas.push (consulta);
    localStorage.setItem("consultas", JSON.stringify(arrayConsultas));

    console.log (arrayConsultas);

    formContacto.reset();
    consultaEnviada();

})

const formBtn = document.getElementById("formBtn");

formBtn.addEventListener("click", () => {
    Swal.fire({
        title: "Consulta enviada!",
        text: "Te responderemos a la brevedad.",
        icon: "success",
        confirmButtonColor: "#F19F4D",
        confirmButtonText: "Aceptar",
        backdrop: "#60616399"
    })
})


