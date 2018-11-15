import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import * as serviceWorker from './serviceWorker';
import TodoListStore from './store/TodoListStore';
import { Provider } from 'mobx-react';
import { reaction } from 'mobx';

const todoList = TodoListStore.create({
  items: []
});

reaction(
  () => [...todoList.items],
  items => localStorage.setItem('todoList', JSON.stringify(items))
);

ReactDOM.render(
  <Provider todoList={todoList}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
