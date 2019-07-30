// Commando para establecer la conexion
var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var label = $('small');
var ticketActual = $('h4');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {
    socket.emit('atenderTIcket', { escritorio: escritorio }, function(resp) {
        console.log(resp);
        if (resp === 'No hay tickets') {
            alert('No hay mas tickets');
            return ticketActual.text('No hay mas tickets');
        }
        ticketActual.text('Atendiendo a ' + resp.numero);
    });
});