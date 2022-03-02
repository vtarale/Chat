document.addEventListener('DOMContentLoaded', function() {
    const send = document.querySelector('#send');
    const input = document.querySelector('input');
    const list = document.querySelector('ul');
    const leave = document.querySelector('#leave');
    var socket = io(location.protocol + '//' + document.domian + ':' + location.port);

    param = new URLSearchParams(window.location.search);
    room = param.get('room');

    socket.on('connect', function() {
        socket.emit('join', {'roomid': room});

        input.addEventListener('keyup', function() {
            if (input.value) {
                send.disabled = false;
            } else {
                send.disabled = true;
            }
        });

        send.addEventListener('click', function() {
            socket.emit('mesaage', {'roomid': room,
                                    'message': input.value});
        });
    });

    
});