import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { element, render } from "./view/html-util.js";

console.log("App.js: loaded");
export class App {
  constructor() {
    this.todoListView = new TodoListView();
    this.todoListModel = new TodoListModel([]);
    console.log("App initialized");
  }

  /**
   * Todoを追加するときに呼ばれるリスナー関数
   * 
   * @param {string} title 
   */
  handleAdd(title) {
    this.todoListModel.addTodo(new TodoItemModel({ title, completed: false}));
  }

  /**
   * Todoの状態を更新したときに呼ばれるリスナー関数
   * 
   * @param {{ id:number, completed:boolean }}
   */
  handleUpdate({ id, completed }) {
    this.todoListModel.updateTodo({ id, completed });
  }

  /**
   * Todoを削除したときに呼ばれるリスナー関数
   * 
   * @param {{ id:number }}
   */
  handleDelete({ id }) {
    this.todoListModel.deleteTodo({ id });
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
      const todoItems = this.todoListModel.getTodoItems();
      const todoListView = new TodoListView();

      //todoItemsに対応するTodoListViewを作成する
      const todoListElement = todoListView.createElement(todoItems, {
        onUpdateTodo: ({ id, completed }) => {
          this.handleUpdate({ id, completed });
        },
        onDeleteTodo: ({ id }) => {
          this.handleDelete({ id });
        }
      });
      //中身とアイテム数の表示を更新
      render(todoListElement, containerElement);
      todoItemCountElement.textContent = `ToDoアイテム数: ${this.todoListModel.getTotalCount()}`;
    });

    //フォームを送信したら、新しいTodoItemModelを追加する
    formElement.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log(`入力欄の値: ${inputElement.value}`);

      if(inputElement.value) {
        this.handleAdd(inputElement.value);
      }
      
      //入力欄をリセット
      inputElement.value = "";
    });
  }
}