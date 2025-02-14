

function AlertaReservacion(titulo, descripcion){
    Swal.fire({
        title:titulo,
        text:descripcion
    })
}

function AlertaErrorReservacion(errMessage){
    Swal.fire({
        title:'Error',
        text:errMessage
    })
}

