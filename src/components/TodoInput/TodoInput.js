import React from 'react';
import './TodoInput.css';

class TodoInput extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input className="todo-input" {...this.props} />
    )
  }
}

export default TodoInput;