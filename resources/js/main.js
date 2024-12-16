/* Objetos literales */
//Clinicas (estos objetos se utilizarán mas adelante para llenar unos comboBoxes)
const ClinicaDefault ={
    id:0,
    nombre:"Seleccione una Clínica...",
    urlDireccion:""
}

const Clinica1 = {
    id : 1,
    nombre:"Pethouse Caprove",
    urlDireccion:"https://maps.app.goo.gl/GTi9YhjZpfxsiBhs8"
}

const Clinica2 = {
    id:2,
    nombre:"Veterinaria Panda",
    urlDireccion:"https://maps.app.goo.gl/hbNtE7i7wExRxbt47"
}

const Clinica3={
    id:3,
    nombre:"Veterinaria ANIMED",
    urlDireccion: "https://maps.app.goo.gl/6SDsiu4TTiezH7ov7"
}

//Servicios (estos objetos se utilizarán mas adelante para llenar unos comboBoxes)
const Servicio1 ={
    id:1,
    nombre:"Baño de Mascota",
    precio:19.99
}

const Servicio2 = {
    id:2,
    nombre:"Desparacitación",
    precio:56.99
}

const Servicio3 = {
    id:3,
    nombre:"Vacunación",
    precio:105.69
}

//Reservaciones (estos objetos se utilizarán mas adelante para llenar unos comboBoxes)
const Reservacion1 ={
    citaID:1,
    nombreMascota:"Shadow",
    nombreClinica:"Pethouse Caprove",
    urlClinica:"https://maps.app.goo.gl/juX2atSGG9qgB6Tv5",
    fecha:"01/01/2025",
    hora:"11:30",
    comentario:"test reservacion 1",
    servicio:"",
    montoTotal:99.00
}
const Reservacion2 ={
    citaID:2,
    nombreMascota:"Magna",
    nombreClinica:"Veterinaria Panda",
    urlClinica:"https://maps.app.goo.gl/juX2atSGG9qgB6Tv5",
    fecha:"18/12/2024",
    hora:"09:00",
    comentario:"test reservacion 2",
    servicio:"",
    montoTotal:15.69
}
const Reservacion3 ={
    citaID:3,
    nombreMascota:"Totti",
    nombreClinica:"Veterinaria ANIMED",
    urlClinica:"https://maps.app.goo.gl/juX2atSGG9qgB6Tv5",
    fecha:"02/03/2025",
    hora:"15:30",
    comentario:"test reservacion 3",
    servicio:"",
    montoTotal:25.29
}

/*-----------------------------*/

/* Arreglos */
//Clinicas (estos objetos se utilizarán mas adelante para llenar unos comboBoxes)
const Clinicas=[ClinicaDefault,Clinica1,Clinica2,Clinica3]

//Servicios (estos objetos se utilizarán mas adelante para llenar unos comboBoxes)
const Servicios=[Servicio1,Servicio2,Servicio3]

//Reservaciones (estos objetos se utilizarán mas adelante para llenar unos comboBoxes)
const Reservaciones=[Reservacion1,Reservacion2,Reservacion3]

/*-----------------------------*/

/* Variables globales */

window.onload = (event) => {
    let mensajeBienvenida="Simulador de Citas médicas para mascotas. \nEl proposito de este simulador es diseñar una aplicación para que los usuarios puedan facilmente agendar citas ya sean médicas o estéticas, en las Clinicas disponibles."
    alert(mensajeBienvenida + "\nHaga clic en el botón OK para continuar.")

    console.log(mensajeBienvenida)
    
    for(let i=0; i<Reservaciones.length; i++) {
        console.log("Reservación ejemplo:\n ID cita: " + Reservaciones[i].citaID + "\nNombre de Mascota: " + Reservaciones[i].nombreMascota+"\nNombre de Clínica: " + 
            Reservaciones[i].nombreClinica+"\nServicio seleccionado: " + Reservaciones[i].servicio + "\nCosto Total: $" + Reservaciones[i].montoTotal  )
    }

    let nombreMascota = ""
    while(nombreMascota == "" || nombreMascota == null) {
        nombreMascota = prompt("Agregue el nombre de su mascota")

        if(validarCampoTexto(nombreMascota)) {
            console.log("Se requiere un nombre de mascota. Intente de nuevo")
        }
        else{
            console.log("Nombre de Mascota: " + nombreMascota)
        }
    }
    

    let nombreClinica =""
    while(nombreClinica == "" || nombreClinica == null) {
        nombreClinica = prompt("Escriba el nombre de la clínica donde desea agendar")

        if(validarCampoTexto(nombreClinica)) {
            console.log("Se requiere un nombre de Clínica. Intente de nuevo")
        }else{
            console.log("Nombre de Clinica: " + nombreClinica)
        }
    }

    let servicio = 0
    while(servicio == 0 || servicio == null ){
        let mensajeServicios=""
        for(let i=0; i< Servicios.length; i++){
            mensajeServicios += "\n" + Servicios[i].id  + " - Servicio: " + Servicios[i].nombre + " - precio: $" + Servicios[i].precio
        }
        servicio = prompt("Seleccione un servicio:" + mensajeServicios + "\nEscriba el numero de Servicio que desea seleccionar.")

        if(validarCampoNumerico(servicio))
            console.log("Este campo es requerido. Por favor seleccione un servicio.")
        else if(validarServicio(servicio) == -1){
            servicio = 0
            console.log("El numero de servicio seleccionado no existe. Intente de nuevo.")
        }

    }

    if(confirm("¿Esta seguro que desea agendar?")){
        agregarReservacion(nombreMascota, nombreClinica)
        alert("Nueva Reservacion Agregada.")
    }

    function validarCampoTexto(dato){
        return (dato == "" || dato == null)
    }

    function validarCampoNumerico(numero){
        return (numero == 0 || numero == null)
    }

    function validarServicio(servicio){
        let indice = Servicios.indexOf( e => e.id === servicio)
        console.log(indice)
        return indice
    }

    function agregarReservacion(nombreMascota,nombreClinica,nombreServicio,costoServicio) {
        const nuevaReservacion ={
            citaID: Reservaciones.length+1,
            nombreMascota: nombreMascota,
            nombreClinica: nombreClinica,
            servicio: nombreServicio,
            montoTotal: costoServicio
        }

        Reservaciones.push(nuevaReservacion)

        console.log(Reservaciones)
    }
}


