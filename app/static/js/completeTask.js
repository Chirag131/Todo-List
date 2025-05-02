// complete-task.js

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.complete-icon').forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.stopPropagation();
            const url = icon.dataset.url;
            if (url) {
                window.location.href = url;
            }
        });
    });
});
