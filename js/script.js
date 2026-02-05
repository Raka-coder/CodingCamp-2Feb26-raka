const inputJudulTask = document.getElementById("inputJudulTask");
const inputDeskripsiTask = document.getElementById("inputDeskripsiTask");
const inputTanggalTask = document.getElementById("inputTanggalTask");
const todoForm = document.getElementById("todoForm");
const todoList = document.getElementById("todoList");
const emptyState = document.getElementById("emptyState");
const filterButtons = document.querySelectorAll(".filter-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('id-ID', options);
}

function renderTodos() {
  todoList.innerHTML = "";
  
  const filteredTodos = todos.filter(todo => {
    if (currentFilter === "pending") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
    filteredTodos.forEach((todo) => {
      const originalIndex = todos.indexOf(todo);
      
      const tr = document.createElement("tr");
      tr.className = "hover:bg-gray-50 transition-colors group";
      
      tr.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${todo.completed ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
            ${todo.completed ? 'Selesai' : 'Pending'}
          </span>
        </td>
        <td class="px-6 py-4">
          <div class="flex flex-col">
            <span class="text-sm font-semibold ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-900'}">
              ${todo.judul}
            </span>
            <span class="text-xs text-gray-500 truncate max-w-xs ${todo.completed ? 'opacity-50' : ''}">
              ${todo.deskripsi}
            </span>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          <div class="flex items-center gap-2">
            <i data-feather="calendar" class="w-3.5 h-3.5"></i>
            ${formatDate(todo.tanggal)}
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <div class="flex justify-end gap-2">
            <button
              onclick="toggleTodo(${originalIndex})"
              class="p-2 rounded-lg ${todo.completed ? 'text-blue-600 hover:bg-blue-50' : 'text-green-600 hover:bg-green-50'} transition-all cursor-pointer"
              title="${todo.completed ? 'Tandai Belum Selesai' : 'Tandai Selesai'}"
            >
              <i data-feather="${todo.completed ? 'rotate-ccw' : 'check'}" class="w-4.5 h-4.5"></i>
            </button>
            <button
              onclick="deleteTodo(${originalIndex})"
              class="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-all cursor-pointer"
              title="Hapus"
            >
              <i data-feather="trash-2" class="w-4.5 h-4.5"></i>
            </button>
          </div>
        </td>
      `;
      todoList.appendChild(tr);
    });
  }
  feather.replace();
}

function addTodo(e) {
  e.preventDefault();
  const judul = inputJudulTask.value.trim();
  const deskripsi = inputDeskripsiTask.value.trim();
  const tanggal = inputTanggalTask.value;

  if (judul === "" || deskripsi === "" || tanggal === "") {
    alert("Harap isi semua field!");
    return;
  }

  todos.push({
    judul,
    deskripsi,
    tanggal,
    completed: false,
    createdAt: new Date().toISOString(),
  });

  todoForm.reset();
  
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

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active", "bg-white", "shadow-sm", "text-blue-600"));
    filterButtons.forEach(b => b.classList.add("text-gray-500"));
    
    btn.classList.add("active", "bg-white", "shadow-sm", "text-blue-600");
    btn.classList.remove("text-gray-500");
    
    currentFilter = btn.dataset.filter;
    renderTodos();
  });
});

function initFilters() {
    const activeBtn = document.querySelector(`[data-filter="${currentFilter}"]`);
    if(activeBtn) {
        activeBtn.classList.add("active", "bg-white", "shadow-sm", "text-blue-600");
        activeBtn.classList.remove("text-gray-500");
    }
}

todoForm.addEventListener("submit", addTodo);

initFilters();
renderTodos();
