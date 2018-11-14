import React, { Component } from 'react';
import { List, Switch } from 'antd';
import { observer, inject } from 'mobx-react';
import { get } from 'lodash';

import Page from './components/Page';
import Card from './components/Card';
import Input from './components/Input';
@inject('todoStore')
@observer
class App extends Component {
  state = {
    inputValue: ''
  };
  onChangeItemState = title => checked => {
    const { todoStore } = this.props;

    todoStore.todos.find(item => item.title === title).toggle();
  };
  onType = e =>
    this.setState({ inputValue: get(e, 'nativeEvent.target.value') });
  addItem = async e => {
    const { todoStore } = this.props;

    const title = e.nativeEvent.target.value.trim();
    if (title) {
      await todoStore.add(title);
      this.setState({ inputValue: '' });
    }
  };
  removeItem = title => e => {
    const { todoStore } = this.props;

    todoStore.remove(title);
  };

  getVisibleTodos = () => {
    const { inputValue } = this.state;
    const { todoStore } = this.props;

    return todoStore.todos.filter(item => item.title.includes(inputValue));
  };
  render() {
    const { inputValue } = this.state;
    const todos = this.getVisibleTodos();
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
            dataSource={todos}
            locale={{
              emptyText: (
                <span>
                  Press Enter to Add{' '}
                  <span style={{ fontWeight: 'bold' }}>{inputValue}</span>
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
