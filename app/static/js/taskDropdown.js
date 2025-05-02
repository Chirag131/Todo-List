window.addEventListener('DOMContentLoaded', () => {
    const toggles = document.querySelectorAll('.task-title');

    toggles.forEach(title => {
        title.addEventListener('click', () => {
            const note = title.nextElementSibling;
            if (note && note.classList.contains('task-note')) {
                note.classList.toggle('show');
            }
        });
    });
});
