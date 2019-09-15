const form_greetings = document.querySelector(".js-form-greetings");
const input_greetings = form_greetings.querySelector("input");
const greetings = document.querySelector(".js-form-greetings");

const USER_LS = "currentUser";
const SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input_greetings.value;
  paintGreetings(currentValue);
  saveName(currentValue);
}

function askForName() {
  form_greetings.classList.add(SHOWING_CN);
  form_greetings.addEventListener("submit", handleSubmit);
}

function paintGreetings(text) {
  form_greetings.classList.remove(SHOWING_CN);
  greetings.classList.add(SHOWING_CN);
  greetings.innerHTML = `Hello ${text}!`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreetings(currentUser);
  }
}

function init() {
  loadName();
}

init();
