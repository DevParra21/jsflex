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

         // Add event listener to the delete button
         const deleteBtn = tableRow.querySelector("#deleteBtn")
         deleteBtn.addEventListener("click", () => {
            deleteReservacion(element.citaID)
         })

         // Add event listener to the update button (optional)
        const updateBtn = tableRow.querySelector("#updateBtn")
        updateBtn.addEventListener("click", () => {
            alert(`Actualizar reservación con ID: ${element.citaID}`)
            // Add your update logic here
        })
        
        reservacionesContainer.appendChild(tableRow)
    })
}

//Update

//Delete
// Function to delete a reservacion by ID
function deleteReservacion(citaID) {
    Reservaciones = Reservaciones.filter(reservacion => reservacion.citaID !== citaID)
    localStorage.setItem("reservations", JSON.stringify(Reservaciones))

    AlertaReservacion("Bien!","Reservacion cancelada con éxito.")
    renderReservacionesContainer(Reservaciones)
}
