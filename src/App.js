import React, { Component } from 'react';
import { List } from 'antd';
import { observer, inject } from 'mobx-react';
import { get } from 'lodash';

import Page from './components/Page';
import Card from './components/Card';
import Input from './components/Input';
import Checkbox from './components/Checkbox';
import { fetch } from './Fetcher';

const TODO_LIST = 'todoList';

@inject(TODO_LIST)
@observer
class App extends Component {
  state = {
    inputValue: ''
  };

  componentDidMount() {
    this.loadTodoList();
  }

  loadTodoList = async () => {
    const { todoList } = this.props;
    const data = await fetch(TODO_LIST);
    todoList.load(data);
    return data;
  };

  onChangeItemState = title => checked => {
    const { todoList } = this.props;

    todoList.toggle(title);
  };
  onType = e =>
    this.setState({ inputValue: get(e, 'nativeEvent.target.value') });
  addItem = async e => {
    const { todoList } = this.props;

    const title = e.nativeEvent.target.value.trim();
    if (title) {
      await todoList.add(title);
      this.setState({ inputValue: '' });
    }
  };
  removeItem = title => async e => {
    const { todoList } = this.props;

    await todoList.remove(title);
  };

  getVisibleTodoItems = () => {
    const { inputValue } = this.state;
    const { todoList } = this.props;

    return todoList.getSearchResults(inputValue);
  };
  render() {
    const { inputValue } = this.state;
    const todoItems = this.getVisibleTodoItems();
    return (
      <Page>
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
            dataSource={todoItems}
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
                style={{ cursor: 'pointer' }}
                onClick={this.onChangeItemState(item.title)}
              >
                <List.Item.Meta
                  avatar={<Checkbox checked={item.done} />}
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
