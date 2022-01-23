const sidebar = document.getElementById('sidebar');
const icon = document.getElementById('iconMenu');
const main = document.getElementById('main-content');

var w = window.innerWidth;

window.addEventListener('resize', () => {
    w = window.innerWidth;
});

function reconfigurar() {
    if (sidebar.style.display == 'none') {
        sidebar.style.display = 'block';
        main.style.width = 'calc(100% - 300px)';
    }
    else {
        sidebar.style.display = 'none';
        main.style.width = '100%';
    }
}

// DARK MODE
document.getElementById('mode').addEventListener("click", (e) => {
    document.querySelector('body').classList.toggle('dark');
});

document.getElementById('mobile').addEventListener('click', (e) => {
    document.querySelector('body').classList.toggle('dark');
});