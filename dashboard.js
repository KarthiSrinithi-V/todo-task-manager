const API_BASE = 'http://localhost:5000';

// Redirect to login if no token (basic auth check)
if (!localStorage.getItem('token')) {
  window.location.href = 'login.html';
}

const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const taskIdInput = document.getElementById('taskId');
const logoutBtn = document.getElementById('logoutBtn');

let tasks = [];

// Fetch tasks from backend
async function fetchTasks() {
  try {
    const res = await fetch(`${API_BASE}/tasks`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!res.ok) throw new Error('Failed to fetch tasks');
    const data = await res.json();
    tasks = data.tasks || [];
    renderTasks(tasks);
  } catch (err) {
    alert(err.message);
  }
}

// Render tasks to the list
function renderTasks(tasks) {
  taskList.innerHTML = '';
  if (tasks.length === 0) {
    taskList.innerHTML = '<li>No tasks found</li>';
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${task.title}</strong> - ${task.status}
      <button onclick="editTask(${task.id})">Edit</button>
      <button onclick="deleteTask(${task.id})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

// Fill form to edit task
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;
  taskIdInput.value = task.id;
  document.getElementById('title').value = task.title;
  document.getElementById('description').value = task.description || '';
  document.getElementById('due_date').value = task.due_date || '';
  document.getElementById('priority').value = task.priority || 'Medium';
  document.getElementById('status').value = task.status || 'Pending';
  document.getElementById('shared_with').value = task.shared_with || '';
}

// Delete task
async function deleteTask(id) {
  try {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (!res.ok) throw new Error('Failed to delete task');
    fetchTasks();
  } catch (err) {
    alert(err.message);
  }
}

// Save or update task
async function saveTask(e) {
  e.preventDefault();
  const task = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    due_date: document.getElementById('due_date').value,
    priority: document.getElementById('priority').value,
    status: document.getElementById('status').value,
    shared_with: document.getElementById('shared_with').value,
  };
  const id = taskIdInput.value;

  try {
    const res = await fetch(`${API_BASE}/tasks${id ? '/' + id : ''}`, {
      method: id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(task)
    });
    if (!res.ok) throw new Error('Failed to save task');
    taskForm.reset();
    taskIdInput.value = '';
    fetchTasks();
  } catch (err) {
    alert(err.message);
  }
}

// Logout
logoutBtn.onclick = () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
};

taskForm.addEventListener('submit', saveTask);

fetchTasks();