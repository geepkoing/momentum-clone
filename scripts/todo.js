const form_todo = document.querySelector(".js-form-todo");
const input_todo = form_todo.querySelector("input");
const list_todo = document.querySelector(".js-list-todo");

let toDos = [];
const TODOS_LS = "toDos";

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  list_todo.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const i = document.createElement("i");
  const newId = toDos.length + 1;
  span.innerText = text;
  i.classList.add("far");
  i.classList.add("fa-window-close");
  i.addEventListener("click", deleteToDo);
  li.appendChild(span);
  li.appendChild(i);
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
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser !== null) {
    form_todo.classList.add(SHOWING_CN);
  }
  loadToDo();
  form_todo.addEventListener("submit", handleSubmit);
}

init();
