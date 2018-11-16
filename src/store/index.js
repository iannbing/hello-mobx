import { reaction } from 'mobx';

import TodoListStore from './TodoListStore';

const todoList = TodoListStore.create({
  items: []
});

reaction(
  () => todoList.items.map(item => ({ ...item })),
  items => {
    const data = JSON.stringify(items);
    localStorage.setItem('todoList', data);
  }
);

const store = {
  todoList
};

export default store;
