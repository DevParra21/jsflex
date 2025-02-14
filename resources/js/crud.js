//Reset
//limpiar controles despues de haber finalizado reservacion
function clearReservationData(){
    document.getElementById("tbNombreMascota").value = ""
    document.getElementById("dtFechaReservacion").value =""
    document.getElementById("cbHorarioReservacion").selectedIndex = 0
    document.getElementById("cbClinicaReservacion").selectedIndex = 0
}

//Create
function BeforeCreate(){
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
            AlertaReservacion("Éxito!","Reservacion creada con éxito.")
            appendAlert(`Reservación ${data.nuevaReservacion.citaID.toString().padStart(5,'0')} generada con éxito. Haga clic en Ver Citas Programadas para ver la nueva reservación`, 'success')
        })
        
    }
    catch(err){
        AlertaErrorReservacion(err)
        appendAlert(err, 'danger')
    }
}
//Funcion para procesar los datos seleccionados por el usuario y crear la reservación nueva.
function agregarReservacion(nombreMascota,nombreClinica,urlClinica, fechaReservacion, horaReservacion, nombreServicio,costoServicio) {
    return new Promise((resolve,reject) =>{
        try{
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
            resolve({
                nuevaReservacion,
                result:`Reservación ${nuevaReservacion.citaID} generada con éxito. Haga clic en Ver Citas Programadas para ver la nueva reservación`
            })
        }
        catch(err){
            return reject(err)
        }
        finally{
            renderReservacionesContainer(Reservaciones)
            clearReservationData()
            btnAgregarCita.onclick()
        }
    })
}

//Read
function renderReservacionesContainer(reservacionesArray){
    reservacionesContainer.innerHTML=""
    reservacionesArray.forEach(element =>{
        const tableRow = document.createElement("tr")
        tableRow.innerHTML = `<td scope="row"><b>${element.citaID.toString().padStart(5,'0')}</b></td>
            <td>${element.nombreMascota}</td>
            <td>${element.fecha} - ${element.hora}</td>
            <td><a href="${element.urlClinica}" target="_blank">${element.nombreClinica}</a></td>
            <td>${element.servicio} - $${element.montoTotal}</td>
            <td><button class="btn" id="updateBtn">🖊️</button></td>
            <td><button class="btn" id="deleteBtn">❌</button></td>`

         
         const deleteBtn = tableRow.querySelector("#deleteBtn")
         deleteBtn.addEventListener("click", () => {
            deleteReservacion(element.citaID)
         })

        const updateBtn = tableRow.querySelector("#updateBtn")
        updateBtn.addEventListener("click", () => {
            MostrarDatosParaActualizacion(element)
        })
        
        reservacionesContainer.appendChild(tableRow)
    })
}

//Update
function MostrarDatosParaActualizacion(reservacion) {
    btnAgregarCita.onclick()
    
    //obtener clinica seleccionada
    fetch("./resources/db/clinicas.json").then(response => response.json()).then(data =>{
        document.getElementById("cbClinicaReservacion").selectedIndex = (data.findIndex(clinica => clinica.nombre == reservacion.nombreClinica)+1)
    })

    document.getElementById("tbNombreMascota").value = reservacion.nombreMascota
    document.getElementById("dtFechaReservacion").value = reservacion.fecha
    document.getElementById("cbHorarioReservacion").selectedIndex = document.getElementById("cbHorarioReservacion").options[document.getElementById("cbHorarioReservacion").selectedIndex].text
    document.getElementById("lblTotal").textContent = `Total: $${reservacion.montoTotal}`

    const reservarButton = document.getElementById("btnReservar")
    reservarButton.textContent = "Actualizar"
    reservarButton.onclick = () => ActualizarReservacion(reservacion.citaID)

    btnVerCitas.onclick()
}

function ActualizarReservacion(citaID) {
    
    const reservacionIndex = Reservaciones.findIndex(reservacion => reservacion.citaID === citaID)
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
    const updatedReservacion = {
        citaID: citaID,
        nombreMascota: document.getElementById("tbNombreMascota").value,
        fecha: document.getElementById("dtFechaReservacion").value,
        hora: document.getElementById("cbHorarioReservacion").options[document.getElementById("cbHorarioReservacion").selectedIndex].text, 
        urlClinica: document.getElementById("cbClinicaReservacion").options[document.getElementById("cbClinicaReservacion").selectedIndex].value,
        nombreClinica: document.getElementById("cbClinicaReservacion").options[document.getElementById("cbClinicaReservacion").selectedIndex].text,
        servicio: textServiciosSeleccionados,
        montoTotal: parseFloat(document.getElementById("lblTotal").textContent.replace("Total: $", ""))
    }

    
    Reservaciones[reservacionIndex] = updatedReservacion
    localStorage.setItem("reservations",JSON.stringify(Reservaciones))
    AlertaReservacion("Éxito",`Tu reservacion para tu mascota ${updatedReservacion.nombreMascota} ha sido actualizada con éxito!`)
    renderReservacionesContainer(Reservaciones)

    clearReservationData()

    const reservarButton = document.getElementById("btnReservar")
    reservarButton.textContent = "Reservar"
    reservarButton.onclick = () => BeforeCreate()
    btnAgregarCita.onclick()
    btnVerCitas.onclick()
}

//Delete
function deleteReservacion(citaID) {
    Reservaciones = Reservaciones.filter(reservacion => reservacion.citaID !== citaID)
    localStorage.setItem("reservations", JSON.stringify(Reservaciones))

    AlertaReservacion("Bien!","Reservacion cancelada con éxito.")
    renderReservacionesContainer(Reservaciones)
}
