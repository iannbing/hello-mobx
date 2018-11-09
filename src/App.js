import React, { Component } from 'react';
import styled from 'react-emotion';
import {
  Button,
  Card as AntCard,
  List,
  Skeleton as AntSkeleton,
  Switch,
  Input as AntInput
} from 'antd';

const Container = styled('div')({
  width: '100%',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#f7f7f7'
});

const Card = styled(AntCard)({
  boxShadow: '-1px 2px 24px -4px rgba(117,117,117,0.72)',
  minWidth: 600
});

const Skeleton = styled(AntSkeleton)({
  paddingLeft: 20
});

const Input = styled(AntInput)({
  border: 'none',
  boxShadow: 'none !important'
});

class App extends Component {
  render() {
    const list = [
      { loading: true, name: 'foo', done: true },
      { loading: false, name: 'bar', done: false }
    ];
    return (
      <Container>
        <Card
          title={<Input placeholder="What you want to do next?" size="large" />}
        >
          <List
            className="demo-loadmore-list"
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
      </Container>
    );
  }
}

export default App;
