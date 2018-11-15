import React, { Component } from 'react';
import { List, Switch } from 'antd';
import { observer, inject } from 'mobx-react';
import { get } from 'lodash';

import Page from './components/Page';
import Card from './components/Card';
import Input from './components/Input';
import Fetcher from './Fetcher';

@inject('todoStore')
@observer
class App extends Component {
  static defaultProps = {
    key: 'todos'
  };
  state = {
    inputValue: ''
  };
  load = key => {
    const { todoStore } = this.props;
    const retrievedObject = localStorage.getItem(key);
    const data = retrievedObject ? JSON.parse(retrievedObject) : {};
    todoStore.load(data);
    return data;
  };

  save = async dataToSave => {
    const { key } = this.props;

    await localStorage.setItem(key, JSON.stringify(dataToSave));
    return Promise.resolve();
  };
  onChangeItemState = title => checked => {
    const { todoStore } = this.props;

    todoStore.toggle(title);
    this.save({ todos: todoStore.todos });
  };
  onType = e =>
    this.setState({ inputValue: get(e, 'nativeEvent.target.value') });
  addItem = async e => {
    const { todoStore } = this.props;

    const title = e.nativeEvent.target.value.trim();
    if (title) {
      await todoStore.add(title);
      this.save({ todos: todoStore.todos });
      this.setState({ inputValue: '' });
    }
  };
  removeItem = title => async e => {
    const { todoStore } = this.props;

    await todoStore.remove(title);
    this.save({ todos: todoStore.todos });
  };

  getVisibleTodos = () => {
    const { inputValue } = this.state;
    const { todoStore } = this.props;

    return todoStore.getSearchResults(inputValue);
  };
  render() {
    const { inputValue } = this.state;
    const todos = this.getVisibleTodos();
    return (
      <Page>
        <Fetcher fetch={this.load} id="todos" />
        <Card
          title={
            <Input
              placeholder="What's next?"
              size="large"
              value={inputValue}
              onChange={this.onType}
              onPressEnter={this.addItem}
            />
          }
        >
          <List
            itemLayout="horizontal"
            dataSource={todos}
            locale={{
              emptyText: inputValue ? (
                <>
                  <span>Press Enter to Add </span>
                  <span style={{ fontWeight: 'bold' }}>{inputValue}</span>
                </>
              ) : (
                <span role="img" aria-label="img">
                  Go out and enjoy the sun 😎🍸️
                </span>
              )
            }}
            renderItem={item => (
              <List.Item
                actions={[
                  <span onClick={this.removeItem(item.title)}>delete</span>
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Switch
                      defaultChecked={!item.done}
                      onChange={this.onChangeItemState(item.title)}
                    />
                  }
                  title={item.title}
                />
              </List.Item>
            )}
          />
        </Card>
      </Page>
    );
  }
}

export default App;
