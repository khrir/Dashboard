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
const switch_theme = document.getElementById('switch__track');

switch_theme.addEventListener('click', () => {
        switch_theme.classList.toggle('dark');

});