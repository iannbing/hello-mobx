import React, { Component } from 'react';

import Page from './components/Page';
import TodoList from './TodoList';

// eslint-disable-next-line
class App extends Component {
  render() {
    return (
      <Page>
        <TodoList />
      </Page>
    );
  }
}

export default App;
