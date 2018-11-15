import React, { Component } from 'react';
import { List, Switch } from 'antd';
import { observer, inject } from 'mobx-react';
import { get } from 'lodash';

import Page from './components/Page';
import Card from './components/Card';
import Input from './components/Input';
import Fetcher from './Fetcher';

const key = 'todoList';

@inject(key)
@observer
class App extends Component {
  static defaultProps = { key };
  state = {
    inputValue: ''
  };
  load = key => {
    const { todoList } = this.props;
    const retrievedObject = localStorage.getItem(key);
    const data = retrievedObject ? JSON.parse(retrievedObject) : {};
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
    const { key } = this.props;
    const todoItems = this.getVisibleTodoItems();
    return (
      <Page>
        <Fetcher fetch={this.load} id={key} />
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
