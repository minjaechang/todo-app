'use strict';

// Add item to the list
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const todoList = document.querySelector('.todo-list');

document.addEventListener('DOMContentLoaded', getTodos);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = input.value;
  if (text == '') {
    return;
  }

  const id = Date.now();
  createTodo(id, text);
  saveLocalTodos(id, text);

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
    item.remove();
  }

  // Make todo item active when clicking the circles
  if (e.target.className === 'complete-btn') {
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

function createTodo(id, text) {
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
  <span class="todo-description">${text}</span>
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

function saveLocalTodos(id, text) {
  let todos;
  if (localStorage.getItem('todos') == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todo = { id, text };
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(todos) {
  if (localStorage.getItem('todos') == null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach((todo) => {
    createTodo(todo.id, todo.text);
  });
}
