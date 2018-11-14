import React, { Component } from 'react';
import { List, Switch, Icon } from 'antd';
import { observable, computed } from 'mobx';
import { observer } from 'mobx-react';
import { get } from 'lodash';

import todoStore from './todoStore';
import Page from './components/Page';
import Card from './components/Card';
import Input from './components/Input';

@observer
class App extends Component {
  state = {
    inputValue: ''
  };
  onChangeItemState = title => checked => {
    todoStore.todos.find(item => item.title === title).toggle();
  };
  onType = e =>
    this.setState({ inputValue: get(e, 'nativeEvent.target.value') });
  addItem = async e => {
    const title = e.nativeEvent.target.value.trim();
    if (title) {
      await todoStore.add(title);
      this.setState({ inputValue: '' });
    }
  };
  removeItem = title => e => {
    todoStore.remove(title);
  };

  getVisibleTodos = () => {
    const { inputValue } = this.state;
    const { todos } = todoStore;
    return todos.filter(item => item.title.includes(inputValue));
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
