// Commando para establecer la conexion
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('se conecto con el servidor');
});

socket.on('disconnect', function() {
    console.log('se desconecto del servidor');
});

$('button').on('click', function() {
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});

socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
});