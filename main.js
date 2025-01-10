const button = document.getElementById("send");
const btn = document.getElementById("daynight");
const input = document.getElementById("input");
const taskList = document.getElementById("taskList");

// Функция для загрузки задач из localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(taskText => createTaskElement(taskText));
}

// Функция для создания элемента задачи
function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.className = "task-item";

    const suha = document.createElement("span");
    suha.textContent = taskText;

    const editBtn = document.createElement("button");
    editBtn.textContent = '🖊';
    editBtn.addEventListener("click", () => {
        const newText = prompt("Uzgartirish qiling:", suha.textContent);
        if (newText) {
            suha.textContent = newText;
            updateTaskInLocalStorage(taskText, newText);
        }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = '🪣';
    deleteBtn.addEventListener("click", () => {
        taskList.removeChild(li);
        removeTaskFromLocalStorage(taskText);
    });

    li.append(suha, editBtn, deleteBtn);
    taskList.appendChild(li);
}

// Функция для добавления задачи в localStorage
function addTaskToLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для обновления задачи в localStorage
function updateTaskInLocalStorage(oldText, newText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskIndex = tasks.indexOf(oldText);
    if (taskIndex !== -1) {
        tasks[taskIndex] = newText;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Функция для удаления задачи из localStorage
function removeTaskFromLocalStorage(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

button.addEventListener("click", () => {
    const taskText = input.value;
    if (taskText) {
        createTaskElement(taskText);
        addTaskToLocalStorage(taskText);
        input.value = '';
    }
});


document.addEventListener("DOMContentLoaded", loadTasks);
