const init = () => {
    const validateEmail = (event) =>  {
        const input = event.currentTarget;
        const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
        const emailTest = regex.test(input.value);

        if(!emailTest) {
            submitBottun.setAttribute('disabled', 'disabled');
            input.nextElementSibling.classList.add('error');
        } else { 
            submitBottun.removeAttribute('disabled');
            input.nextElementSibling.classList.remove('error');
            }
}

    const validatePassword = (event) => {
        const input = event.currentTarget;

        if(input.value.length <8){
            submitBottun.setAttribute('disabled', 'disabled');
            input.nextElementSibling.classList.add('error');
        } else{
            submitBottun.removeAttribute('disabled');
            input.nextElementSibling.classList.remove('error');
        }

    }

    const inputEmail = document.querySelector('input[type="email"]');
    const inputPassword = document.querySelector('input[type="password"]');
    const submitBottun = document.querySelector('.login__submit');

    inputEmail.addEventListener('input', validateEmail);
    inputPassword.addEventListener('input', validatePassword);

    const errorHandler = () => {
        submitBottun.classList.remove('success');
        submitBottun.classList.add('error');
        submitBottun.textContent = "Erro! :("
    }

    const successHandler = () => {
        submitBottun.classList.remove('error');
        submitBottun.classList.add('success');
        submitBottun.textContent = "Sucesso! :)";
    }

    if(submitBottun){
        submitBottun.addEventListener('click', (event) => {
            event.preventDefault();

            submitBottun.textContent = '...Carregando'

            fetch('https://reqres.in/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: inputEmail.value,
                    password: inputPassword.value,
                })
            }).then((response) =>{
                if (response.status !==200) {
                    return errorHandler();
                }successHandler();
            }).catch(() => {
                errorHandler();
            })
        })
    }

}

window.onload = init;