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
    precio:20
}

const Servicio2 = {
    id:2,
    nombre:"Desparacitación",
    precio:350
}

const Servicio3 = {
    id:3,
    nombre:"Vacunación",
    precio:700
}

//Reservaciones (estos objetos se utilizarán mas adelante para llenar unos comboBoxes)
// const Reservacion1 ={
//     citaID:1,
//     nombreMascota:"Shadow",
//     nombreClinica:"Pethouse Caprove",
//     urlClinica:"https://maps.app.goo.gl/juX2atSGG9qgB6Tv5",
//     fecha:"01/01/2025",
//     hora:"11:30",
//     comentario:"test reservacion 1",
//     servicio:"Baño de Mascota",
//     montoTotal: 19.99
// }
// const Reservacion2 ={
//     citaID:2,
//     nombreMascota:"Magna",
//     nombreClinica:"Veterinaria Panda",
//     urlClinica:"https://maps.app.goo.gl/juX2atSGG9qgB6Tv5",
//     fecha:"18/12/2024",
//     hora:"09:00",
//     comentario:"test reservacion 2",
//     servicio:"Desparacitación",
//     montoTotal: 56.99
// }
// const Reservacion3 ={
//     citaID:3,
//     nombreMascota:"Totti",
//     nombreClinica:"Veterinaria ANIMED",
//     urlClinica:"https://maps.app.goo.gl/juX2atSGG9qgB6Tv5",
//     fecha:"02/03/2025",
//     hora:"15:30",
//     comentario:"test reservacion 3",
//     servicio:"Vacunación",
//     montoTotal: 105.69
// }

/*-----------------------------*/

/* Arreglos */

//Clinicas (estos objetos se utilizarán mas adelante para llenar unos comboBoxes)
const Clinicas=[Clinica1,Clinica2,Clinica3]

//Servicios (estos objetos se utilizarán mas adelante para llenar unos comboBoxes)
const Servicios=[Servicio1,Servicio2,Servicio3]

//Reservaciones (estos objetos se utilizarán mas adelante para llenar unos comboBoxes)
 let Reservaciones=[]

/*-----------------------------*/

/* Variables globales */
const citasContainer = document.getElementById("gridCitas")
const reservacionContainer = document.getElementById("reservacionContainer")
const mascotaContainer = document.getElementById("mascotaContainer")
let total=0.00
let textServiciosSeleccionados=""

function init(){
    
    citasContainer.style.display = 'none'
    reservacionContainer.style.display='none'

    inicializarServiciosContainer(Servicios)

    Reservaciones = JSON.parse(localStorage.getItem("reservations")) 
    renderReservacionesContainer(Reservaciones)

    inicializarComboBoxClinicas(Clinicas)

    totalLabel.innerHTML = `Total: $${total}`
}
/*Inicializar controles de servicios*/
let serviciosContainer = document.getElementById("containerServicios")
let reservacionesContainer = document.getElementById("containerReservaciones")
let mascotasCombobox = document.getElementById("cbMascota")
let clinicaCombobox = document.getElementById("cbClinicaReservacion")
let totalLabel = document.getElementById("lblTotal")

function inicializarServiciosContainer(serviciosArray){
    serviciosArray.forEach(element => {
      const checkbox = document.createElement("div")
      checkbox.innerHTML=`<input type="checkbox" class="btn-check" id="checkServicio${element.id}" value="${element.precio}">
        <label class="btn btn-outline-primary" for="checkServicio${element.id}">${element.nombre} - $ ${element.precio}</label>`
        serviciosContainer.appendChild(checkbox)
    })
}

function renderReservacionesContainer(reservacionesArray){
    reservacionesArray.forEach(element =>{
        const tableRow = document.createElement("tr")
        tableRow.innerHTML = `<td scope="row"><b>${element.citaID.toString().padStart(5,'0')}</b></td>
            <td>${element.nombreMascota}</td>
            <td>${element.fecha} - ${element.hora}</td>
            <td><a href="${element.urlClinica}" target="_blank">${element.nombreClinica}</a></td>
            <td>${element.servicio} - $${element.montoTotal}</td>`
        reservacionesContainer.appendChild(tableRow)
    })
}

