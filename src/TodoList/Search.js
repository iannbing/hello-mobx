import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { get } from 'lodash';

import Input from '../components/Input';

@inject('todoList')
@observer
class Search extends Component {
  state = {
    inputValue: ''
  };

  setInputValue = inputValue => {
    const { setValue } = this.props;

    if (setValue) {
      setValue(inputValue);
    }

    this.setState({ inputValue });
  };

  getValue = e => get(e, 'nativeEvent.target.value') || '';

  onType = e => {
    const inputValue = this.getValue(e);
    this.setInputValue(inputValue);
  };

  addItem = async e => {
    const { todoList } = this.props;
    const title = this.getValue(e).trim();
    if (title && !todoList.getItem(title)) {
      await todoList.add(title);
      this.setInputValue('');
    }
  };

  render() {
    const { inputValue } = this.state;
    return (
      <Input
        placeholder="What's next?"
        size="large"
        value={inputValue}
        onChange={this.onType}
        onPressEnter={this.addItem}
      />
    );
  }
}

export default Search;
