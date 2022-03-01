document.addEventListener('DOMContentLoaded', function() {
    const create = document.querySelector('#create');
    const back = document.querySelector('#back');

    back.addEventListener('click', function() {
        window.location.replace('/');
    });

    create.addEventListener('click', async function() {
        response = await fetch('/create_room');
        not_json = await response.json()
        document.querySelector('label').innerHTML = '' + not_json;
    });
});