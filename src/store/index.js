import { reaction } from 'mobx';
import isEqual from 'lodash.isequal';

import TodoListStore from './TodoListStore';

const todoList = TodoListStore.create({
  items: []
});

reaction(
  () => todoList.items.map(item => ({ ...item })),
  items => {
    localStorage.setItem('todoList', JSON.stringify(items));
  }
);

const store = {
  todoList
};

export default store;
