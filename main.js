'use strict';

// Add item to the list
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const todoList = document.querySelector('.todo-list');
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = input.value;

  const todoItem = document.createElement('li');
  todoItem.setAttribute('class', 'todo-item');
  todoItem.setAttribute('data-type', 'active');

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
<div class="delete-btn">
  <img
    class="cross-icon"
    src="./images/icon-cross.svg"
    alt="cross icon"
  />
</div>`;

  todoList.appendChild(todoItem);
  input.value = '';
});
