import React, { Component } from 'react';
import TodoList from './components/TodoList/TodoList';
import './App.css';

class App extends Component {

  render() {
    return (
      <div>
        <h3 className="header">Todos</h3>
        <TodoList />
      </div>

    );
  }
}

export default App;
