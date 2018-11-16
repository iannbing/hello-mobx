import { types } from 'mobx-state-tree';

const TodoItem = types
  .model('TodoItem', {
    title: types.string,
    done: false
  })
  .actions(self => ({
    toggle() {
      self.done = !self.done;
    }
  }));

const TodoListStore = types
  .model('TodoListStore', {
    items: types.array(TodoItem)
  })
  .actions(self => ({
    add: title => {
      self.items.push({ title, done: false });
    },
    remove: title => {
      self.items = self.items.filter(item => item.title !== title);
    },
    load: items => {
      self.items = items ? [...self.items, ...items] : self.items;
    },
    toggle: title => {
      self.items.find(item => item.title === title).toggle();
    }
  }))
  .views(self => ({
    getSearchResults: searchTerm =>
      self.items.filter(item => item.title.includes(searchTerm))
  }));

export default TodoListStore;
