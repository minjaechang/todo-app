'use strict';

// Add item to the list
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const todoList = document.querySelector('.todo-list');

let id = 0;
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = input.value;
  if (text == '') {
    return;
  }

  const todoItem = document.createElement('li');
  todoItem.setAttribute('class', 'todo-item');
  todoItem.setAttribute('data-type', 'active');
  todoItem.setAttribute('data-id', id);

  todoItem.innerHTML = `
  <div class="todo-check">
  <div class="complete-btn">
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

  id++;

  todoList.appendChild(todoItem);
  input.value = '';
});

todoList.addEventListener('click', (e) => {
  const id = e.target.dataset.id;
  if (id && e.target.classList.contains('delete-btn')) {
    const item = document.querySelector(`.todo-item[data-id="${id}"]`);
    item.remove();
  }
});
