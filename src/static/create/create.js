document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('button');

    button.addEventListener('click', async function() {
        response = await fetch('/create_room');
        not_json = await response.json()
        document.querySelector('label').innerHTML = '' + not_json;
    });
});