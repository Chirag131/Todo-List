window.addEventListener('DOMContentLoaded', () => {
    const sortSelect = document.getElementById('sort-tasks');
    const taskList = document.getElementById('incomplete-list');

    if (!sortSelect || !taskList) return;

    // Apply saved sort
    const savedSort = localStorage.getItem('sortOption');
    if (savedSort) {
        sortSelect.value = savedSort;
        sortSelect.dispatchEvent(new Event('change'));
    }

    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        localStorage.setItem('sortOption', sortValue);

        const tasks = Array.from(taskList.querySelectorAll('.task-item'));

        tasks.sort((a, b) => {
            if (sortValue === 'priority') {
                const p = { 'high': 1, 'medium': 2, 'low': 3 };
                return p[a.dataset.priority] - p[b.dataset.priority];
            } else if (sortValue === 'alphabetical') {
                return a.querySelector('.task-title').textContent.localeCompare(
                    b.querySelector('.task-title').textContent
                );
            }
            return 0;
        });

        taskList.innerHTML = '';
        tasks.forEach(task => taskList.appendChild(task));
    });
});
