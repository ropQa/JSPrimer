import { element } from "./view/html-util.js";

console.log("App.js: loaded");
export class App {
  constructor() {
    console.log("App initialized");
  }
  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCountElement = document.querySelector("#js-todo-count")

    let todoItemCount = 0;
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log(`入力欄の値: ${inputElement.value}`);
      
      //入力文字列をリスト要素として追加
      const todoItemElement = element`<li>${inputElement.value}</li>`;
      containerElement.appendChild(todoItemElement);
      
      //総アイテム数を更新
      todoItemCount += 1;
      todoItemCountElement.textContent = `ToDoアイテム数: ${todoItemCount}`;

      //入力欄をリセット
      inputElement.value = "";
    });
  }
}