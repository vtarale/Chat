document.addEventListener('DOMContentLoaded', function() {
    const send = document.querySelector('#send');
    const input = document.querySelector('input');
    const list = document.querySelector('ul');
    const leave = document.querySelector('#leave');

    param = new URLSearchParams(window.location.search);
    room = param.get('room');
    n = param.get('name');
    p = param.get('password');

    get_check = await fetch('/check_password?password=' + password.value + '&roomid=' + room);
    not_json = await get_check.json();

    if (not_json != 1){
        window.location.replace('/room_password?room=' + room + '&name=' + n);
    }

    var socket = io(location.protocol + '//' + document.domain + ':' + location.port);

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