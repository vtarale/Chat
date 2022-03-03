document.addEventListener('DOMContentLoaded', async function() {
    const send = document.querySelector('#send');
    const input = document.querySelector('input');
    const list = document.querySelector('ul');
    const leave = document.querySelector('#leave');
    let l = 0;

    param = new URLSearchParams(window.location.search);
    room = param.get('roomid');
    n = param.get('name');
    p = param.get('password')

    get_check = await fetch('/check_password?password=' + p + '&roomid=' + room);
    not_json = await get_check.json();

    if (not_json == 1){
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
                socket.emit('leave', {'roomid': room,
                                      'name': n});
                window.location.replace('/');
            });
        });

        socket.on('person', data => {
            list.innerHTML = data.r;
        });

        socket.on('new message', data => {
            list.innerHTML = data.message;
        });

        socket.on('left', data => {
            list.innerHTML = data.r;
        });
    } else {
        window.location.replace('/room_password?room=' + room + '&name=' + n);
    }
});