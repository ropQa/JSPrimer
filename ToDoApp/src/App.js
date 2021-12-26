import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

console.log("App.js: loaded");
export class App {
  constructor() {
    this.todoListModel = new TodoListModel();
    console.log("App initialized");
  }
  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count")

    /**
     * TodoListModelの状態が更新されたら表示を更新する
     */
    this.todoListModel.onChange(() => {
      const todoListElement = element`<ul />`;

      const todoItems = this.todoListModel.getTodoItems();
      todoItems.forEach(item => {
        const todoItemElement = element`<li>${item.title}</li>`;
        todoListElement.appendChild(todoItemElement);
      });

      //中身とアイテム数の表示を更新
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `ToDoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });

    //フォームを送信したら、新しいTodoItemModelを追加する
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log(`入力欄の値: ${inputElement.value}`);

      this.todoListModel.addTodo(new TodoItemModel({
        title: inputElement.value,
        completed: false
      }));
      
      //入力欄をリセット
      inputElement.value = "";
    });
  }
}