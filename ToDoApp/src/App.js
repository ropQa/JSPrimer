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
        //完了済みならchecked属性をつけ、未完了ならchecked属性を外す
        const todoItemElement = item.completed
          ? element`<li><input type="checkbox" class="checkbox" checked>
              <s>${item.title}</s>
              <button class="delete">x</button>
            </li>`
          : element`<li><input type="checkbox" class="checkbox">
              ${item.title}
              <button class="delete">x</button>
            </li>`;
        //チェックボックスがトグルしたときのイベントにリスナー関数を登録
        const inputCheckboxElement = todoItemElement.querySelector(".checkbox");
        inputCheckboxElement.addEventListener("change", () => {
          //指定したTodoアイテムの完了状態を反転させる
          this.todoListModel.updateTodo({
            id: item.id,
            completed: !item.completed
          });
        });

        //削除ボタン(x)がクリックされたときにTodoListModelからアイテムを削除する
        const deleteButtonElement = todoItemElement.querySelector(".delete");
        deleteButtonElement.addEventListener("click", () => {
          this.todoListModel.deleteTodo({
            id: item.id
          });
        });
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