import React from 'react';
import { List } from 'antd';
import { observer, inject } from 'mobx-react';

import TodoListItem from './TodoListItem';
import Card from '../components/Card';
import Search from './Search';
import Fetcher from '../Fetcher';
import getEmptyText from './getEmptyText';

export const TODO_LIST = 'todoList';

@inject(TODO_LIST)
@observer
class TodoList extends React.Component {
  state = {
    inputValue: ''
  };

  getVisibleTodoItems = () => {
    const { todoList } = this.props;
    const { inputValue } = this.state;

    return todoList.getSearchResults(inputValue);
  };

  setValue = inputValue => {
    this.setState({ inputValue });
  };

  render() {
    const { inputValue } = this.state;
    const { todoList } = this.props;
    const emptyText = getEmptyText(inputValue);
    const todoItems = this.getVisibleTodoItems();

    return (
      <Card title={<Search setValue={this.setValue} />}>
        <Fetcher id={TODO_LIST}>
          {({ data, loading }) => {
            todoList.load(data);
            return loading ? (
              'loading'
            ) : (
              <List
                itemLayout="horizontal"
                dataSource={todoItems}
                locale={{ emptyText }}
                renderItem={item => <TodoListItem item={item} />}
              />
            );
          }}
        </Fetcher>
      </Card>
    );
  }
}

export default TodoList;
