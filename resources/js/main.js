let Reservaciones=[]

/* Variables globales */
const citasContainer = document.getElementById("gridCitas")
const reservacionContainer = document.getElementById("reservacionContainer")
const mascotaContainer = document.getElementById("mascotaContainer")
let total=0.00
let textServiciosSeleccionados=""

/*Inicializar controles de servicios*/
let serviciosContainer = document.getElementById("containerServicios")
let reservacionesContainer = document.getElementById("containerReservaciones")
let mascotasCombobox = document.getElementById("cbMascota")
let clinicaCombobox = document.getElementById("cbClinicaReservacion")
let totalLabel = document.getElementById("lblTotal")

function init(){
    
    citasContainer.style.display = 'none'
    reservacionContainer.style.display = 'none'

    inicializarComboBoxClinicas()
    inicializarServiciosContainer()

    if(localStorage.getItem("reservations"))
    {
        Reservaciones = JSON.parse(localStorage.getItem("reservations")) 
        renderReservacionesContainer(Reservaciones)
    }
    totalLabel.innerHTML = `Total: $${total}`
}

init()

let servicios=[]
function inicializarServiciosContainer(){
    fetch("./resources/db/servicios.json").then(response => response.json()).then(data => {
        servicios = data
        data.forEach(element => {
          const checkbox = document.createElement("div")
          checkbox.innerHTML=`<input type="checkbox" class="btn-check" id="checkServicio${element.id}" value="${element.precio}">
            <label class="btn btn-outline-primary" for="checkServicio${element.id}">${element.nombre} - $ ${element.precio}</label>`
            serviciosContainer.appendChild(checkbox)
        })
    }).finally(_ =>{
        //Verificar si se seleccionó el checkbox de Servicio 1.
        let checkServicio1 = document.querySelector("#checkServicio1")
        checkServicio1.addEventListener("change", function(){
            if(this.checked){
                total += parseInt(checkServicio1.value)
            }else{
                total -= parseInt(checkServicio1.value)
            }

            totalLabel.innerHTML = `Total: $${total}`
        })

        //Verificar si se seleccionó el checkbox de Servicio 2.
        let checkServicio2 = document.querySelector("#checkServicio2")
        checkServicio2.addEventListener("change", function(){
            if(this.checked){
                total += parseInt(checkServicio2.value)

            }else{
                total -= parseInt(checkServicio2.value)
            }

            totalLabel.innerHTML = `Total: $${total}`
        })

        //Verificar si se seleccionó el checkbox de Servicio 3.
        let checkServicio3 = document.querySelector("#checkServicio3")
        checkServicio3.addEventListener("change", function(){
            if(this.checked){
                total += parseInt(checkServicio3.value)
            }else{
                total -= parseInt(checkServicio3.value)
            }

            totalLabel.innerHTML = `Total: $${total}`
        })
    })     
}

function inicializarComboBoxClinicas(){
    fetch("./resources/db/clinicas.json").then(response => response.json()).then(data =>{
        clinicaCombobox.innerHTML=`
            <option value="0">...</option>
            ${data.map(el =>`<option value="${el.urlDireccion}">${el.nombre}</option>`)}`
    })
}




    
//Funcion para validar que el valor del campo sea/contenga texto
function validarCampoTexto(dato){
    return (dato == "")
}


//Funcion para obtener el objeto seleccionado, dentro del array. Esto función es llamada despues de verificar que sí exista el objeto en el array.
function obtenerDatosServicio(idServicio){
    return servicios.find(e => e.id === parseInt(idServicio))
}



//limpiar Tabla de Reservaciones antes de volver a renderizar
function clearTableData(){
    thRows = document.querySelectorAll("td")
    thRows.forEach(element =>{
        element.remove()
    })
}

//limpiar controles despues de haber finalizado reservacion
function clearReservationData(){
    document.getElementById("tbNombreMascota").value = ""
    document.getElementById("dtFechaReservacion").value =""
    document.getElementById("cbHorarioReservacion").selectedIndex = 0
    document.getElementById("cbClinicaReservacion").selectedIndex = 0
}




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

//Inicio de Proceso de Reservacion.
const btnReservar = document.getElementById("btnReservar")
btnReservar.onclick = () =>{
    try{
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
        if(errorMessage != "")
            throw new Error(errorMessage)

        agregarReservacion(nombreMascota,nombreClinica,urlClinica,fechaReservacion,horaReservacion,textServiciosSeleccionados,total).then(data =>{
            clearReservationData()
            AlertaReservacionExitosa()
            appendAlert(`Reservación ${data.nuevaReservacion.citaID.toString().padStart(5,'0')} generada con éxito. Haga clic en Ver Citas Programadas para ver la nueva reservación`, 'success')
        })
        
    }
    catch(err){
        AlertaErrorReservacion(err)
        appendAlert(err, 'danger')
    }
}




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

  let ocultarMensaje = setTimeout(() =>{
    wrapper.style.display = 'none'
  },5000)
}



