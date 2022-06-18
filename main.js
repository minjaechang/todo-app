'use strict';

const form = document.querySelector('form');
const list = document.querySelector('.list');
const input = document.querySelector('.input');

function onAdd() {
  const text = input.value;
  //   console.log(text);
  const item = document.createElement('li');
  item.setAttribute('class', 'todo');
  item.innerHTML = `<div class="check-icon">
  <img src="./images/icon-check.svg" alt="check icon" />
</div>
<div class="description">
  <span>${text}</span>
  <img
    class="cross-icon"
    src="./images/icon-cross.svg"
    alt="cross icon"
  />
</div>`;
  console.log(item);
  list.appendChild(item);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Hello World!');
  onAdd();
  e.target.reset();
});
