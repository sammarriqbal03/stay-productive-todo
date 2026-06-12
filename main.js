// Selectors
const toDoInput = document.querySelector(".todo-input");
const toDoBtn = document.querySelector(".todo-btn");
const toDoList = document.querySelector(".todo-list");
const oceanTheme = document.querySelector(".ocean-theme");
const sunsetTheme = document.querySelector(".sunset-theme");
const forestTheme = document.querySelector(".forest-theme");

// Event Listeners
toDoBtn.addEventListener("click", addToDo);
toDoList.addEventListener("click", deletecheck);
document.addEventListener("DOMContentLoaded", getTodos);
oceanTheme.addEventListener("click", () => changeTheme("ocean"));
sunsetTheme.addEventListener("click", () => changeTheme("sunset"));
forestTheme.addEventListener("click", () => changeTheme("forest"));

let savedTheme = localStorage.getItem("savedTheme");
savedTheme === null ? changeTheme("ocean") : changeTheme(savedTheme);

function addToDo(event) {
    event.preventDefault();
    const todoText = toDoInput.value.trim();
    if (todoText === "") {
        alert("Please write a task first!");
        return;
    }
    const todoObject = { text: todoText, completed: false };
    savelocal(todoObject);
    renderToDo(todoObject);
    toDoInput.value = "";
}

function savelocal(todoObj) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.push(todoObj);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos.forEach(renderToDo);
}

function renderToDo(todo) {
    const toDoDiv = document.createElement("div");
    toDoDiv.classList.add("todo");

    const newToDo = document.createElement("li");
    newToDo.innerText = todo.text;
    newToDo.classList.add("todo-item");
    toDoDiv.appendChild(newToDo);

    const checked = document.createElement("button");
    checked.innerHTML = '<i class="fas fa-check"></i>';
    checked.classList.add("check-btn");
    toDoDiv.appendChild(checked);

    const deleted = document.createElement("button");
    deleted.innerHTML = '<i class="fas fa-trash"></i>';
    deleted.classList.add("delete-btn");
    toDoDiv.appendChild(deleted);

    if (todo.completed) toDoDiv.classList.add("completed");
    toDoList.appendChild(toDoDiv);
}

function deletecheck(event) {
    const item = event.target.closest("button");
    if (!item) return;
    const todo = item.parentElement;
    const todoText = todo.querySelector(".todo-item").innerText;

    if (item.classList.contains("delete-btn")) {
        todo.classList.add("fall");
        removeLocalTodos(todoText);
        todo.addEventListener("transitionend", () => todo.remove());
        todo.remove();
    }
    if (item.classList.contains("check-btn")) {
        todo.classList.toggle("completed");
        toggleCompletedLocal(todoText);
    }
}

function removeLocalTodos(text) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.filter(t => t.text !== text);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function toggleCompletedLocal(text) {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    todos = todos.map(t => t.text === text ? { ...t, completed: !t.completed } : t);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function changeTheme(color) {
    localStorage.setItem("savedTheme", color);
    savedTheme = color;
    document.body.className = color;
}
