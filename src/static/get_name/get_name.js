document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('input');
    const button = document.querySelector('button');

    input.addEventListener('keyup', function() {
        if (input.value) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    });

    button.addEventListener('click', function() {
        get = new URLSearchParams(window.location.search);
        room = get.get('room');

        window.location.replace('/room_password?room=' + room + '&name=' + input.value);
    });
});