import { types } from 'mobx-state-tree';
import { toJS } from 'mobx';

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
      self.items = items;
    },
    toggle: title => {
      self.items.find(item => item.title === title).toggle();
    }
  }))
  .views(self => ({
    getSearchResults: searchTerm => {
      const items = toJS(self.items);
      return items.filter(item => item.title.includes(searchTerm));
    },
    getItem: title => {
      const items = toJS(self.items);
      return items.find(item => item.title === title);
    }
  }));

export default TodoListStore;
