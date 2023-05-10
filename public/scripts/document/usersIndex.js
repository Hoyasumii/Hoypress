document.querySelector(`#user-form`).addEventListener(`submit`, (event) => {

    let form = event.target;

    if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
    }

    form.classList.add('was-validated')


}, false);