import { getSnapshot, applyAction, clone, testActions } from 'mobx-state-tree';

import TodoListStore from '../TodoListStore';

let todoListStore;

describe('TodoListStore', () => {
  beforeEach(() => {
    todoListStore = TodoListStore.create({ items: [] });
  });
  it('should load items', () => {
    todoListStore.load([
      { title: 'foo', done: true },
      { title: 'bar', done: false }
    ]);
    expect(getSnapshot(todoListStore)).toMatchSnapshot();
  });
});
