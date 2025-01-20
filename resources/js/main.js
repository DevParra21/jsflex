/* Objetos literales */

//Mascotas
const Mascota1 = {
    id:1,
    nombre:"Shadow",
    edad:10,
    tipo:"Perro",
    descripcion:"Negro con marcas blancas, tamaño medio. le tiene miedo al agua"
}
const Mascota2 = {
    id:2,
    nombre:"Magna",
    edad:2,
    tipo:"Perro",
    descripcion:"Color beige, tamaño medio. Muy inquieta."
}
const Mascota3 = {
    id:3,
    nombre:"Suky",
    edad:4,
    tipo:"Perro",
    descripcion:"Tamaño pequeño, color blanco. Muy tranquila"
}

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
//Mascotas
const Mascotas =[Mascota1,Mascota2,Mascota3]

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
let total=0.00

function init(){
    
    citasContainer.style.display = 'none'
    reservacionContainer.style.display='none'
    mascotaContainer.style.display='none'

    inicializarServiciosContainer(Servicios)
    inicializarReservacionesContainer(Reservaciones)

    inicializarComboBoxMascotas(Mascotas)
    inicializarComboBoxClinicas(Clinicas)

    totalLabel.innerHTML = `Total: $${total}`
}
/*Inicializar controles de servicios*/
let serviciosContainer = document.getElementById("containerServicios")
let reservacionesContainer = document.getElementById("containerReservaciones")
let mascotasCombobox = document.getElementById("cbMascota")
let clinicaCombobox = document.getElementById("cbClinica")
let totalLabel = document.getElementById("lblTotal")

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
        tableRow.innerHTML = `<th scope="row">${element.citaID.toString().padStart(5,'0')}</th>
            <td>${element.nombreMascota}</td>
            <td>${element.fecha} - ${element.hora}</td>
            <td><a href="${element.urlClinica}" target="_blank">${element.nombreClinica}</a></td>
            <td><button class="btn btn-sm btn-primary ver-reservacion">ver</button></td>`
        reservacionesContainer.appendChild(tableRow)
    })
}

function inicializarComboBoxMascotas(mascotasArray){
    mascotasCombobox.innerHTML=`
        <option value="0">...</option>
        ${mascotasArray.map(mascota => `<option value="${mascota.id}">${mascota.nombre} (${mascota.tipo}; edad: ${mascota.edad} años)`)}
    `

}

function inicializarComboBoxClinicas(clinicasArray){
    clinicaCombobox.innerHTML=`
        <option value="0">...</option>
        ${clinicasArray.map(clinica =>`<option value="${clinica.id}">${clinica.nombre}</option>`)}
    `
}
    
//Funcion para validar que el valor del campo sea/contenga texto
function validarCampoTexto(dato){
    return (dato == "")
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
}



init()

//logica para boton de Agregar Cita: muestra/oculta formulario
const btnAgregarCita = document.getElementById("btnAgregarCita")
btnAgregarCita.onclick = () =>{
    reservacionContainer.style.display = reservacionContainer.style.display === 'none' ? '' : 'none'
}

//logica para botones de Agregar Mascota: muestra/oculta formulario
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

//logica para boton de Ver citas: muestra/oculta tabla con records
const btnVerCitas = document.getElementById("btnVerCitas")
btnVerCitas.onclick = () =>{
    citasContainer.style.display = citasContainer.style.display === 'none' ? '' : 'none'
}


