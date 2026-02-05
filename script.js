const inputJudulTask = document.getElementById("inputJudulTask");
const inputDeskripsiTask = document.getElementById("inputDeskripsiTask");
const todoForm = document.getElementById("todoForm");
const todoList = document.getElementById("todoList");
const emptyState = document.getElementById("emptyState");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function renderTodos() {
  const items = todoList.querySelectorAll("li");
  items.forEach((item) => item.remove());

  if (todos.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
    todos.forEach((todo, index) => {
      const li = document.createElement("li");
      li.className =
        "flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 group animate-in fade-in slide-in-from-bottom-2 duration-300";
      
      li.innerHTML = `
        <div class="flex-1">
          <h2 class="text-lg font-semibold ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800' } group-hover:text-blue-600 transition-colors">
            ${todo.judul}
          </h2>
          <p class="text-gray-500 text-sm ${todo.completed ? 'opacity-50' : ''}">
            ${todo.deskripsi}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <button
            onclick="toggleTodo(${index})"
            class="p-2 rounded-lg ${todo.completed ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'} hover:opacity-80 transition-all flex items-center gap-1 text-sm font-medium cursor-pointer"
            title="${todo.completed ? 'Batal Selesai' : 'Selesai'}"
          >
            <i data-feather="${todo.completed ? 'rotate-ccw' : 'check'}" class="w-4 h-4"></i>
            <span class="hidden sm:inline">${todo.completed ? 'Batal' : 'Selesai'}</span>
          </button>
          <button
            onclick="deleteTodo(${index})"
            class="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all flex items-center gap-1 text-sm font-medium cursor-pointer"
            title="Hapus"
          >
            <i data-feather="trash-2" class="w-4 h-4"></i>
            <span class="hidden sm:inline">Hapus</span>
          </button>
        </div>
      `;
      todoList.appendChild(li);
    });
  }
  feather.replace();
}

function addTodo(e) {
  e.preventDefault();
  const judul = inputJudulTask.value.trim();
  const deskripsi = inputDeskripsiTask.value.trim();

  if (judul === "" || deskripsi === "") {
    alert("Harap isi judul dan deskripsi task");
    return;
  }

  todos.push({
    judul,
    deskripsi,
    completed: false,
    createdAt: new Date().toISOString(),
  });

  inputJudulTask.value = "";
  inputDeskripsiTask.value = "";
  
  saveTodos();
  renderTodos();
}

function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

function deleteTodo(index) {
  if (confirm("Apakah Anda yakin ingin menghapus task ini?")) {
    todos.splice(index, 1);
    saveTodos();
    renderTodos();
  }
}

// Event Listeners
todoForm.addEventListener("submit", addTodo);

// Initial Render
renderTodos();
