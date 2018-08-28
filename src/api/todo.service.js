import Api from './api.service';

class TodoService extends Api {

  getTodos() {
    return this.get('todos');
  }
  createTodo(todo) {
    return this.post('todos', todo);
  }
}

export default TodoService;