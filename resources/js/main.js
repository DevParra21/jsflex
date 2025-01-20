/* Objetos literales */
//Clinicas (estos objetos se utilizarán mas adelante para llenar unos comboBoxes)
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
    servicio:"Baño de Mascota",
    montoTotal: 19.99
}
const Reservacion2 ={
    citaID:2,
    nombreMascota:"Magna",
    nombreClinica:"Veterinaria Panda",
    urlClinica:"https://maps.app.goo.gl/juX2atSGG9qgB6Tv5",
    fecha:"18/12/2024",
    hora:"09:00",
    comentario:"test reservacion 2",
    servicio:"Desparacitación",
    montoTotal: 56.99
}
const Reservacion3 ={
    citaID:3,
    nombreMascota:"Totti",
    nombreClinica:"Veterinaria ANIMED",
    urlClinica:"https://maps.app.goo.gl/juX2atSGG9qgB6Tv5",
    fecha:"02/03/2025",
    hora:"15:30",
    comentario:"test reservacion 3",
    servicio:"Vacunación",
    montoTotal: 105.69
}

/*-----------------------------*/

/* Arreglos */
//Clinicas (estos objetos se utilizarán mas adelante para llenar unos comboBoxes)
const Clinicas=[Clinica1,Clinica2,Clinica3]

//Servicios (estos objetos se utilizarán mas adelante para llenar unos comboBoxes)
const Servicios=[Servicio1,Servicio2,Servicio3]

//Reservaciones (estos objetos se utilizarán mas adelante para llenar unos comboBoxes)
const Reservaciones=[Reservacion1,Reservacion2,Reservacion3]

/*-----------------------------*/

/* Variables globales */
const citasContainer = document.getElementById("gridCitas")
const reservacionContainer = document.getElementById("reservacionContainer")
const mascotaContainer = document.getElementById("mascotaContainer")

function init(){
    
    citasContainer.style.display = 'none'
    reservacionContainer.style.display='none'
    mascotaContainer.style.display='none'

    inicializarServiciosContainer(Servicios)
    inicializarReservacionesContainer(Reservaciones)
}
/*Inicializar controles de servicios*/
let serviciosContainer = document.getElementById("containerServicios")
let reservacionesContainer = document.getElementById("containerReservaciones")

function inicializarServiciosContainer(serviciosArray){
    serviciosArray.forEach(element => {
      const checkbox = document.createElement("div")
      checkbox.innerHTML=`<input type="checkbox" class="btn-check" id="checkServicio${element.id}">
        <label class="btn btn-outline-primary" for="checkServicio${element.id}">${element.nombre} - $ ${element.precio}</label>`
        serviciosContainer.appendChild(checkbox)
    })
}

function inicializarReservacionesContainer(reservacionesArray){
    reservacionesArray.forEach(element =>{
        const tableRow = document.createElement("tr")
        tableRow.innerHTML = `<th scope="row">${element.citaID}</th>
            <td>${element.nombreMascota}</td>
            <td>${element.fecha} - ${element.hora}</td>
            <td>${element.nombreClinica}</td>
            <td><button class="btn btn-sm btn-primary ver-reservacion">ver</button></td>`
        reservacionesContainer.appendChild(tableRow)
    })
}
    
function agregarCita(){
    //Ciclo para pedir el nombre de la mascota ya que es requerido para la reservación.
    let nombreMascota = ""
    while(nombreMascota == "") {
        nombreMascota = prompt("Bienvenido!\nAgregue el nombre de su mascota porfavor:")
    
        if(validarCampoTexto(nombreMascota)) {
            console.log("Se requiere un nombre de mascota. Intente de nuevo")
            alert("Se requiere un nombre de mascota. Intente de nuevo")
        }
        else{
            console.log("Nombre de Mascota: " + nombreMascota)
        }
    }

    //Ciclo para pedir el nombre de la clínica ya que es requerido para la reservación.
    let nombreClinica =""
    while(nombreClinica == "") {
        nombreClinica = prompt("Escriba el nombre de la Clínica donde desea agendar")

        if(validarCampoTexto(nombreClinica)) {
            console.log("Se requiere un nombre de Clínica. Intente de nuevo")
            alert("Se requiere un nombre de Clínica. Intente de Nuevo")
        }else{
            console.log("Nombre de Clinica: " + nombreClinica)
        }
    }

    //Funcion para mostrar lista de servicios disponibles y seleccion del usuario.
    let idServicio = 0
    let servicioSeleccionado = null
    while(idServicio == 0){
        let mensajeServicios=""
        for(let servicio of Servicios){
            mensajeServicios += "\n" + servicio.id  + " - Servicio: " + servicio.nombre + " - precio: $" + servicio.precio
        }
        idServicio = prompt("Seleccione un servicio:" + mensajeServicios + "\nEscriba el numero de Servicio que desea seleccionar.")

        if(validarServicio(idServicio) == -1){
            idServicio = 0
            console.log("El número de servicio seleccionado no existe. Intente de nuevo.")
            alert("El número de servicio seleccionado no existe. Intente de nuevo")
        }
        else
        {
            servicioSeleccionado = obtenerDatosServicio(idServicio)
            console.log("Nombre de Servicio: " + servicioSeleccionado.nombre)
            console.log("Precio de Servicio: " + servicioSeleccionado.precio)
        }
    }

    //Crear reservación
    let resumenReservacion = crearResumenReservacion(nombreMascota, nombreClinica, servicioSeleccionado.nombre, servicioSeleccionado.precio)
    if(confirm(resumenReservacion + "\n¿Está seguro que desea agendar?")){
        agregarReservacion(nombreMascota, nombreClinica, servicioSeleccionado.nombre, servicioSeleccionado.precio)
    } else {
        alert("Se canceló la reservación.")
    }
}

