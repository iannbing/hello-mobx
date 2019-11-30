import React from 'react';
import { List } from 'antd';
import { observer, inject } from 'mobx-react';

import TodoListItem from './TodoListItem';
import Card from '../components/Card';
import Search from './Search';
import { defaultFetch } from '../Fetcher';
import getEmptyText from './getEmptyText';

export const TODO_LIST = 'todoList';

@inject(TODO_LIST)
@observer
class TodoList extends React.Component {
  state = {
    inputValue: ''
  };

  componentDidMount() {
    this.loadTodoList();
  }

  loadTodoList = async () => {
    const { todoList } = this.props;
    const data = (await defaultFetch(TODO_LIST)) || [];
    todoList.load(data);
    return data;
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
    const emptyText = getEmptyText(inputValue);
    const todoItems = this.getVisibleTodoItems();

    return (
      <Card title={<Search setValue={this.setValue} />}>
        <List
          itemLayout="horizontal"
          dataSource={todoItems}
          locale={{ emptyText }}
          renderItem={item => <TodoListItem item={item} />}
        />
      </Card>
    );
  }
}

export default TodoList;
