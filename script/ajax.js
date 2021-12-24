const ajax = document.getElementById('ajax');

function redirecionar(element){
    let view = element.getAttribute('a-view');
    let folder = element.getAttribute('a-folder');
    fetch(`/ajax/${folder}/${view}.html`).then(response => {
        let html = response.text();
        return html;
    }).then(html => {
        ajax.innerHTML = html;
    })
}