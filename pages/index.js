import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";


const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");


const todoCounter = new TodoCounter(initialTodos, ".counter__text");

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
} 

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    handleCheck,
    () => {
      todoCounter.updateTotal(false);
      if (data.completed) {
        todoCounter.updateCompleted(false);
      }
    }
  );
  return todo.getView();
};

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    return generateTodo(item); // Only return the element
  },
  containerSelector: ".todos__list"
});

section.renderItems();


const newTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
newTodoFormValidator.enableValidation();

const popupWithForm = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (formData) => {
    const newTodo = {
      id: uuidv4(),
      name: formData.name,
      date: formData.date,
      completed: false
    };
    section.addItem(generateTodo(newTodo));
    todoCounter.updateTotal(true);
  }
});
popupWithForm.setEventListeners();

// The logic in this function should all be handled in the Todo class.
// (generateTodo is already defined above)


addTodoButton.addEventListener("click", () => {
  popupWithForm.open();
});

addTodoCloseBtn.addEventListener("click", () => {
  popupWithForm.close();
});