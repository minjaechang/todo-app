'use strict';

// Add item to the list
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const todoList = document.querySelector('.todo-list');

document.addEventListener('DOMContentLoaded', getTodos());

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const todo = input.value;
  if (todo == '') {
    return;
  }
  const id = Date.now();
  createTodo(id, description);
  saveTodo(id, description);
  input.value = '';
});

todoList.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if (id == null) {
    return;
  }
  const item = document.querySelector(`.todo-item[data-id="${id}"]`);

  // Delete todo item when clicking the delete-btn
  if (e.target.className === 'delete-btn') {
    removeLocalTodos(id);
    item.remove();
  }

  // Make todo item active when clicking the circles
  if (e.target.classList.contains('complete-btn')) {
    e.target.classList.toggle('completed');
    item.classList.toggle('complete');

    // Change data-type depending on the check icon status
    if (item.dataset.type === 'active') {
      item.dataset.type = 'completed';
    } else {
      item.dataset.type = 'active';
    }
  }
});

// filter feature
const filterContainer = document.querySelector('.filter');
const filterItems = document.querySelectorAll('.filter-item');
filterContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter;

  if (filter == null) {
    return;
  }

  // Make filter button active
  filterItems.forEach((item) => {
    if (item !== e.target) {
      item.classList.remove('active');
    }
    e.target.classList.add('active');
  });

  // Make items filtered by selection
  const items = document.querySelectorAll('.todo-item');
  items.forEach((item) => {
    if (filter === '*' || filter === item.dataset.type) {
      item.classList.remove('invisible');
    } else {
      item.classList.add('invisible');
    }
  });
});

function createTodo(id, description) {
  const todoItem = document.createElement('li');
  todoItem.setAttribute('class', 'todo-item');
  todoItem.setAttribute('data-type', 'active');
  todoItem.setAttribute('data-id', id);

  todoItem.innerHTML = `
  <div class="todo-check">
  <div class="complete-btn" data-id=${id}>
    <img
      class="check-icon"
      src="./images/icon-check.svg"
      alt="check icon"
    />
  </div>
  <span class="todo-description">${description}</span>
</div>
<div class="delete-btn" data-id=${id}>
  <img
    class="cross-icon"
    src="./images/icon-cross.svg"
    alt="cross icon"
  />
</div>`;

  todoList.appendChild(todoItem);
}

async function saveTodo(id, title) {
  await fetch('http://localhost:3000/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      title,
    }),
  });
}

async function getTodos() {
  const response = await fetch('http://localhost:3000/todos', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const todos = await response.json();
  todos.forEach((todo) => {
    return createTodo(todo.id, todo.description);
  });
}

async function removeLocalTodos(id) {
  await fetch(`http://localhost:3000/todos/${id}`, {
    method: 'DELETE',
    headers: {
      'Conent-Type': 'application/json',
    },
  });
}
