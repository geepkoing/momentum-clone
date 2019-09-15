const form_todo = document.querySelector(".js-form-todo");
const input_todo = form_todo.querySelector("input");
const list_todo = document.querySelector(".js-list-todo");

const TODOS_LS = "toDos";
const toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const newId = toDos.length + 1;
  span.innerText = text;
  delBtn.innerText = "❌";
  li.appendChild(span);
  li.appendChild(delBtn);
  li.id = newId;
  list_todo.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input_todo.value;
  paintToDo(currentValue);
  input_todo.value = "";
}

function loadToDo() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDo();
  form_todo.addEventListener("submit", handleSubmit);
}

init();
