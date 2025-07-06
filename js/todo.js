function saveTasks() {
  const tasks = [];
  document.querySelectorAll(".todo-item-list-text").forEach((span) => {
    tasks.push({
      text: span.textContent,
      completed: span.classList.contains("completed"),
    });
  });
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
  tasks.forEach((task) => {
    addTaskToDOM(task.text, task.completed);
  });
}

function addTaskToDOM(taskText, completed = false) {
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-btn";

  const li = document.createElement("li");
  li.className = "todo-item-list";

  const span = document.createElement("span");
  span.className = "todo-item-list-text";
  span.style.padding = "10px";
  span.textContent = taskText;
  if (completed) span.classList.add("completed");

  span.onclick = function () {
    this.classList.toggle("completed");
    deleteButton.classList.toggle("completed");
    saveTasks();
  };

  deleteButton.onclick = function () {
    li.remove();
    saveTasks();
  };

  li.appendChild(span);
  li.appendChild(deleteButton);

  const todoList = document.getElementById("todo-list");
  todoList.appendChild(li);
}

function addTask() {
  const taskInput = document.getElementById("todo-input");
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }
  addTaskToDOM(taskText);
  saveTasks();
  taskInput.value = "";
}

// Load tasks when the page loads
window.onload = loadTasks;
