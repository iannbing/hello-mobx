import React, { Component } from 'react';
import { List, Switch } from 'antd';

import Page from './components/Page';
import Card from './components/Card';
import Input from './components/Input';

class App extends Component {
  render() {
    const list = [
      { loading: true, name: 'foo', done: true },
      { loading: false, name: 'bar', done: false }
    ];
    return (
      <Page>
        <Card
          title={<Input placeholder="What you want to do next?" size="large" />}
        >
          <List
            itemLayout="horizontal"
            dataSource={list}
            renderItem={item => (
              <List.Item actions={[<a>delete</a>]}>
                <List.Item.Meta
                  avatar={<Switch checked={item.done} />}
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
