import React from 'react';
import TodoService from '../../api/todo.service';
import TodoInput from '../TodoInput/TodoInput';
import './TodoList.css';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      text: ''
    }
    this._service = new TodoService();
  }

  componentWillMount() {
    this._loadTodosFromApi();
  }

  async _loadTodosFromApi() {
    try {
      let todos = await this._service.getTodos();
      this.setState({ todos });
    } catch(e) {
      // You should handle this better
      console.error(e);
      throw e;
    }
  }

  async _onSaveTodo() {
    try {
      let text = this.state.text;
      let todo = await this._service.createTodo({todo: text});
      this.setState(s=>{
        return {todos: [...s.todos, todo], text:''};
      })
    } catch(e) {
      alert('Error Creating Todo!');
    }
  }

  onChange = (event) => {
    this.setState({ text: event.target.value });
  }

  persistTodos() {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }

  onKeypress = (e) => {
    if (e.key === 'Enter') {
      if (this.state.text) {
        this._onSaveTodo();
      }
      else {
        alert('Nothing to do!');
      }
    }
  }

  onDeleteTodo = (e) => {
    let index = e.target.value;
    this.setState(state => {
      let todos = state.todos;
      todos.splice(index, 1);
      this.persistTodos();
      return { todos: todos };
    });
  }

  render() {
    return (
      <div>
        <div className="todos">
          <TodoInput
            type="text"
            placeholder="Add a Todo"
            value={this.state.text}
            onChange={this.onChange}
            onKeyPress={this.onKeypress}
          />
        </div>
        <ul className="todo-list">
          {this.state.todos.map((t, index) =>
            <li key = {t._id}>
              <button type="button" onClick={this.onDeleteTodo} value={index}>X</button>
              {t.todo}
            </li>)
          }
        </ul>
      </div>

    );
  }
}

export default TodoList;