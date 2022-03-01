document.addEventListener('DOMContentLoaded', function() {
    const bcreator = document.querySelector('#roomcreator');
    const bjion = document.querySelector('#join');
    const roomno = document.querySelector('input');

    roomno.addEventListener('keyup', function() {
        if (roomno.value){
            bjion.disabled = false;
        } else {
            bjion.disabled = true;
        }
    });

    bcreator.addEventListener('click', function() {
        window.location.replace('/create');
    });

    bjion.addEventListener('click', async function() {
        get = await fetch('/check?roomid=' + roomno.value);
        not_jsonget = await get.json();

        if (not_jsonget == 1){
            window.location.replace("/room?" + roomno.value);
        } else {
            document.querySelector('label').innerHTML = 'No room found, 404';
        }
    });
});