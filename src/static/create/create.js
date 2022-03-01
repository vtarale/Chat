document.addEventListener('DOMContentLoaded', function() {
    const password = document.querySelector('#password');
    const repassword = document.querySelector('#repassword');
    const button = document.querySelector('button');

    password.addEventListener('keyup', function() {
        if (password.value){
            if (repassword.value){
                button.disabled = false;
            } else {
                button.disabled = true;
            }
        } else {
            button.disabled = true;
        }
    });

    repassword.addEventListener('keyup', function() {
        if (password.value){
            if (repassword.value){
                button.disabled = false;
            } else {
                button.disabled = true;
            }
        } else {
            button.disabled = true;
        }
    });

    button.addEventListener('click', async function() {
        repsnose = await fetch('/create_room', {
            method: POST,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(password.value)
        });
        not_json = await response.json()
        document.querySelector('label').innerHTML = '' + not_json;
    });
});