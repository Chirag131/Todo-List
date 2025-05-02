// Apply dark mode before page paint
if (localStorage.getItem('darkMode') === 'enabled') {
    document.documentElement.classList.add('dark-mode');
}

window.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('toggle-dark');
    if (!toggle) return;

    if (localStorage.getItem('darkMode') === 'enabled') {
        toggle.checked = true;
    }

    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            document.documentElement.classList.add('dark-mode');
            localStorage.setItem('darkMode', 'enabled');
        } else {
            document.documentElement.classList.remove('dark-mode');
            localStorage.setItem('darkMode', 'disabled');
        }
    });
});
