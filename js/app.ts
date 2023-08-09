interface Task {
  id: number;
  name: string;
}

const taskForm = document.querySelector("#taskForm") as HTMLFormElement;
const nameInput = document.querySelector("#task-input") as HTMLInputElement;
const listTask = document.querySelector("#list-task") as HTMLDivElement;

let tasks: Task[] = setToLocal();

// Lấy dữ liệu từ Local Storage và Render dữ liệu
function setToLocal() {
  const results: string | null = localStorage.getItem("listTasks");
  const myArray = JSON.parse(results ?? "null");
  return myArray ? myArray : [];
}
function renderTasks() {
  let taskTodo = "";
  tasks.forEach((task) => {
    taskTodo += `
          <div class="list">
                      <p>Task Name: ${task.name}</p>
                      <button class="delete" data-id="${task.id}">Delete</button>
                  </div>`;
  });

  const listTask = document.querySelector(
    "#list-task"
  ) as HTMLTableSectionElement;
  listTask.innerHTML = taskTodo;
  const deleteButtons = document.querySelectorAll(".delete");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const taskId = parseInt(button.getAttribute("data-id") || "0", 10);
      handleDelete(taskId);
    });
  });
}
renderTasks();

// Thêm task
console.log(tasks);
taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = nameInput.value;
  const maxId = tasks.reduce((max, task) => Math.max(max, task.id), 0);
  if (name) {
    const newTask: Task = {
      id: tasks.length == 0 ? 0 : maxId + 1,
      name: name,
    };
    tasks.push(newTask);
    const checkInputElement = document.querySelector(
      "#check-input"
    ) as HTMLElement;
    checkInputElement.style.display = "none";
    renderTasks();
    taskForm.reset();
  }
  if (name.length === 0) {
    const checkInputElement = document.querySelector(
      "#check-input"
    ) as HTMLElement;
    checkInputElement.style.display = "block";
  }
  const myArrayJson = JSON.stringify(tasks);
  localStorage.setItem("listTasks", myArrayJson);
});

// Xóa Task
function handleDelete(taskId: number) {
  tasks = tasks.filter((task) => task.id !== taskId);
  const myArrayJson = JSON.stringify(tasks);
  localStorage.setItem("listTasks", myArrayJson);
  renderTasks();
}
