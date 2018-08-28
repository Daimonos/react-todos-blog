import React from 'react';
import './TodoInput.css';

class TodoInput extends React.Component {
  render() {
    return (
      <input className="todo-input" {...this.props} />
    )
  }
}

export default TodoInput;