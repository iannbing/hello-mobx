import React from 'react';
import { List } from 'antd';
import { observer, inject } from 'mobx-react';

import Checkbox from '../components/Checkbox';

@inject('todoList')
@observer
class TodoListItem extends React.Component {
  getDeleteFn = title => async () => {
    const { todoList } = this.props;

    await todoList.remove(title);
  };

  onChangeItemState = title => () => {
    const { todoList } = this.props;

    todoList.toggle(title);
  };

  render() {
    const { item } = this.props;
    return (
      <List.Item
        actions={[
          <div
            role="button"
            tabIndex={0}
            onClick={this.getDeleteFn(item.title)}
            onKeyDown={() => {}}
          >
            delete
          </div>
        ]}
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
