import styled from 'react-emotion';
import { Card } from 'antd';
import 'antd/lib/card/style/css';

const MyCard = styled(Card)({
  boxShadow: '-1px 2px 24px -4px rgba(117,117,117,0.72)',
  minWidth: 600
});

export default MyCard;
