import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import { injectGlobal } from 'emotion';

import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './store';

injectGlobal({
  '#root': {
    height: '100%'
  }
});

ReactDOM.render(
  <Provider {...store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
