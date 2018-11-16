import { reaction } from 'mobx';

import TodoListStore from './TodoListStore';

const todoList = TodoListStore.create({
  items: []
});

reaction(
  () => [...todoList.items],
  items => {
    console.log('save');
    localStorage.setItem('todoList', JSON.stringify(items));
  }
);

const store = {
  todoList
};

export default store;