//Funcion para concatenar los valores seleccionados por el usuario para la reservacion.
function crearResumenReservacion(nombreMascota, nombreClinica, nombreServicio, precioServicio){
    return "Datos de Reservación:" + "\nNombre de Mascota: " + nombreMascota + "\nNombre de Clínica: " + nombreClinica + "\nServicio: " + nombreServicio + "\nPrecio total: $" + precioServicio
}

//Funcion para validar que el valor del campo sea/contenga texto
function validarCampoTexto(dato){
    return (dato == "")
}

//Funcion para obtener el objeto dentro del array, de acuerdo al input del usuario. Retorna el índice del objeto. si el valor retornado es -1, significa que no se encontró el objeto.
function validarServicio(servicio){
    console.log("Servicio seleccionado por el usuario: " + servicio)
    let indice = Servicios.findIndex(e => e.id === parseInt(servicio))
    console.log("indice de objeto en el arreglo Servicios: " + indice)
    return indice
}

//Funcion para obtener el objeto seleccionado, dentro del array. Esto función es llamada despues de verificar que sí exista el objeto en el array.
function obtenerDatosServicio(idServicio){
    return Servicios.find(e => e.id === parseInt(idServicio))
}

//Funcion para procesar los datos seleccionados por el usuario y crear la reservación nueva.
function agregarReservacion(nombreMascota,nombreClinica,nombreServicio,costoServicio) {
    const nuevaReservacion ={
        citaID: Reservaciones.length+1,
        nombreMascota: nombreMascota,
        nombreClinica: nombreClinica,
        servicio: nombreServicio,
        montoTotal: costoServicio
    }

    Reservaciones.push(nuevaReservacion)

    alert("Nueva Reservacion Agregada. Presione el botón OK para ver las citas existentes...")
    imprimirListaReservaciones(Reservaciones)
}

//Funcion para imprimir la lista de reservaciones existentes.
function imprimirListaReservaciones(Reservaciones){
    let stringReservaciones=""

    for(let reservacion of Reservaciones) {
        stringReservaciones += "ID cita: " + reservacion.citaID + "\nNombre de Mascota: " + reservacion.nombreMascota+"\nNombre de Clínica: " + 
            reservacion.nombreClinica+"\nServicio seleccionado: " + reservacion.servicio + "\nCosto Total: $" + reservacion.montoTotal +"\n__________________\n"
    }
    console.log(stringReservaciones)
    alert(stringReservaciones + "\n\n" + "Presione el botón OK para regresar al menú principal" )
}


init()

const btnAgregarCita = document.getElementById("btnAgregarCita")
btnAgregarCita.onclick = () =>{
    reservacionContainer.style.display = reservacionContainer.style.display === 'none' ? '' : 'none'
}
const btnAgregarMascota = document.getElementById("btnAgregarMascota")
btnAgregarMascota.onclick = () =>{
    mascotaContainer.style.display = mascotaContainer.style.display === 'none' ? '' : 'none'
    btnReservAgregarMascota.disabled = (mascotaContainer.style.display === '')
}

const btnReservAgregarMascota = document.getElementById("btnReservAgregarMascota")
btnReservAgregarMascota.onclick = () =>{
    mascotaContainer.style.display = mascotaContainer.style.display === 'none' ? '' : 'none'
    btnReservAgregarMascota.disabled = (mascotaContainer.style.display === '')
}


const btnVerCitas = document.getElementById("btnVerCitas")
btnVerCitas.onclick = () =>{
    citasContainer.style.display = citasContainer.style.display === 'none' ? '' : 'none'
}


