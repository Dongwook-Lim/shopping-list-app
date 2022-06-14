const input = document.querySelector('.input__item');
const form = document.querySelector('.new-form');
const items = document.querySelector('.items');
const addBtn = document.querySelector('.add-btn');

let itemsArray = [];

let id = 0; //UUID

function onAdd() {
  // 1. get the text from input
  const text = input.value;
  if (text === '') {
    input.focus();
    return;
  }
  // 2. create new item element with the text
  const item = createItem(text);
  itemsArray.unshift(item);
  // 3. add the item element to the items container
  displayItems(itemsArray);
  // 4. reset the input
  input.value = '';
  input.focus();
}

function displayItems(array) {
  for (i = 0; i < array.length; i++) {
    items.appendChild(array[i]);
  }
}

function createItem(text) {
  const itemRow = document.createElement('li');
  itemRow.setAttribute('class', 'item');
  itemRow.setAttribute('data-id', id);
  itemRow.innerHTML = `
    <span>${text}</span>
    <div class="item__btns">
      <button class="check-btn">
        <i class="fa-solid fa-circle-check" data-id="${id}"></i>
      </button>
      <button class='delete-btn'>
        <i class="fa-solid fa-circle-xmark" data-id="${id}"></i>
      </button>
    </div>
  `;
  id++;
  return itemRow;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  onAdd();
});

items.addEventListener('click', (event) => {
  const selectedId = event.target.dataset.id;
  const selectedBtn = event.target.parentNode;
  const selectedItem = document.querySelector(`.item[data-id='${selectedId}']`);
  if (selectedBtn.className === 'check-btn') {
    selectedBtn.classList.toggle('active');
    itemsArray.splice(
      itemsArray.length - 1,
      0,
      itemsArray.splice(itemsArray.indexOf(selectedItem), 1)[0]
    );
    displayItems(itemsArray);
  } else if (selectedBtn.className === 'delete-btn') {
    selectedItem.remove();
    itemsArray.splice(itemsArray.indexOf(selectedItem), 1);
  } else {
    return;
  }
});
