import React from 'react';
import TodoInput from '../TodoInput/TodoInput';
import './TodoList.css';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      text: ''
    }
  }
  componentWillMount() {
    let todos = JSON.parse(localStorage.getItem("todos"));
    console.log(todos)
    if (todos) {
      this.setState({ todos: todos });
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
        this.setState(state => {
          let todos = state.todos;
          todos.push(state.text);
          this.persistTodos();
          return { todos: todos, text: '' }
        });
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
            <li>
              <button type="button" onClick={this.onDeleteTodo} value={index}>X</button>
              {t}
            </li>)
          }
        </ul>
      </div>

    );
  }
}

export default TodoList;