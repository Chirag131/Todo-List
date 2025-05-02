// Dark Mode and Task Sorting Handling
const toggle = document.getElementById('toggle-dark');
const body = document.body;
const sortSelect = document.getElementById('sort-tasks');
const taskList = document.getElementById('incomplete-list');

// Toggle Dark Mode on page load based on localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    document.documentElement.classList.add('dark-mode');
    toggle.checked = true;
}

// Save Dark Mode preference in localStorage
toggle.addEventListener('change', () => {
    if (toggle.checked) {
        document.documentElement.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        document.documentElement.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
});

// Add new task
document.getElementById('add-task-btn').addEventListener('click', () => {
    const taskInput = document.getElementById('task-input');
    if (taskInput.value.trim() !== "") {
        const taskItem = createTaskItem(taskInput.value.trim());
        taskList.appendChild(taskItem);
        taskInput.value = "";
        saveTasks();
    }
});

// Create task item structure
function createTaskItem(taskContent) {
    const li = document.createElement('li');
    li.classList.add('task-item');
    li.dataset.priority = 'low'; // Default priority

    const taskTitle = document.createElement('span');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = taskContent;

    const actions = document.createElement('div');
    actions.classList.add('task-actions');

    const completeBtn = document.createElement('button');
    completeBtn.classList.add('task-action', 'complete');
    completeBtn.textContent = '✔️';
    completeBtn.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks();
    });

    const editBtn = document.createElement('button');
    editBtn.classList.add('task-action', 'edit');
    editBtn.textContent = '✏️';
    editBtn.addEventListener('click', () => {
        const newTitle = prompt("Edit Task", taskContent);
        if (newTitle) {
            taskTitle.textContent = newTitle;
            saveTasks();
        }
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('task-action', 'delete');
    deleteBtn.textContent = '❌';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        saveTasks();
    });

    actions.appendChild(completeBtn);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(taskTitle);
    li.appendChild(actions);
    return li;
}

// Sorting functionality
sortSelect.addEventListener('change', () => {
    const sortValue = sortSelect.value;
    const tasks = Array.from(taskList.querySelectorAll('.task-item'));

    tasks.sort((a, b) => {
        if (sortValue === 'priority') {
            const p = { 'high': 1, 'medium': 2, 'low': 3 };
            return p[a.dataset.priority] - p[b.dataset.priority];
        } else if (sortValue === 'alphabetical') {
            return a.querySelector('.task-title').textContent.localeCompare(b.querySelector('.task-title').textContent);
        }
        return 0;
    });

    taskList.innerHTML = '';
    tasks.forEach(task => taskList.appendChild(task));
});

// Save tasks to localStorage
function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('.task-item').forEach(taskItem => {
        tasks.push({
            content: taskItem.querySelector('.task-title').textContent,
            priority: taskItem.dataset.priority,
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    savedTasks.forEach(task => {
        const taskItem = createTaskItem(task.content);
        taskItem.dataset.priority = task.priority;
        if (task.completed) {
            taskItem.classList.add('completed');
        }
        taskList.appendChild(taskItem);
    });
}

document.addEventListener('DOMContentLoaded', loadTasks);