function inicializarComboBoxClinicas(clinicasArray){
    clinicaCombobox.innerHTML=`
        <option value="0">...</option>
        ${clinicasArray.map(clinica =>`<option value="${clinica.urlDireccion}">${clinica.nombre}</option>`)}
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
function agregarReservacion(nombreMascota,nombreClinica,urlClinica, fechaReservacion, horaReservacion, nombreServicio,costoServicio) {
    const nuevaReservacion ={
        citaID: Reservaciones.length+1,
        nombreMascota: nombreMascota,
        nombreClinica: nombreClinica,
        urlClinica:urlClinica,
        fecha:fechaReservacion,
        hora:horaReservacion,
        servicio: nombreServicio,
        montoTotal: costoServicio
    }
    Reservaciones.push(nuevaReservacion)

    localStorage.setItem("reservations",JSON.stringify(Reservaciones))

    clearTableData()
    renderReservacionesContainer(Reservaciones)   
}

function clearTableData(){
    thRows = document.querySelectorAll("td")
    thRows.forEach(element =>{
        element.remove()
    })
}


init()

//logica para boton de Agregar Cita: muestra/oculta formulario
const btnAgregarCita = document.getElementById("btnAgregarCita")
btnAgregarCita.onclick = () =>{
    reservacionContainer.style.display = reservacionContainer.style.display === 'none' ? '' : 'none'
}


//logica para boton de Ver citas: muestra/oculta tabla con records
const btnVerCitas = document.getElementById("btnVerCitas")
btnVerCitas.onclick = () =>{
    citasContainer.style.display = citasContainer.style.display === 'none' ? '' : 'none'
}


const btnReservar = document.getElementById("btnReservar")
btnReservar.onclick = () =>{
    let errorMessage=""

    let nombreMascota = document.getElementById("tbNombreMascota").value
    if(nombreMascota == "")
        errorMessage+="Nombre de mascota es requerido. \n"

    let fechaReservacion = document.getElementById("dtFechaReservacion").value
    if(fechaReservacion == "")
        errorMessage+="Fecha de Reservacion es requerido. \n"
        
    let horaReservacion = document.getElementById("cbHorarioReservacion").options[document.getElementById("cbHorarioReservacion").selectedIndex].text
    let urlClinica = document.getElementById("cbClinicaReservacion").options[document.getElementById("cbClinicaReservacion").selectedIndex].value
    let nombreClinica = document.getElementById("cbClinicaReservacion").options[document.getElementById("cbClinicaReservacion").selectedIndex].text

    if(!checkServicio1.checked && !checkServicio2.checked && !checkServicio3.checked){
        //error - debe seleccionar por lo menos un servicio
        errorMessage += "debe seleccionar por lo menos un servicio." 
    }
    else{
        if(checkServicio1.checked){
            const servicio = this.obtenerDatosServicio(1)
            textServiciosSeleccionados = "Servicio 1: " + servicio.nombre + "\n"
        }
        if(checkServicio2.checked){
            const servicio = this.obtenerDatosServicio(2)
            textServiciosSeleccionados += "Servicio 2: " + servicio.nombre + "\n"
        }
        if(checkServicio3.checked){
            const servicio = this.obtenerDatosServicio(3)
            textServiciosSeleccionados += "Servicio 3: " + servicio.nombre + "\n"
        }
    }

    if(errorMessage === "")
    {
        agregarReservacion(nombreMascota,nombreClinica,urlClinica,fechaReservacion,horaReservacion,textServiciosSeleccionados,total)
        appendAlert('Reservación guardada con éxito. Haga clic en Ver Citas Programadas para ver la nueva reservación', 'success')
    }else{
        appendAlert(errorMessage, 'danger')
    }
    
}

let checkServicio1 = document.querySelector("#checkServicio1")
checkServicio1.addEventListener("change", function(){
    console.log("check changed: " + this.checked)
    if(this.checked){
        total += parseInt(checkServicio1.value)
    }else{
        total -= parseInt(checkServicio1.value)
    }

    totalLabel.innerHTML = `Total: $${total}`
})

let checkServicio2 = document.querySelector("#checkServicio2")
checkServicio2.addEventListener("change", function(){
    console.log("check changed: " + this.checked)
    if(this.checked){
        total += parseInt(checkServicio2.value)

    }else{
        total -= parseInt(checkServicio2.value)
    }

    totalLabel.innerHTML = `Total: $${total}`
})

let checkServicio3 = document.querySelector("#checkServicio3")
checkServicio3.addEventListener("change", function(){
    console.log("check changed: " + this.checked)
    if(this.checked){
        total += parseInt(checkServicio3.value)
    }else{
        total -= parseInt(checkServicio3.value)
    }

    totalLabel.innerHTML = `Total: $${total}`
})


//logica para activar alerta de confirmacion de reservacion exitosa
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <span><b>${message}</b></span>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}



