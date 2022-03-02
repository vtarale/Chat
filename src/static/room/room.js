document.addEventListener('DOMContentLoaded', function() {
    const send = document.querySelector('#send');
    const input = document.querySelector('input');
    const list = document.querySelector('ul');
    const leave = document.querySelector('#leave');
    console.log(document.domain);
    var socket = io(location.protocol + '//' + document.domain + ':' + location.port);

    param = new URLSearchParams(window.location.search);
    room = param.get('room');
    n = param.get('name');

    socket.on('connect', function() {
        socket.emit('join', {'roomid': room, 'name': n});

        input.addEventListener('keyup', function() {
            if (input.value) {
                send.disabled = false;
            } else {
                send.disabled = true;
            }
        });

        send.addEventListener('click', function() {
            socket.emit('message', {'roomid': room,
                                    'message': input.value,
                                    'name': n});
        });

        leave.addEventListener('click', function() {
            //todo
        });
    });
});