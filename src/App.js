import React, { Component } from 'react';

import Page from './components/Page';
import TodoList from './TodoList';

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
