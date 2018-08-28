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
      console.log(todos);
      this.setState({ todos });
    } catch (e) {
      console.error(e);
      alert('Error Getting Todos from API');
    }
  }

  async _onSaveTodo() {
    try {
      let text = this.state.text;
      let todo = await this._service.createTodo({ todo: text });
      this.setState(s => {
        return { todos: [...s.todos, todo], text: '' };
      })
    } catch (e) {
      alert('Error Creating Todo!');
    }
  }

  async _onDeleteTodo(todo) {
    try {
      let index = this.state.todos.indexOf(todo);
      await this._service.deleteTodo(todo._id);
      this.setState(s => {
        let todos = s.todos;
        todos.splice(index, 1);
        return { todos }
      })
    } catch (e) {
      alert('Error Deleting Todo');
    }
  }

  async _onUpdateTodo(todo) {
    try {
      let index = this.state.todos.indexOf(todo);
      todo = await this._service.updateTodo(todo);
      this.setState(s=>{
        let todos = s.todos;
        todos.splice(index, 1, todo);
        return {todos};
      });
    } catch(e) {
      alert('Error Updating Todo!');
    }
  }

  onChange = (event) => {
    this.setState({ text: event.target.value });
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

  onDeleteTodo(todo) {
    this._onDeleteTodo(todo);
  }

  onCheckTodo(todo) {
    todo.completed = !todo.completed;
    this._onUpdateTodo(todo);
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
            <li key={t._id}>
              <button type="button" onClick={() => this.onDeleteTodo(t)}>X</button>
              {t.todo}
              <input type="checkbox" checked = {t.completed} className="todo-checkbox" onChange = {()=>this.onCheckTodo(t)}/>
            </li>)
          }
        </ul>
      </div>
    );
  }
}

export default TodoList;