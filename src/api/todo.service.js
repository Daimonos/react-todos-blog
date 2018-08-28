import Api from './api.service';

class TodoService extends Api {

  getTodos() {
    return this.get('todos');
  }
  createTodo(todo) {
    return this.post('todos', todo);
  }
  deleteTodo(id) {
    return this.delete('todos/'+id);
  }
  updateTodo(todo) {
    return this.put('todos/'+todo._id, todo);
  }
}

export default TodoService;