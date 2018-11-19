import { getSnapshot, applyAction, clone, testActions } from 'mobx-state-tree';

import TodoListStore from '../TodoListStore';

const todoListStore = TodoListStore.create({ items: [] });

describe('TodoListStore', () => {
  it('should load items', () => {
    todoListStore.load([
      { title: 'foo', done: true },
      { title: 'bar', done: false }
    ]);
    expect(getSnapshot(todoListStore)).toMatchSnapshot();
  });
});
