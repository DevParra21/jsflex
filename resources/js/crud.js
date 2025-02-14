//Create
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
        }
    })
}

//Read
function renderReservacionesContainer(reservacionesArray){
    reservacionesArray.forEach(element =>{
        const tableRow = document.createElement("tr")
        tableRow.innerHTML = `<td scope="row"><b>${element.citaID.toString().padStart(5,'0')}</b></td>
            <td>${element.nombreMascota}</td>
            <td>${element.fecha} - ${element.hora}</td>
            <td><a href="${element.urlClinica}" target="_blank">${element.nombreClinica}</a></td>
            <td>${element.servicio} - $${element.montoTotal}</td>
            <td><button class="btn">🖊️</button></td>
            <td><button class="btn">❌</button></td>
            `
        reservacionesContainer.appendChild(tableRow)
    })
}

//Update

//Delete