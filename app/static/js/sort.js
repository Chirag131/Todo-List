window.addEventListener('DOMContentLoaded', () => {
    const sortSelect = document.getElementById('sort-select'); // Updated ID
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
            tasks.sort((a, b) => {
                if (sortValue === 'priority') {
                    const p = { 'high': 1, 'medium': 2, 'low': 3 };
                    return (p[a.dataset.priority] || 4) - (p[b.dataset.priority] || 4);
                } else if (sortValue === 'alphabetical') {
                    const titleA = a.querySelector('.task-title')?.textContent.trim().toLowerCase() || '';
                    const titleB = b.querySelector('.task-title')?.textContent.trim().toLowerCase() || '';
                    return titleA.localeCompare(titleB);
                } else if (sortValue === 'date') {
                    const dateA = new Date(a.dataset.createdAt);
                    const dateB = new Date(b.dataset.createdAt);
                    return dateA - dateB; // Sort by date ascending (oldest first)
                }
                return 0; // Default (e.g., no sorting action)
            });
            

        // Re-append sorted tasks
        taskList.innerHTML = '';
        tasks.forEach(task => taskList.appendChild(task));
    });

});
});

