document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('button');
    const password = document.querySelector('input');

    password.addEventListener('keyup', function() {
        if (password.value) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    });

    button.addEventListener('click', async function() {
        get = new URLSearchParams(window.location.search);
        room = get.get('room');
        n = get.get('name');

        get_check = await fetch('/check_password?password=' + password.value + '&roomid=' + room);
        not_json = await get_check.json()

        if (not_json == 1){
            window.location.replace('/room?roomid=' + room + '&name=' + n);
        } else {
            document.querySelector('label').innerHTML = 'Error';
        }
    });
});