import { types } from 'mobx-state-tree';

const Todo = types
  .model('Todo', {
    title: types.string,
    done: false
  })
  .actions(self => ({
    toggle() {
      self.done = !self.done;
    }
  }));

const TodoStore = types
  .model('TodoStore', {
    todos: types.array(Todo)
  })
  .actions(self => ({
    add: title => {
      self.todos.push({ title, done: false });
    },
    remove: title => {
      self.todos = self.todos.filter(item => item.title !== title);
      console.log(self.todos);
    }
  }));

export default TodoStore;
