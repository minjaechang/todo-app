'use strict';

const form = document.querySelector('form');
const todoList = document.querySelector('.todo-list');
const input = document.querySelector('.input');
const deleteBtn = document.querySelector('.cross-icon');
const checkIcon = document.querySelector('.check-icon');
const todoItem = document.querySelector('.todo-item');

function onAdd() {
  const text = input.value;
  const item = document.createElement('li');

  item.setAttribute('class', 'todo-item');
  item.innerHTML = `<div class="todo-check">
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

  todoList.appendChild(item);
}

// Add input to the list
form.addEventListener('submit', (e) => {
  e.preventDefault();
  onAdd();
  e.target.reset();
});

todoList.addEventListener('click', (e) => {
  const item = e.target;

  // Delete todo-item when clicking the button
  if (item.classList.contains('delete-btn')) {
    item.parentElement.remove();
  }

  // Toggle the complete button
  if (item.classList.contains('complete-btn')) {
    item.classList.toggle('active');
    const todo = item.parentElement.parentElement;
    todo.classList.toggle('complete');
  }
});
