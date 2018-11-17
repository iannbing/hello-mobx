import React from 'react';
import styled from 'react-emotion';
import { Icon } from 'antd';

const iconSize = 26;

const Circle = styled('div')({
  width: iconSize,
  height: iconSize,
  border: '2px solid #ccc',
  borderRadius: '100%'
});

const CustomIcon = styled(Icon)({
  width: iconSize,
  height: iconSize,
  color: '#64dd17',
  '> svg': {
    fontSize: iconSize // overwrite the list item style
  }
});

const Checkbox = ({ checked }) =>
  checked ? <CustomIcon type="check-circle" /> : <Circle />;

export default Checkbox;
