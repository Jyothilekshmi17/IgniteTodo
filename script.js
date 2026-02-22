const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const taskList = document.getElementById("taskList");

dateInput.valueAsDate = new Date(); // default today date

let tasks = [];
let currentFilter = "all";

function addTask() {
  const text = taskInput.value.trim();
  const date = dateInput.value;

  if (text === "") return;

  tasks.push({ text: text, date: date, done: false });
  taskInput.value = "";

  showTasks();
}

function showTasks() {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {

    if (currentFilter === "done" && !tasks[i].done) continue;
    if (currentFilter === "not" && tasks[i].done) continue;

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerHTML = tasks[i].text + "<br><small>" + tasks[i].date + "</small>";

    if (tasks[i].done) {
      span.classList.add("completed");
    }

    span.onclick = function () {
      toggleTask(i);
    };

    const btn = document.createElement("button");
    btn.innerText = "X";
    btn.onclick = function () {
      deleteTask(i);
    };

    li.appendChild(span);
    li.appendChild(btn);
    taskList.appendChild(li);
  }
}

function toggleTask(index) {
  tasks[index].done = !tasks[index].done;
  showTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  showTasks();
}

function filterTasks(type) {
  currentFilter = type;

  // Remove active from all buttons
  const buttons = document.querySelectorAll(".filters button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }

  // Add active to clicked button
  event.target.classList.add("active");

  showTasks();
}
document.querySelector(".filters button").classList.add("active");