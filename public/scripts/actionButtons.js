const activeDeleteButton = (ev) => {
    let item = ev.target;
    let id = item.getAttribute('data-id');
    document.querySelector(`#delete-id`).value = id;
}

document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', activeDeleteButton);
});
