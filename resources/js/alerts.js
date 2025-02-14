

function AlertaReservacionExitosa(){
    Swal.fire({
        title:'Reservacion realizada con éxito.',
        text:'this is a text'
    })
}

function AlertaErrorReservacion(errMessage){
    Swal.fire({
        title:'Error',
        text:errMessage
    })
}