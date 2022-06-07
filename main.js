const input = document.querySelector('.input__item');
const items = document.querySelector('.items');
const addBtn = document.querySelector('.add-btn');

const itemsArray = [];

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
  const item = document.createElement('li');
  item.setAttribute('class', 'item');

  const name = document.createElement('span');
  name.innerText = text;

  const btnsContainer = document.createElement('div');
  btnsContainer.setAttribute('class', 'item__btns');

  item.appendChild(name);
  item.appendChild(btnsContainer);

  const checkBtn = document.createElement('button');
  checkBtn.setAttribute('class', 'check-btn');
  checkBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
  checkBtn.addEventListener('click', () => {
    checkBtn.classList.toggle('active');
    itemsArray.splice(
      itemsArray.length - 1,
      0,
      itemsArray.splice(itemsArray.indexOf(item), 1)[0]
    );
    displayItems(itemsArray);
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.setAttribute('class', 'delete-btn');
  deleteBtn.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
  deleteBtn.addEventListener('click', () => {
    item.remove();
    itemsArray.splice(itemsArray.indexOf(item), 1);
  });

  btnsContainer.appendChild(checkBtn);
  btnsContainer.appendChild(deleteBtn);

  return item;
}

addBtn.addEventListener('click', onAdd);

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    onAdd();
  }
});
