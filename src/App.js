import React, { Component } from 'react';
import { List, Switch, Divider } from 'antd';

import Page from './components/Page';
import Card from './components/Card';
import Input from './components/Input';

class App extends Component {
  state = {
    list: [{ name: 'foo', done: true }, { name: 'bar', done: false }],
    inputValue: ''
  };
  onChangeItemState = name => checked => {
    this.setState(state => {
      const { list } = state;
      return {
        list: list.map(item =>
          item.name === name ? { ...item, done: !item.done } : item
        )
      };
    });
  };
  onType = e => this.setState({ inputValue: e.nativeEvent.target.value });
  addItem = e => {
    const name = e.nativeEvent.target.value;
    if (name) {
      this.setState(state => {
        const { list } = state;
        return {
          list: [...list, { name, done: false }],
          inputValue: ''
        };
      });
    }
  };
  removeItem = name => e => {
    this.setState(state => {
      const { list } = state;
      return {
        list: list.filter(item => item.name !== name)
      };
    });
  };
  render() {
    const { list, inputValue } = this.state;
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
            dataSource={list.filter(item => item.name.includes(inputValue))}
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
                actions={[<a onClick={this.removeItem(item.name)}>delete</a>]}
              >
                <List.Item.Meta
                  avatar={
                    <Switch
                      defaultChecked={!item.done}
                      onChange={this.onChangeItemState(item.name)}
                    />
                  }
                  title={item.name}
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
