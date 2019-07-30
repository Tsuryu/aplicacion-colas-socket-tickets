const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    });

    client.emit('estadoActual', { actual: ticketControl.getUltimo(), ultimos4: ticketControl.getUltimos4() });

    client.on('atenderTIcket', (data, callback) => {
        if (!data.escritorio) {
            return callback({ err: true, mensaje: 'El escritorio es necesario' });
        }

        let atenderTIcket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTIcket);

        // actualizar/notificar cambiso en los ultimos 4
        client.broadcast.emit('ultimos4', ticketControl.getUltimos4());
    });

});