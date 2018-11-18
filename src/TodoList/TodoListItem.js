import React from 'react';
import { List } from 'antd';
import { observer, inject } from 'mobx-react';

import Checkbox from '../components/Checkbox';

@inject('todoList')
@observer
class TodoListItem extends React.Component {
  getDeleteFn = title => async e => {
    const { todoList } = this.props;

    await todoList.remove(title);
  };
  onChangeItemState = title => e => {
    const { todoList } = this.props;

    todoList.toggle(title);
  };
  render() {
    const { item } = this.props;
    return (
      <List.Item
        actions={[<span onClick={this.getDeleteFn(item.title)}>delete</span>]}
        style={{ cursor: 'pointer' }}
      >
        <List.Item.Meta
          avatar={<Checkbox checked={item.done} />}
          title={item.title}
          onClick={this.onChangeItemState(item.title)}
        />
      </List.Item>
    );
  }
}

export default TodoListItem;
