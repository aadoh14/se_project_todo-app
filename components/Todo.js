class Todo {
  constructor(data, selector) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
  }

  _setEventListeners() {

    this._todoCheckboxEl.addEventListener("change", (event) => {
      this._data.completed = event.target.checked;
    });

    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    this._todoDeleteBtn.addEventListener("click", () => {
      this._todoElement.remove();
    });
  }

  generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

 getView() {
  this._todoElement = this._templateElement.content
    .querySelector(".todo")
    .cloneNode(true);

  const todoNameEl = this._todoElement.querySelector(".todo__name");
  const todoDate = this._todoElement.querySelector(".todo__date");

  todoNameEl.textContent = this._data.name;

  this._dueDate = new Date(this._data.date);
  if (!isNaN(this._dueDate.getTime())) {
    todoDate.textContent = `Due: ${this._dueDate.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`;
  } else {
    todoDate.textContent = "";
  }

  this.generateCheckboxEl();
  this._setEventListeners();

  return this._todoElement;
}
}

export default Todo;